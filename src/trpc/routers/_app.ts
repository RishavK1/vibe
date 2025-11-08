import { messagesRouter } from '@/modules/messages/server/procedures';
import { projectsRouter } from '@/modules/projects/server/procedures';
import { createTRPCRouter } from '../init';
import { usageRouter } from '@/modules/usage/server/procedures';
import { promptEnhancerRouter } from '@/modules/prompt-enhancer/server/procedures';
export const appRouter = createTRPCRouter({
usage : usageRouter,
messages : messagesRouter,
projects : projectsRouter,
promptEnhancer : promptEnhancerRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;