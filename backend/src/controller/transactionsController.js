import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
     
        try {
    
            const { userid } = req.params;
            const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userid} ORDER BY created_at DESC
            `
            res.status(200).json(transactions); // Return the transactions for the user
            
        } catch (error) {
            console.log("error getting the transaction", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    
}

export async function createTransaction(req, res) {
    //title, amount, category user_id
        try {
    
            const { title, amount, category, user_id } = req.body;
            if (!title || amount===undefined || !category || !user_id) {
                return res.status(400).json({ error: 'All fields are required' });
            }
    
            const transaction = await sql `
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
            `
            console.log(transaction);
            return res.status(201).json(transaction[0]); // Return the created transaction
        } catch (error) {
            console.log("error cretaing the transaction", error);
            return res.status(500).json({ error: 'Internal server error' });
            
        }
}

export async function deleteTransaction(req, res) {
    try {
    
            const {id} = req.params;
    
            if(isNaN(parseInt(id))){
                return res.status(400).json({ error: 'Invalid transaction ID' });
            }
            const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
            `
    
            if (result.length === 0) {
                return res.status(404).json({ error: 'Transaction not found' });
            }
            return res.status(200).json("Transaction deleted succesfully"); // Return the deleted transaction
    
            
        } catch (error) {
            console.log("error deleting the transaction", error);
            return res.status(500).json({ error: 'Internal server error' });
            
        }
}

export async function summaryTransactionByUserId(req, res) {
    try {

        const {userid} = req.params;
        
        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userid}`
        
            const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userid} AND amount > 0
            `
            const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expenses FROM transactions WHERE user_id = ${userid} AND amount < 0
            `
        
            res.status(200).json({
                balance: balanceResult[0].balance,
                income: incomeResult[0].income,
                expenses: expenseResult[0].expenses
            })
        }
        
        
            catch (error) {
                console.log("error getting the summary", error);
                return res.status(500).json({ error: 'Internal server error' });
            }
}