import * as hedera_agent_kit from 'hedera-agent-kit';
import { Context } from 'hedera-agent-kit';

declare const _default: {
    name: string;
    version: string;
    description: string;
    tools: (context: Context) => hedera_agent_kit.Tool[];
};

export { _default as default };
