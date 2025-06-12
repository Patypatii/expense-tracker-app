import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect } from 'react'
import PageLoader from '../../components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
export default function Page() {
    const { user } = useUser()
    const { transactions, summary, isLoading, deleteTransaction, loadData } = useTransactions(user.id)
    const router = useRouter()


    useEffect(() => {
        loadData();
    }, [loadData])


    if (isLoading) return <PageLoader />



    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.content}>
                <View style={styles.header}>
                    {/* LEFT */}
                    <View style={styles.headerLeft}>
                        <Image source={require('../../assets/images/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />
                        <View style={styles.welcomeContainer}>
                            <Text style={styles.welcomeText}>Welcome,</Text>
                            <Text style={styles.usernameText}>
                                {user && user.primaryEmailAddress
                                    ? user.primaryEmailAddress.emailAddress.split('@')[0]
                                    : 'User'}
                            </Text>


                        </View>

                    </View>
                    {/* RIGHT */}
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                            <Ionicons name="add" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                        <SignOutButton />
                    </View>


                </View>

            </View>

        </View>
    )
}