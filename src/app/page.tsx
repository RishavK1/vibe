'use client'
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

const Page = () => {

  const trpc = useTRPC();

  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success('Bg Job Invocation successful');
    }
  }));
  return (

    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: 'RK' })}>Bg Job Invocation</Button>
    </div>
  )
}

export default Page;