import {neon} from "@neondatabase/serverless";
import "dotenv/config";


//creates sql connection
export const sql = neon(process.env.DATABASE_URL);