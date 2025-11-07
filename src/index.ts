import { Context, Plugin } from "hedera-agent-kit";
import helloWorldTool from "./tools/hello-world";
import simpleTransferHbarTool from "./tools/simple-transfer-hbar";

export default {
  name: "example-plugin",
  version: "1.0.0",
  description: "An example plugin for the Hedera Agent Kit",
  tools: (context: Context) => {
    return [helloWorldTool(context), simpleTransferHbarTool(context)];
  },
} satisfies Plugin;
