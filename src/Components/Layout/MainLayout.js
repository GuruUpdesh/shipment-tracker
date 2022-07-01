import React from "react";
import MainNav from "../Nav/MainNav";

const MainLayout = ({children, packages, setFilteredPackages, className, setIsAddFormOpen, overflowState, packagesRef}) => {
	return (
		<>
			<MainNav packages={packages} setFilteredPackages={setFilteredPackages} setIsAddFormOpen={setIsAddFormOpen} packagesRef={packagesRef}/>
			<main className={className + " "  + (overflowState ? "overflowNone" : "")}>{children}</main>
		</>
	);
};

export default MainLayout;
