import { Slot } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { ClerkProvider } from '@clerk/clerk-expo'
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
    <ClerkProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
       <StatusBar style="dark"/>
    </ClerkProvider>)
}
