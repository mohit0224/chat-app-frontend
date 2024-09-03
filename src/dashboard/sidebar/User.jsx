import messageServices from "@/api-service/messagesServices";
import { useData } from "@/context/DataProvider";
import useSocket from "@/context/SocketProvider";
import React from "react";

const User = ({ user }) => {
	const { setClickedUserDetails, setUserMessage, setOpenChat } = useData();
	const { onlineUsers } = useSocket();
	const isOnline = onlineUsers.includes(user?._id);
	const { name, email } = user;

	const handleUserClick = async (id) => {
		try {
			setClickedUserDetails(user);
			const res = await messageServices.getMessage(id);
			setOpenChat(true);
			setUserMessage(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className=" min-w-[203px]  border rounded-md px-3 py-2 hover:bg-slate-50 transition-colors duration-100 cursor-pointer overflow-hidden">
			<div className="flex items-center">
				<div className="md:w-3/12 lg:w-2/12  ">
					<div className="avatar w-14 md:w-full h-14 border rounded-full relative">
						<div className="avatar w-full h-14 border rounded-full overflow-hidden"></div>
						{isOnline && (
							<div className="absolute w-3 h-3 bg-emerald-300 top-0.5 right-0.5 rounded-full"></div>
						)}
					</div>
				</div>
				<div
					className=" px-3 w-9/12 lg:w-10/12 text-pretty "
					onClick={() => handleUserClick(user._id)}
				>
					<h2 className="">{name}</h2>
					<p className="text-sm line-clamp-1 text-wrap">{email}</p>
				</div>
			</div>
		</div>
	);
};

export default User;
