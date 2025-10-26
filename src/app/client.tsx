'use client'

import { useTRPC } from "@/trpc/client";
import { trpc } from "@/trpc/server";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () =>{
    const trpc = useTRPC();
        const {data} = useSuspenseQuery(trpc.hello.queryOptions({ text: 'RK' }));
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
}