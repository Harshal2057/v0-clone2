import { inngest } from "../inngest/client";
import { gemini, createAgent } from "@inngest/agent-kit";
import Sandbox from "e2b";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    triggers: [{ event: "agent/hello" }], // ✅ goes here
  },
  async ({ event, step }) => {

      const sandboxId = await step.run("get-sandbox-id" , async () => {
        const sandbox = await Sandbox.create("harshcbhandarkar/v0-clone")
        return sandbox.sandboxId
      })

      const helloAgent = createAgent({
        name:"hello-agent",
        description:"you are a simple agent , that says hello",
        system:"you are helpfull assistant",
        model:gemini({model:"gemini-2.5-flash"})
      })

        const {output} = await helloAgent.run("Say hello to the user");

      const sandboxUrl = await step.run("get-sandbox-url", async () => {
        const sandbox = await Sandbox.connect(sandboxId)
        const host = sandbox.getHost(3000)

        return `http://${host}`
      })

        return {
          message: output[0].content
        }

  },

);