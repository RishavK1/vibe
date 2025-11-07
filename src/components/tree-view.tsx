import { TreeItem } from "@/types";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarProvider,
    SidebarRail

} from "@/components/ui/sidebar"
import { ChevronRightIcon, FileIcon } from "lucide-react";

interface TreeViewProps {
    data: TreeItem[];
    value?: string | null;
    onSelect?: (value: string) => void;
}

export const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
    return (
        <SidebarProvider>
            <Sidebar collapsible="none" className="w-full ">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>{
                                data.map((item, index)=>(
                                    <Tree
                                    item={item}
                                    key={index}
                                    selectedValue={value}
                                    onSelect={onSelect}
                                    parentPath=""
                                    />
                                ))
                            }</SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail/>
            </Sidebar>
        </SidebarProvider>
    )
}

interface TreeProps {
    item: TreeItem;
    selectedValue?: string | null;
    onSelect?: (value: string) => void;
    parentPath?: string;
}

const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
    const name = Array.isArray(item) ? item[0] : item;
    const items = Array.isArray(item) && item[1] ? item[1] : [];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if (!items.length) {
        const isSelected = selectedValue === currentPath;

        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    isActive={isSelected}
                    onClick={() => onSelect?.(currentPath)}
                    className="data-[active=true]:bg-transparent"
                >
                    <FileIcon />
                    <span className="truncate">{name}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                defaultOpen
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRightIcon className="transition-trasform" />
                        <FileIcon />
                        <span className="truncate">{name}</span>
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {
                            items.map((subItem, index)=>(
                                <Tree
                                item={subItem as TreeItem}
                                key={index}
                                selectedValue={selectedValue}
                                onSelect={onSelect}
                                parentPath={currentPath}
                                />
                            ))
                        }
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
};