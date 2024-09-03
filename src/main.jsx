import React from "react";
import ReactDOM from "react-dom/client";
import PWABadge from "./PWABadge";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { DataProvider } from "./context/DataProvider";
import { SocketProvider } from "./context/SocketProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<DataProvider>
		<SocketProvider>
			<BrowserRouter>
				<App />
				<PWABadge />
				<Toaster richColors />
			</BrowserRouter>
		</SocketProvider>
	</DataProvider>
);
