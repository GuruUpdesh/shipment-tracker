import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Track Your Package: UPS, USPS, FedEx, & DHL",
	description:
		"Where is my package? Package Tracking Website for UPS, USPS, Fedex, and DHL. Get the latest shipment information, and order details by inputting a tracking number for free.",
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
