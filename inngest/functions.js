import { inngest } from "../inngest/client";
import { gemini, createAgent } from "@inngest/agent-kit";


export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    triggers: [{ event: "agent/hello" }], // ✅ goes here
  },
  async ({ event, step }) => {
      const helloAgent = createAgent({
        name:"hello-agent",
        description:"you are a simple agent , that says hello",
        system:"you are helpfull assistant",
        model:gemini({model:"gemini-2.5-flash"})
      })

        const {output} = await helloAgent.run("Say hello to the user");

        return {
          message: output[0].content
        }

  },

);