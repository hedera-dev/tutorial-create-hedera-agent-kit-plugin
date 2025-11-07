import { Context } from "hedera-agent-kit";
import z from "zod";

export const simpleTransferHbarParameters = (_context: Context = {}) =>
  z.object({
    recipientId: z
      .string()
      .describe("Recipient Hedera AccountId (e.g., 0.0.1234)"),
    amount: z
      .number()
      .positive()
      .describe("Amount of HBAR to transfer (whole HBAR, not tinybars)"),
  });

