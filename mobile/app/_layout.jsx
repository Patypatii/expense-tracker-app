import { Slot } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { ClerkProvider } from '@clerk/clerk-expo'


export default function RootLayout() {
  return (
    <ClerkProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>)
}
