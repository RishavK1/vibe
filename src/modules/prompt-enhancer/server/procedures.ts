import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { gemini, createAgent } from "@inngest/agent-kit";

export const promptEnhancerRouter = createTRPCRouter({
    enhance: protectedProcedure
        .input(
            z.object({
                prompt: z.string().min(1, "Prompt is required").max(5000),
            })
        )
        .mutation(async ({ input }) => {
            try {
                const enhancerAgent = createAgent({
                    name: "prompt-enhancer",
                    description: "Enhances user prompts for better code generation",
                    system: `You are a prompt enhancement assistant for a code generation AI. 
Your job is to take a user's brief idea and expand it into a clear, detailed prompt that will help generate better code.

Rules:
- Keep it concise (2-4 sentences max)
- Add specific technical details when appropriate
- Mention UI/UX considerations if relevant
- Don't change the core intent
- Don't add pleasantries or explanations
- Return ONLY the enhanced prompt, nothing else`,
                    model: gemini({ model: "gemini-2.0-flash-exp" }),
                });

                const result = await enhancerAgent.run(input.prompt);
                
                // Extract text from the output
                let enhancedText = input.prompt;
                if (result.output && result.output.length > 0) {
                    const firstOutput = result.output[0];
                    if (firstOutput.type === "text") {
                        if (typeof firstOutput.content === "string") {
                            enhancedText = firstOutput.content;
                        } else if (Array.isArray(firstOutput.content)) {
                            enhancedText = firstOutput.content.map(c => typeof c === "string" ? c : "").join("");
                        }
                    }
                }
                
                return { enhanced: enhancedText.trim() };
            } catch (error) {
                console.error("Prompt enhancement error:", error);
                // If enhancement fails, return original prompt
                return { enhanced: input.prompt };
            }
        }),
});

