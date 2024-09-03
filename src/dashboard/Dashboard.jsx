import React from "react";
import Sidebar from "./Sidebar";
import MessageArea from "./MessageArea";

const Dashboard = () => {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<MessageArea />
		</div>
	);
};

export default Dashboard;
