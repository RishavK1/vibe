'use client'
import {dark} from "@clerk/themes"
import { SignIn } from "@clerk/nextjs";
import {useCurrentTheme} from "@/hooks/use-current-theme";

const Page = () => {
    const currentTheme = useCurrentTheme();
    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignIn
            appearance={{
                baseTheme: currentTheme === "dark" ? dark : undefined,
                elements:{
                    cardBox: "border! shadow-none! rounded-lg!",
                }
            }}
            />
        </div>
    )
}

export default Page;