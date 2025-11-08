import { format } from "date-fns"
import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@prisma/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronRightIcon, Code2Icon, SparklesIcon, BugIcon, PlusCircleIcon, SmartphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserMessageProps {
    content: string;
}
const UserMessage = ({ content }: UserMessageProps) => {
    return (
        <div className="flex justify-end pb-4 pr-2 pl-10">
            <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">
                {content}
            </Card>

        </div>
    )
}

interface FragmentCardProps {
    fragments: Fragment;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
}
const FragmentCard = ({ fragments, isActiveFragment, onFragmentClick }: FragmentCardProps) => {
    return (
        <button className={cn(
            "flex item-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary transition-colors",
            isActiveFragment &&
            "bg-primary text-primary-foreground border-primary hover:bg-primary"
        )}
            onClick={() => onFragmentClick(fragments)}>
            <Code2Icon className="size-4 mt-0.5" />
            <div className="flex flex-col flex-1">
                <span className="text-sm font-medium line-clamp-1">{fragments.title}</span>
                <span className="text-sm">Preview</span>
            </div>
            <div className="flex items-center justify-center mt-0.5">
                <ChevronRightIcon className="size-4"/>
            </div>
        </button>
    )
}
interface QuickActionsProps {
    fragmentTitle: string;
    onAction: (prompt: string) => void;
}

const QuickActions = ({ fragmentTitle, onAction }: QuickActionsProps) => {
    const actions = [
        {
            icon: SparklesIcon,
            label: "Improve Design",
            prompt: `Improve the visual design and UI of "${fragmentTitle}". Make it more modern, polished, and visually appealing with better colors, spacing, and typography.`
        },
        {
            icon: BugIcon,
            label: "Fix Issues",
            prompt: `Review and fix any bugs, errors, or issues in "${fragmentTitle}". Also improve error handling and edge cases.`
        },
        {
            icon: PlusCircleIcon,
            label: "Add Feature",
            prompt: `Add a useful new feature to "${fragmentTitle}". Choose something that would enhance the functionality and user experience.`
        },
        {
            icon: SmartphoneIcon,
            label: "Make Responsive",
            prompt: `Improve the mobile responsiveness of "${fragmentTitle}". Make sure it looks great and works perfectly on all screen sizes.`
        }
    ];

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {actions.map((action) => (
                <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    onClick={() => onAction(action.prompt)}
                    className="h-7 text-xs"
                >
                    <action.icon className="size-3" />
                    {action.label}
                </Button>
            ))}
        </div>
    );
};

interface AssistantMessageProps {
    content: string;
    fragments: Fragment | null;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
    type: MessageType;
    onQuickAction?: (prompt: string) => void;
}
const AssistantMessage = ({ content, fragments, createdAt, isActiveFragment, onFragmentClick, type, onQuickAction }: AssistantMessageProps) => {
    return (
        <div className={cn(
            "flex flex-col group px-2 pb-4",
            type === "ERROR" && "text-red-700 dark:text-red-500",
        )}>
            <div className="flex items-center gap-2 pl-2 mb-2">
                <Image src="/logo.svg" alt="logo" width={18} height={18} className="shrink-0" />
                <span className="text-sm font-medium">Bloom</span>
                <span className="text-xs  text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
                </span>

            </div>
            <div className="pl-8.5 flex flex-col gap-y-2">
                <span>{content}</span>
                {
                    fragments && type === "RESULT" && (
                        <>
                            <FragmentCard
                                fragments={fragments}
                                isActiveFragment={isActiveFragment}
                                onFragmentClick={onFragmentClick}
                            />
                            {onQuickAction && (
                                <QuickActions
                                    fragmentTitle={fragments.title}
                                    onAction={onQuickAction}
                                />
                            )}
                        </>
                    )
                }
            </div>
        </div>
    )
}
interface MessageCardProps {
    content: string;
    role: MessageRole;
    fragments: Fragment | null;
    createdAt: Date;
    isActiveFragment: boolean;
    onFragmentClick: (fragment: Fragment) => void;
    type: MessageType;
    onQuickAction?: (prompt: string) => void;
}

export const MessageCard = ({ content, role, fragments, createdAt, isActiveFragment, onFragmentClick, type, onQuickAction }: MessageCardProps) => {
    if (role === "ASSISTANT") {
        return (
            <AssistantMessage
                content={content}
                fragments={fragments}
                createdAt={createdAt}
                isActiveFragment={isActiveFragment}
                onFragmentClick={onFragmentClick}
                type={type}
                onQuickAction={onQuickAction}
            />
        )
    }

    return (
        <UserMessage content={content} />
    )
}