import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexora Digital",
    short_name: "Nexora",
    description: "A modern growth marketing agency.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
  };
}
