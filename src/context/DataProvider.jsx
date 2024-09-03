import authServices from "@/api-service/authServices";
import messageServices from "@/api-service/messagesServices";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const check = JSON.parse(localStorage.getItem("user"));
	const [userDetails, setUserDetails] = useState(check ? check : null);
	const [allUsers, setAllUsers] = useState([]);
	const [clickedUserDetails, setClickedUserDetails] = useState({});
	const [userMessage, setUserMessage] = useState([]);
	const [openChat, setOpenChat] = useState(false);

	const monitorCookieAndDeleteToken = async () => {
		const response = await authServices.checkCookie();

		const checkInterval = 1000;

		const intervalId = setInterval(async () => {
			const cookieExists = response.data?.cookieExists;
			const localStorageExists = JSON.parse(localStorage.getItem("user"));

			if (!cookieExists) {
				localStorage.removeItem("user");
				setUserDetails(null);
			}
			if (!cookieExists && !localStorageExists) clearInterval(intervalId);
		}, checkInterval);
	};

	const getAllUsersFn = () => {
		authServices
			.getAllUsers()
			.then((res) => setAllUsers(res.data.data))
			.catch((err) => console.log(err.response.data.message));
	};

	useEffect(() => {
		if (check) {
			monitorCookieAndDeleteToken();
			getAllUsersFn();
		}
	}, []);

	return (
		<DataContext.Provider
			value={{
				userDetails,
				setUserDetails,
				allUsers,
				getAllUsersFn,
				monitorCookieAndDeleteToken,
				clickedUserDetails,
				setClickedUserDetails,
				userMessage,
				setUserMessage,
				openChat,
				setOpenChat,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
