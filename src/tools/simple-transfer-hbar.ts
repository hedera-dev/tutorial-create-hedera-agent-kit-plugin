import { z } from "zod";
import type { Tool, Context } from "hedera-agent-kit";
import { handleTransaction } from "hedera-agent-kit";
import {
  AccountId,
  Client,
  Hbar,
  Status,
  TransferTransaction,
} from "@hashgraph/sdk";
import { simpleTransferHbarParameters } from "@/schemas/simple-transfer-hbar.schema";

const simpleTransferHbarPrompt = (_context: Context = {}) => {
  return `
Transfer HBAR from your account to another Hedera account.

Parameters:
  - recipientId (string, required): The recipient's Hedera AccountId (e.g., 0.0.1234)
  - amount (number, required): The amount of HBAR to transfer (whole HBAR, not tinybars)

This tool respects agent modes:
  - AUTONOMOUS: Automatically submits the transaction
  - RETURN_BYTES: Returns unsigned transaction bytes for manual review
`;
};

const transferHbar = async (
  client: Client,
  context: Context,
  params: z.infer<ReturnType<typeof simpleTransferHbarParameters>>
) => {
  try {
    // determine sender account - use context.accountId or fall back to client operator
    const senderId =
      context.accountId || client.operatorAccountId?.toString();
    if (!senderId) {
      const errorMsg =
        "[transfer_hbar_tool] Missing sender: provide context.accountId or set client operator";
      console.error(errorMsg);
      return {
        raw: { error: errorMsg, status: Status.InvalidTransaction },
        humanMessage: errorMsg,
      };
    }

    // build the transfer transaction
    const tx = new TransferTransaction()
      .addHbarTransfer(AccountId.fromString(senderId), new Hbar(-params.amount))
      .addHbarTransfer(
        AccountId.fromString(params.recipientId),
        new Hbar(params.amount)
      );

    // handleTransaction respects agent mode (AUTONOMOUS vs RETURN_BYTES)
    return handleTransaction(
      tx,
      client,
      context,
      ({ transactionId, status }) =>
        `Successfully transferred ${params.amount} HBAR from ${senderId} to ${params.recipientId}. Status: ${status}. Transaction ID: ${transactionId}`
    );
  } catch (error) {
    const errorMsg = `[transfer_hbar_tool] Error: ${error instanceof Error ? error.message : String(error)}`;
    console.error(errorMsg, error);
    return {
      raw: {
        error: errorMsg,
        status: Status.InvalidTransaction,
      },
      humanMessage: errorMsg,
    };
  }
};

export const TRANSFER_HBAR_TOOL = "simple_transfer_hbar";

const tool = (context: Context): Tool => ({
  method: TRANSFER_HBAR_TOOL,
  name: "Simple Transfer HBAR",
  description: simpleTransferHbarPrompt(context),
  parameters: simpleTransferHbarParameters(context),
  execute: transferHbar,
});

export default tool;

