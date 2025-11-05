"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { sign } from "crypto";

interface HintProps {
    children: React.ReactNode;
    text: string;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

export const Hint = ({
    children,
    text,
    side = "top",
    align = "center",
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}

                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    {text}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}