'use client'
import { SignUp } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {useCurrentTheme} from "@/hooks/use-current-theme";

const Page = () => {
    const currentTheme = useCurrentTheme();
    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignUp
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