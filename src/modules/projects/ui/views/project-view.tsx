"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
    CodeIcon,
    CrownIcon,
    EyeIcon,
    MessageSquareIcon,
} from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { MessagesContainer } from "../components/messages-container";
import { Suspense, useState } from "react";
import { Fragment } from "@prisma/client";
import { ProjectHeader } from "../components/project-header";
import { FragmentWeb } from "../components/fragment-web";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileExplorer } from "@/components/file-explorer";
import { UserControl } from "@/components/user-control";
import { useAuth } from "@clerk/nextjs";
import { ErrorBoundary } from "react-error-boundary";
import { MessagesLoadingSpinner } from "../components/project-loading";
import { cn } from "@/lib/utils";

interface Props {
    projectId: string;
}
export const ProjectView = ({ projectId }: Props) => {
    const {has} = useAuth();
    const hasProAccess = has?.({plan: "pro"});
    const [activeFragment, setActiveFragment] = useState<Fragment | null>(null);
    const [tabState, setTabState] = useState<"preview" | "code">("preview");
    const [mobileView, setMobileView] = useState<"chat" | "preview">("chat");

    return (
        <div className="h-screen flex flex-col">
            {/* Desktop View - Hidden on mobile */}
            <div className="hidden md:block h-full">
                <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={35}
                    minSize={20}
                    className="flex flex-col overflow-hidden"
                >
                    <ProjectHeader projectId={projectId} />

                    <ErrorBoundary fallback={<p className="p-4 text-red-500">Messages Container Error</p>}>
                    <Suspense fallback={<MessagesLoadingSpinner />}>
                        <MessagesContainer
                            projectId={projectId}
                            activeFragment={activeFragment}
                            setActiveFragment={setActiveFragment}
                        />
                    </Suspense>
                    </ErrorBoundary>
                </ResizablePanel>

                    <ResizableHandle className="hover:bg-primary transition-colors" />
                    <ResizablePanel
                        defaultSize={65}
                        minSize={50}
                    >
                        <Tabs
                            className="h-full gap-y-0"
                            defaultValue="preview"
                            value={tabState}
                            onValueChange={(value) => setTabState(value as "preview" | "code")}
                        >
                            <div className="w-full flex items-center p-2 border-b gap-x-2">
                                <TabsList className="h-8 p-0 border rounded-md">
                                    <TabsTrigger value="preview" className="rounded-md">
                                        <EyeIcon /><span>Demo</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="code" className="rounded-md">
                                        <CodeIcon /><span>Code</span>
                                    </TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-x-2">
                                    {!hasProAccess && (
                                    <Button asChild size="sm" variant="default">
                                        <Link href="/pricing"><CrownIcon/>Upgrade</Link>
                                    </Button>
                                    )}
                                    <UserControl />
                                </div>

                            </div>
                            <TabsContent value="preview">
                            {!!activeFragment && <FragmentWeb data={activeFragment} />}

                            </TabsContent>
                            <TabsContent value="code" className="min-h-0"> 
                            {
                                !! activeFragment?.files && (
                                    <FileExplorer
                                    files={activeFragment.files as { [path: string]: string }}
                                    />
                                ) 
                            }
                            </TabsContent>

                        </Tabs>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

            {/* Mobile View - Hidden on desktop */}
            <div className="md:hidden flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex-none">
                    <ProjectHeader projectId={projectId} />
                </div>

                {/* Mobile Content - Slides between Chat and Preview */}
                <div className="flex-1 relative overflow-hidden">
                    {/* Chat Panel */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-transform duration-300 ease-in-out flex flex-col",
                            mobileView === "chat" ? "translate-x-0" : "-translate-x-full"
                        )}
                    >
                        <ErrorBoundary fallback={<p className="p-4 text-red-500">Messages Container Error</p>}>
                        <Suspense fallback={<MessagesLoadingSpinner />}>
                            <MessagesContainer
                                projectId={projectId}
                                activeFragment={activeFragment}
                                setActiveFragment={setActiveFragment}
                            />
                        </Suspense>
                        </ErrorBoundary>
                    </div>

                    {/* Preview Panel */}
                    <div
                        className={cn(
                            "absolute inset-0 transition-transform duration-300 ease-in-out flex flex-col",
                            mobileView === "preview" ? "translate-x-0" : "translate-x-full"
                        )}
                    >
                        <Tabs
                            className="h-full flex flex-col"
                            defaultValue="preview"
                            value={tabState}
                            onValueChange={(value) => setTabState(value as "preview" | "code")}
                        >
                            <div className="w-full flex items-center p-2 border-b gap-x-2 flex-none">
                                <TabsList className="h-8 p-0 border rounded-md">
                                    <TabsTrigger value="preview" className="rounded-md text-xs">
                                        <EyeIcon className="size-4" /><span>Demo</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="code" className="rounded-md text-xs">
                                        <CodeIcon className="size-4" /><span>Code</span>
                                    </TabsTrigger>
                                </TabsList>
                                <UserControl />
                            </div>
                            <div className="flex-1 min-h-0">
                                <TabsContent value="preview" className="h-full m-0">
                                    {!!activeFragment && <FragmentWeb data={activeFragment} />}
                                </TabsContent>
                                <TabsContent value="code" className="h-full m-0"> 
                                    {
                                        !! activeFragment?.files && (
                                            <FileExplorer
                                            files={activeFragment.files as { [path: string]: string }}
                                            />
                                        ) 
                                    }
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </div>

                {/* Mobile Bottom Tab Bar */}
                <div className="flex-none border-t bg-background">
                    <div className="flex items-center justify-around p-2 max-w-md mx-auto">
                        <button
                            onClick={() => setMobileView("chat")}
                            className={cn(
                                "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all flex-1",
                                mobileView === "chat"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <MessageSquareIcon className="size-5" />
                            <span className="text-xs font-medium">Chat</span>
                        </button>
                        <button
                            onClick={() => setMobileView("preview")}
                            className={cn(
                                "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-all flex-1",
                                mobileView === "preview"
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <EyeIcon className="size-5" />
                            <span className="text-xs font-medium">Preview</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}