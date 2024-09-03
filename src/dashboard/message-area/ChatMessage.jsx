import { useData } from "@/context/DataProvider";
import React, { useEffect, useRef } from "react";
import backgroundImage from "../../../public/background.webp";

const ChatMessage = () => {
	const { userMessage, userDetails } = useData();
	const latestMessage = useRef();

	useEffect(() => {
		latestMessage.current.scrollTo({
			top: latestMessage.current.scrollHeight,
		});
	}, [userMessage]);
	return (
		<div
			ref={latestMessage}
			id="hideScrollBar"
			className="h-[calc(100%-145px)] overflow-hidden overflow-y-scroll px-5 pt-5 space-y-3 bg-[url('/background.webp')] bg-cover bg-center"
		>
			{userMessage.map((data, i) => {
				return data.senderId === userDetails._id ? (
					<div className="text-end " key={i}>
						<p className="inline-block px-5 py-2 rounded-l-lg rounded-b-lg bg-slate-100">
							{data.message}
						</p>
					</div>
				) : (
					<div className="text-start " key={i}>
						<p className="inline-block px-5 py-2 rounded-r-lg rounded-b-lg bg-slate-100">
							{data.message}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default ChatMessage;
