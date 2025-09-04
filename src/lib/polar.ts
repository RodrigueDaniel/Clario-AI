import { Polar } from "@polar-sh/sdk";

export const polarClient = new Polar({
  accessToken: process.env.PLOAR_ACCESS_TOKEN,
  server: "sandbox",
});
