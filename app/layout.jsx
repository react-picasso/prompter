import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Provider from "@components/Provider";

export const metadata = {
	title: "Prompter",
	description: "Discover & share AI prompts",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
            <head>
                <link rel="icon" href="assets/images/logo.svg" />
            </head>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>

					<main className="app">
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
