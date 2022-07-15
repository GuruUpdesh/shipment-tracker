import React from "react";
import MainNav from "../Nav/MainNav";

const MainLayout = ({children, packages, setFilteredPackages, className, setIsAddFormOpen, packagesRef, isArchive}) => {

	return (
		<>
			<MainNav packages={packages} setFilteredPackages={setFilteredPackages} setIsAddFormOpen={setIsAddFormOpen} packagesRef={packagesRef} isArchive={isArchive}/>
			<main className={className}>{children}</main>
		</>
	);
};

export default MainLayout;
