import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";

const Page = async () => {

  const queryClient = await getQueryClient();

  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: 'RK' }));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>    
        <Client />
      </Suspense>
    </HydrationBoundary>

  )
}

export default Page;