import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "New World Kids",
    short_name: "New World Kids",
    description:
      "Help turn interest into opportunity. The First 12 pilot in Seattle, 2027.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eee5",
    theme_color: "#f2eee5",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
