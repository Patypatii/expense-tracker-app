import express from 'express';
import dotenv from 'dotenv';
import { initDB} from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import transactionRoute from './routes/transactionRoute.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter)

const PORT = process.env.PORT || 5001;



app.use('/api/transactions', transactionRoute);
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});