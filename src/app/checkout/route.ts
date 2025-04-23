import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
	accessToken: process.env.POLAR_ACCESS_TOKEN!,
	successUrl: "https://witharc.co/onboard",
	server: process.env.POLAR_SERVER as "production" | "sandbox" | undefined,
});
