declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined
  }
}

declare const process: {
  env: NodeJS.ProcessEnv
  uptime(): number
}

type Buffer = unknown

declare const Buffer: {
  isBuffer(value: unknown): boolean
  from(value: unknown): unknown
  concat(chunks: unknown[]): {
    toString(encoding: string): string
  }
}

declare module 'node:fs/promises' {
  export function readFile(path: string, encoding: 'utf8'): Promise<string>
}

declare module 'node:http' {
  export type IncomingMessage = AsyncIterable<unknown> & {
    url?: string
    method?: string
    headers: Record<string, string | string[] | undefined>
  }

  export type ServerResponse = {
    setHeader(name: string, value: string): void
    statusCode: number
    end(body?: string): void
  }
}

declare module 'node:path' {
  export function dirname(path: string): string
  export function resolve(...paths: string[]): string
}

declare module 'node:url' {
  export function fileURLToPath(url: string | URL): string
}

declare module 'express' {
  namespace express {
    export type Request = {
      body: unknown
    }

    export type Response = {
      status(code: number): Response
      json(body: unknown): void
      end(): void
      setHeader(name: string, value: string): void
    }

    export type NextFunction = (error?: unknown) => void
  }

  type Handler = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => void | Promise<void>

  type ErrorHandler = (
    error: unknown,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => void

  type App = {
    use(handler: Handler): void
    use(handler: ErrorHandler): void
    get(path: string, handler: Handler): void
    post(path: string, handler: Handler): void
    options(path: string, handler: Handler): void
    listen(port: number, callback: () => void): void
  }

  type ExpressFactory = {
    (): App
    json(options?: { limit?: string }): Handler
  }

  const express: ExpressFactory
  export default express
}

declare module '@supabase/supabase-js' {
  export type SupabaseClient = {
    from(table: string): {
      insert(value: unknown): {
        select(columns?: string): {
          single(): Promise<{
            data: Record<string, unknown> | null
            error: { message: string } | null
          }>
        }
      }
    }
  }

  export function createClient(
    url: string,
    key: string,
    options?: unknown
  ): SupabaseClient
}
