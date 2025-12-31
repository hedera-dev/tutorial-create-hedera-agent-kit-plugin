"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/schemas/hello-world.schema.ts
var import_zod = __toESM(require("zod"));
var helloWorldParameters = (_context = {}) => import_zod.default.object({
  name: import_zod.default.string().describe("Name")
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
var import_hedera_agent_kit = require("hedera-agent-kit");
var import_sdk = require("@hashgraph/sdk");

// src/schemas/simple-transfer-hbar.schema.ts
var import_zod2 = __toESM(require("zod"));
var simpleTransferHbarParameters = (_context = {}) => import_zod2.default.object({
  recipientId: import_zod2.default.string().describe("The recipient's account ID"),
  amount: import_zod2.default.number().describe("The amount of HBAR to transfer")
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
      raw: { status: import_sdk.Status.InvalidTransaction, error: humanMessage },
      humanMessage
    };
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    const humanMessage = "Amount must be a positive number of HBAR.";
    return {
      raw: { status: import_sdk.Status.InvalidTransaction, error: humanMessage },
      humanMessage
    };
  }
  try {
    const sender = import_sdk.AccountId.fromString(senderId);
    const recipient = import_sdk.AccountId.fromString(recipientId);
    const tx = new import_sdk.TransferTransaction().addHbarTransfer(sender, new import_sdk.Hbar(-amount)).addHbarTransfer(recipient, new import_sdk.Hbar(amount));
    return await (0, import_hedera_agent_kit.handleTransaction)(tx, client, context, ({ transactionId, status }) => {
      return `Transferred ${amount} HBAR from ${senderId} to ${recipientId}. Status: ${status}. (txId: ${transactionId})`;
    });
  } catch (err) {
    console.error("[transfer_hbar_tool]", err);
    const humanMessage = `HBAR transfer failed: ${err instanceof Error ? err.message : String(err)}`;
    return {
      raw: { status: import_sdk.Status.InvalidTransaction, error: humanMessage },
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
//# sourceMappingURL=index.js.map