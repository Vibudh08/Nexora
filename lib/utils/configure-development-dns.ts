import dns, { promises as dnsPromises } from "node:dns";

import { getServerEnv } from "@/lib/env/server-env";

let dnsConfigured = false;

export function configureDevelopmentDns() {
  if (dnsConfigured || process.env.NODE_ENV === "production") {
    return;
  }

  const dnsServers = getServerEnv()
    .DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers?.length) {
    dns.setServers(dnsServers);
    dnsPromises.setServers(dnsServers);
  }

  dnsConfigured = true;
}

