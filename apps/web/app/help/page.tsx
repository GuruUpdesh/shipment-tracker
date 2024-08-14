import Link from "next/link";
import styles from "./HelpPage.module.css";
import { ChevronLeft } from "lucide-react";

type Props = {
	question: string;
	answer: string;
};

const Accordion = ({ question, answer }: Props) => {
	return (
		<details className={styles.accordion}>
			<summary>{question}</summary>
			<p>{answer}</p>
		</details>
	);
};

export default function HelpPage() {
	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<nav>
					<Link href="/" className={styles.backButton}>
						<ChevronLeft className={styles.icon} />
						<span>Back</span>
					</Link>
				</nav>
			</header>
			<main className={styles.main}>
				<section className={styles.section}>
					<h1>Getting Started</h1>
					<ol>
						<li>
							<h3>
								<Link
									href={
										process.env.APPLICATION_URL + "/login"
									}
								>
									Login
								</Link>{" "}
								or{" "}
								<Link
									href={
										process.env.APPLICATION_URL +
										"/register"
									}
								>
									create an account
								</Link>
								.
							</h3>
						</li>
						<li>
							<h3>Add your first package.</h3>
							<ol>
								<li>
									Navigate to and click the plus button on the
									top right hand side of the screen.
								</li>
								<li>
									Fill out the form that appears on screen.
									<ul>
										<li>
											Pick the name you want for your
											package.
										</li>
										<li>Fill in the tracking number.</li>
										<li>
											Select the carrier from the drop
											down menu.
										</li>
									</ul>
								</li>
								<li>Click the add button.</li>
							</ol>
						</li>
						<li>
							<h3>View details about your packages.</h3>
							<ol>
								<li>
									On the home screen navigate to and click on
									the package you wish to view.
								</li>
								<li>
									Details such as transit history and tracking
									number are available.
								</li>
							</ol>
						</li>
						<li>
							<h3>Edit a package.</h3>
							<ol>
								<li>View details about your package.</li>
								<li>
									Click the button at the top "edit package".
								</li>
								<li>
									Fill out the form that appears on screen.
									<ul>
										<li>Edit the name of your package.</li>
										<li>Edit the tracking number.</li>
										<li>Change the carrier.</li>
									</ul>
								</li>
								<li>Click the confirm button.</li>
							</ol>
						</li>
						<li>
							<h3>Delete a package.</h3>
							<ol>
								<li>View details about your package.</li>
								<li>
									Click the button at the top "delete
									package".
								</li>
								<li>
									If you wish to delete the package click the
									delete button.
								</li>
							</ol>
						</li>
					</ol>
				</section>
				<section className={styles.section}>
					<h1>Frequently asked questions</h1>
					<div className={styles.faq}>
						<Accordion
							question="I accidentally deleted a package what can I do?"
							answer="Right after deleting a package you can undo it by clicking the undo popup."
						/>
						<Accordion
							question="How can I clean up the packages in my dashboard?"
							answer="You can delete them. Check out the getting started section to learn how."
						/>
						<Accordion
							question="How do I add a new order?"
							answer="Simply click the plus button in the top right. Check out the getting started section for more information."
						/>
						<Accordion
							question="Can I change my package name?"
							answer="When viewing the information for a package there is a button called 'Edit Package'. Check out the getting started section for more information."
						/>
					</div>
				</section>
			</main>
		</div>
	);
}
