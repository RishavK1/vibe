import { Skeleton } from "@/components/ui/skeleton"

export const ProjectSkeleton = () => {
    return (
        <div className="border rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
        </div>
    )
}

export const ProjectListSkeleton = () => {
    return (
        <div className="w-full bg-white dark:bg-sidebar rounded-xl p-4 sm:p-6 md:p-8 border flex flex-col gap-y-4 sm:gap-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <ProjectSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

