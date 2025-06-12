import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Alert } from 'react-native'
import { API_URL } from '../../constants/api';
const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];


const CreateScreen = () => {

    const router = useRouter()
    const user = useUser()

    const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");
const [isExpense, setIsExpense] = useState(true);
const [isLoading, setIsLoading] = useState(false);

const handleCreate = async ()=>{
    // Validate inputs
    if(!title.trim() )return Alert.alert("Error", "Title is required");
    if(!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        return Alert.alert("Error", "Amount must be a valid number greater than 0");
    }
    if(!selectedCategory) return Alert.alert("Error", "Please select a category");


    setIsLoading(true);
    try {

        const formattedAmount = isExpense
            ? -Math.abs(parseFloat(amount))
            : Math.abs(parseFloat(amount));

        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                title,
                amount: formattedAmount,
                category: selectedCategory,
                isExpense,
            }),

        
         })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create transaction');}

            Alert.alert("Success", "Transaction created successfully");
            router.back();
        
    } catch (error) {
        console.error("Error creating transaction:", error);
        Alert.alert("Error", error.message || "Failed to create transaction");
        
    }finally {
        setIsLoading(false);
    }
}



  return (
    <View>
      <Text>CreateScreen</Text>
    </View>
  )
}

export default CreateScreen