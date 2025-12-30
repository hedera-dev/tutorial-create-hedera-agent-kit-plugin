// src/schemas/hello-world.schema.ts
import z from "zod";
var helloWorldParameters = (_context = {}) => z.object({
  name: z.string().describe("Name")
});

// src/tools/hello-world.ts
var helloWorldPrompt = (_context = {}) => {
  return `
This tool say hello to the inputted name.

Parameters:
  - name (string): the user's name
`;
};
var helloWorldExecute = async (_client, _context, params) => {
  return `Hello, ${params.name}`;
};
var HELLO_WORLD_TOOL = "hello_world_tool";
var tool = (context) => ({
  method: HELLO_WORLD_TOOL,
  name: "Simple Hello World Tool",
  description: helloWorldPrompt(context),
  parameters: helloWorldParameters(context),
  execute: helloWorldExecute
});
var hello_world_default = tool;

// src/tools/simple-transfer-hbar.ts
import { handleTransaction } from "hedera-agent-kit";
import { AccountId, Hbar, TransferTransaction, Status } from "@hashgraph/sdk";

// src/schemas/simple-transfer-hbar.schema.ts
import z2 from "zod";
var simpleTransferHbarParameters = (_context = {}) => z2.object({
  recipientId: z2.string().describe("The recipient's account ID"),
  amount: z2.number().describe("The amount of HBAR to transfer")
});

// src/tools/simple-transfer-hbar.ts
var simpleHbarTransferPrompt = (context = {}) => {
  return `
This tool transfers hbar to a Hedera account, giving that account address and the amount of the transaction in HBAR.

Parameters:
  - recipientId (string): the account id of the recipient of the transaction.
  - amount (number): the amount of HBAR to transfer.
`;
};
var SIMPLE_HBAR_TRANSFER_TOOL = "simple_hbar_transfer_tool";
var simpleHbarTransferExecute = async (client, context, params) => {
  const { recipientId, amount } = params;
  const senderId = context.accountId ?? client.operatorAccountId?.toString();
  if (!senderId) {
    const humanMessage = "Missing sender account: set context.accountId or configure a Client operator.";
    return {
      raw: { status: Status.InvalidTransaction, error: humanMessage },
      humanMessage
    };
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    const humanMessage = "Amount must be a positive number of HBAR.";
    return {
      raw: { status: Status.InvalidTransaction, error: humanMessage },
      humanMessage
    };
  }
  try {
    const sender = AccountId.fromString(senderId);
    const recipient = AccountId.fromString(recipientId);
    const tx = new TransferTransaction().addHbarTransfer(sender, new Hbar(-amount)).addHbarTransfer(recipient, new Hbar(amount));
    return await handleTransaction(tx, client, context, ({ transactionId, status }) => {
      return `Transferred ${amount} HBAR from ${senderId} to ${recipientId}. Status: ${status}. (txId: ${transactionId})`;
    });
  } catch (err) {
    console.error("[transfer_hbar_tool]", err);
    const humanMessage = `HBAR transfer failed: ${err instanceof Error ? err.message : String(err)}`;
    return {
      raw: { status: Status.InvalidTransaction, error: humanMessage },
      humanMessage
    };
  }
};
var tool2 = (context) => ({
  method: SIMPLE_HBAR_TRANSFER_TOOL,
  name: "Simple HBAR Transfer",
  description: simpleHbarTransferPrompt(context),
  parameters: simpleTransferHbarParameters(context),
  execute: simpleHbarTransferExecute
});
var simple_transfer_hbar_default = tool2;

// src/index.ts
var index_default = {
  name: "example-plugin",
  version: "1.0.0",
  description: "An example plugin for the Hedera Agent Kit",
  tools: (context) => {
    return [hello_world_default(context), simple_transfer_hbar_default(context)];
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map