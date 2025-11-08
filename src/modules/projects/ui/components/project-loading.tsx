import { Loader2Icon } from "lucide-react"

export const ProjectLoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-16 w-full">
            <Loader2Icon className="h-6 w-6 animate-spin text-primary" />
        </div>
    )
}

export const MessagesLoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center flex-1 w-full">
            <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
}

