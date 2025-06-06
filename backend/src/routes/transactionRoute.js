import express from 'express';
import { sql } from '../config/db.js';
import { createTransaction, deleteTransaction, getTransactionsByUserId, summaryTransactionByUserId } from '../controller/transactionsController.js';

const router = express.Router();

router.get("/:userid", getTransactionsByUserId)
router.post('/', createTransaction)

router.delete('/:id', deleteTransaction)

router.get("/summary/:userid", summaryTransactionByUserId)


export default router;
