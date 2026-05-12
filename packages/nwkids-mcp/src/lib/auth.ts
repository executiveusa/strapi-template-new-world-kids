import { adminClient } from "./database.js"

export interface MCPOrg {
  id: string
  name: string
  api_key_hash: string
  active: boolean
  created_at: string
}

/**
 * Hash an API key using a simple SHA-256 hash.
 * In production, use a proper crypto library like bcrypt or argon2.
 */
async function hashApiKey(apiKey: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(apiKey)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

/**
 * Validate an API key against the mcp_orgs table.
 * Returns the organization record if valid, null otherwise.
 */
export async function validateApiKey(
  apiKey: string,
): Promise<MCPOrg | null> {
  try {
    const keyHash = await hashApiKey(apiKey)

    const { data, error } = await adminClient
      .from("mcp_orgs")
      .select("*")
      .eq("api_key_hash", keyHash)
      .eq("active", true)
      .single()

    if (error || !data) {
      return null
    }

    return data as MCPOrg
  } catch (error) {
    console.error("Error validating API key:", error)
    return null
  }
}

/**
 * Log MCP usage to the mcp_usage table.
 */
export async function logUsage(
  orgId: string,
  toolName: string,
  inputParams: Record<string, unknown>,
): Promise<void> {
  try {
    await adminClient.from("mcp_usage").insert({
      org_id: orgId,
      tool_name: toolName,
      input_params: inputParams,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error logging usage:", error)
    // Don't throw - usage logging failures shouldn't break tool execution
  }
}
