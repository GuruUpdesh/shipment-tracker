import Image from "next/image";
import styles from "./page.module.css";
import { ArrowRight, Cloud, LayoutPanelLeft, Zap } from "lucide-react";
import { Urbanist } from "next/font/google";
import Link from "next/link";
import DashboardLight from "../public/dashboard.webp";
import DashboardDark from "../public/dashboard-dark.webp";
import DashboardMobileLight from "../public/dashboard-mobile.webp";
import DashboardMobileDark from "../public/dashboard-mobile-dark.webp";
import TrackingLight from "../public/tracking.webp";
import TrackingDark from "../public/tracking-dark.webp";
import Boxes from "../public/boxes.webp";
import { cookies } from "next/headers";
import Logo from "./components/Logo";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function Home() {
	const isAuth = cookies().get("is-auth");
	console.log(isAuth);
	let authenticated = false;
	if (isAuth) {
		const value = JSON.parse(isAuth.value) as number | undefined;
		authenticated = value ? true : false;
	}
	console.log(authenticated);

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.logo + " " + urbanist.className}>
						<Logo
							width={17}
							height={17.8}
							className={styles.logoIcon}
						/>
						<p>Package tracr</p>
					</div>
					<Link
						href={process.env.APPLICATION_URL + "/packages"}
						className={styles.btn2}
					>
						{authenticated ? "Dashboard" : "Login"}
					</Link>
				</div>
			</header>
			<main className={styles.main}>
				<section className={styles.hero}>
					<h1>Multi-Courier Package Tracking</h1>
					<p>
						Simplify the process of tracking shipments by keeping
						everything in one place.
					</p>
					<Link
						href={process.env.APPLICATION_URL + "/packages"}
						className={styles.btn}
					>
						Get Started
						<ArrowRight className={styles.svg} />
					</Link>
					<div className={styles.img}>
						<Image
							src={Boxes}
							fill
							alt="stacked boxes"
							quality={100}
						/>
					</div>
				</section>
				<section className={styles.courier}>
					<div className={styles.courierContainer}>
						<div
							className={styles.courierPath}
							style={{
								width: "calc(100% - 110px)",
								position: "absolute",
								height: "100%",
							}}
						>
							<Image src="/dashed.svg" fill alt="" />
						</div>
						<Image
							src="/courier-images/ups.webp"
							width={165 / 3}
							height={200 / 3}
							alt="UPS logo"
						/>
						<Image
							src="/courier-images/usps.webp"
							width={240 / 3}
							height={200 / 3}
							alt="USPS logo"
						/>
						<Image
							src="/courier-images/fedex.webp"
							width={400 / 3}
							height={122 / 3}
							alt="FedEx logo"
						/>
						<Image
							src="/courier-images/dhl.webp"
							width={270 / 3}
							height={200 / 3}
							alt="DHL logo"
						/>
					</div>
				</section>
				<section className={styles.dashboard}>
					<div className={styles.dashboardContainer}>
						<picture>
							<source
								srcSet={DashboardMobileDark.src}
								media="(max-width: 640px) and (prefers-color-scheme: dark)"
							/>
							<source
								srcSet={DashboardMobileLight.src}
								media="(max-width: 640px)"
							/>
							<source
								srcSet={DashboardDark.src}
								media="(prefers-color-scheme: dark)"
							/>
							<Image
								src={DashboardLight}
								fill
								alt="Package Tracr Dashboard UI"
								quality={100}
								style={{
									borderRadius: "16px 16px 0 0",
								}}
							/>
						</picture>
						<div className={styles.animatedBorder} />
					</div>
				</section>
				<section className={styles.features}>
					<h2>Built to be Easy</h2>
					<div className={styles.cards}>
						<div className={styles.card}>
							<Cloud />
							<div>
								<h3>Web Based</h3>
								<p>
									We provide a solution for tracking all your
									packages in one centralized web app. All
									your packages sync across all your devices
									through the cloud.
								</p>
							</div>
						</div>
						<div className={styles.card}>
							<LayoutPanelLeft />
							<div>
								<h3>Intuitive Interface</h3>
								<p>
									Package Tracr is designed to be easy to use.
									The intuitive interface allows you to track
									your packages with ease.
								</p>
							</div>
						</div>
						<div className={styles.card}>
							<Zap />
							<div>
								<h3>Save Time</h3>
								<p>
									No more checking multiple websites to track
									your packages. Package Tracr does it all for
									you.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className={styles.action}>
					<div className={styles.actionContent}>
						<h1>
							Start tracking
							<br />
							today!
						</h1>
						<p>
							Package Tracr is free to use, and easy to get
							started with.
						</p>
						<Link
							href={process.env.APPLICATION_URL + "/register"}
							className={styles.btn}
						>
							Sign up for free
							<ArrowRight className={styles.svg} />
						</Link>
					</div>
					<div className={styles.actionImage}>
						<picture>
							<source
								srcSet={TrackingDark.src}
								media="(prefers-color-scheme: dark)"
							/>
							<Image
								src={TrackingLight}
								fill
								alt="Package Tracr Dashboard UI"
								quality={100}
								style={{
									borderRadius: "16px 16px 0 0",
								}}
							/>
						</picture>
					</div>
				</section>
			</main>
			<footer className={styles.footer}>
				<div className={styles.footerContent}>
					<div className={styles.footerMain}>
						<div className={styles.footerLogo}>
							<div
								className={
									styles.logo + " " + urbanist.className
								}
							>
								<Logo
									width={17}
									height={17.8}
									className={styles.logoIcon}
								/>
								<p>Package tracr</p>
							</div>
							<p className={styles.footerDescription}>
								Simplify the process of tracking shipments by
								keeping everything in one place.
							</p>
						</div>
						<div className={styles.footerLinks}>
							<div className={styles.footerColumn}>
								<h3>Application</h3>
								<ul>
									<li>
										<Link
											href={
												process.env.APPLICATION_URL +
												"/login"
											}
										>
											Login
										</Link>
									</li>
									<li>
										{" "}
										<Link
											href={
												process.env.APPLICATION_URL +
												"/register"
											}
										>
											Sign Up
										</Link>
									</li>
									<li>
										<Link href="/help">Help</Link>
									</li>
								</ul>
							</div>
							<div className={styles.footerColumn}>
								<h3>Legal</h3>
								<ul>
									<li>
										<Link href="/privacy">Privacy</Link>
									</li>
									<li>
										<Link href="/terms">Terms</Link>
									</li>
								</ul>
							</div>
							<div className={styles.footerColumn}>
								<h3>Other</h3>
								<ul>
									<li>
										<Link
											href="https://github.com/GuruUpdesh/shipment-tracker"
											target="_blank"
										>
											GitHub
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className={styles.footerBottom}>
						<p className={styles.copyright}>Copyright © 2024</p>
						<div className={styles.footerCredit}>
							<p>A project by</p>
							<Link
								href="https://www.guruupdeshsingh.dev"
								target="_blank"
							>
								Guru Updesh Singh
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
