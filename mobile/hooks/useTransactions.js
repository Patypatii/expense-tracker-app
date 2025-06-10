//create custom file
import { Alert } from "react-native";
import { useCallback, useState } from "react";

const API_URL = "http://localhost:5001/api"; // Replace with your API URL


export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    });
    const [loading, setLoading] = useState(true);


    //usecallback is used for performance reasons , it will memirs ethe funvtion
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setTransactions(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
if (!userId) return;

        setLoading(true);
       
    try {
//can be run in parrallel
        await Promise.all([fetchTransactions(), fetchSummary()]);

        
    } catch (error) {
        console.log("Error loading data:", error);
        
    }finally {
        setLoading(false);

    }}, [userId, fetchTransactions, fetchSummary]);

    const deleteTransaction = async (id) => {
        try {

            const response = await fetch(`${API_URL}/transactions/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete transaction");
            }
            loadData(); // Refresh data after deletion
            Alert.alert("success","Transaction deleted successfully");
            
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert.alert("error",error.message);
            
        }
    
    };
    return {
        transactions,
        summary,
        loading,
        loadData,
        deleteTransaction,
    };

}