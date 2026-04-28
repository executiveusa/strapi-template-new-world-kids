import type { IncomingMessage, ServerResponse } from 'node:http'

export async function readJsonBody<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = []

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) {
    return {} as T
  }

  return JSON.parse(raw) as T
}

export function applyCors(response: ServerResponse) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function sendJson(
  response: ServerResponse,
  statusCode: number,
  body: unknown
) {
  applyCors(response)
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.end(JSON.stringify(body, null, 2))
}
