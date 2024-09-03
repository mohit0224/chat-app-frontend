import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { useData } from "./DataProvider";
import notificationAudio from "../assets/notification.mp3";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { userDetails: user, userMessage, setUserMessage } = useData();
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	useEffect(() => {
		if (user) {
			const socket = io(import.meta.env.VITE_BACKEND_URI, {
				query: {
					userId: user?._id,
				},
				withCredentials: true,
				transports: ['websocket', 'polling'],
			});
			setSocket(socket);

			socket.on("getOnline", (users) => setOnlineUsers(users));
			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user]);

	useEffect(() => {
		socket?.on("new-message", (users) => {
			const notification = new Audio(notificationAudio);
			// notification.play();

			setUserMessage([...userMessage, users]);
		});
	}, [userMessage, setUserMessage]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};

const useSocket = () => useContext(SocketContext);
export default useSocket;
