import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Package Tracr",
	description:
		"Universal Package Tracking Dashboard for UPS, USPS, Fedex, and more. Get shipment info, and order details by tracing it for free.",
};

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={jost.className}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
