import { gemini, createAgent } from "@inngest/agent-kit";


import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert nextjs developer.  You write readbale maintainable code. You write simple nextjs and Reactjs snippets.",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippets: ${event.data.email}`,
    );
    console.log(output);

    return { output };
  },
);