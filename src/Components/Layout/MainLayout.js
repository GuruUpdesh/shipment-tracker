import React from "react";
import MainNav from "../Nav/MainNav";

const MainLayout = ({children, packages, setFilteredPackages, className, setIsAddFormOpen, overflowState}) => {
	return (
		<>
			<MainNav packages={packages} setFilteredPackages={setFilteredPackages} setIsAddFormOpen={setIsAddFormOpen}/>
			<main className={className + " "  + (overflowState ? "overflowNone" : "")}>{children}</main>
		</>
	);
};

export default MainLayout;
