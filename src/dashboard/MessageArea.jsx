import { useData } from "@/context/DataProvider";
import ChatFooter from "@/dashboard/message-area/ChatFooter";
import ChatHeader from "@/dashboard/message-area/ChatHeader";
import ChatMessage from "@/dashboard/message-area/ChatMessage";
import React from "react";

const MessageArea = () => {
	const { openChat } = useData();

	return (
		<div
			className={`w-full md:w-[70%] md:min-w-[500px] border 
				${!openChat && "hidden"} md:block `}
		>
			{openChat ? (
				<div className="">
					<ChatHeader />
					<ChatMessage />
					<ChatFooter />
				</div>
			) : (
				<div className="h-full w-full flex items-center justify-center">
					<h1>Click chat to conversation</h1>
				</div>
			)}
		</div>
	);
};

export default MessageArea;
