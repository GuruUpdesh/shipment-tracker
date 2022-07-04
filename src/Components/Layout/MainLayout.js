import React from "react";
import MainNav from "../Nav/MainNav";

const MainLayout = ({children, packages, setFilteredPackages, className, setIsAddFormOpen, overflowState, packagesRef, isArchive}) => {
	return (
		<>
			<MainNav packages={packages} setFilteredPackages={setFilteredPackages} setIsAddFormOpen={setIsAddFormOpen} packagesRef={packagesRef} isArchive={isArchive}/>
			<main className={className + " "  + (overflowState ? "overflowNone" : "")}>{children}</main>
		</>
	);
};

export default MainLayout;
