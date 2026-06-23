import { cookies } from "next/headers"

import { OpsSidebar } from "../../../components/ops/OpsSidebar"

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = process.env.OPS_ACCESS_TOKEN
  const sessionCookie = (await cookies()).get("nwkids_ops")?.value

  if (!accessToken || sessionCookie !== accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060e08] px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1610] p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a84c]/10">
            <span className="text-lg text-[#c9a84c]">N</span>
          </div>
          <h2 className="font-serif text-xl text-white">NWKids Ops</h2>
          <p className="mt-3 text-sm text-white/50">
            Private access. Set the{" "}
            <code className="text-[#c9a84c]">nwkids_ops</code> cookie to your
            access token to continue.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#060e08]">
      <OpsSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
