import { useData } from "@/context/DataProvider";
import useSocket from "@/context/SocketProvider";
import { ArrowLeft } from "lucide-react";
import React from "react";

const ChatHeader = () => {
	const { clickedUserDetails, setOpenChat } = useData();
	const { onlineUsers } = useSocket();
	const isOnline = onlineUsers.includes(clickedUserDetails._id);

	return (
		<>
			<div className="w-full px-5 py-2 bg-slate-100 ">
				<div className="flex items-center space-x-5">
					<div>
						<ArrowLeft
							className="cursor-pointer"
							onClick={() => setOpenChat(false)}
						/>
					</div>
					<div className="flex items-center space-x-5">
						<div className="w-12 h-12 border rounded-full border-slate-950"></div>
						<div>
							<h3 className=" font-semibold text-pretty">
								{clickedUserDetails?.name}
							</h3>
							<p className="text-sm">{isOnline ? "Online" : "Offline"}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatHeader;
