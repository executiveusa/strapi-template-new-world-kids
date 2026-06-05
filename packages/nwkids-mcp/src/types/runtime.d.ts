declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined
  }
}

declare const process: {
  env: NodeJS.ProcessEnv
}

declare module "zod" {
  export namespace z {
    export type infer<T> = any
  }

  export const z: any
}

declare module "@modelcontextprotocol/sdk/server/mcp.js" {
  export class McpServer {
    constructor(options: {
      name: string
      version: string
      description?: string
    })
    tool(
      name: string,
      description: string,
      shape: unknown,
      handler: (input: unknown) => Promise<unknown>
    ): void
    connect(transport: unknown): Promise<void>
  }
}

declare module "@modelcontextprotocol/sdk/server/stdio.js" {
  export class StdioServerTransport {}
}

declare module "@supabase/supabase-js" {
  export function createClient(url: string, key: string): any
}

declare module "openai" {
  export default class OpenAI {
    constructor(options?: unknown)
    chat: {
      completions: {
        create(input: unknown): Promise<any>
      }
    }
  }
}
