import authServices from "@/api-service/authServices";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataProvider";
import SearchBox from "@/dashboard/sidebar/SearchBox";
import User from "@/dashboard/sidebar/User";
import { LogOut } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Sidebar = () => {
	const { allUsers, setUserDetails, openChat } = useData();

	const logOut = async () => {
		const res = authServices.logout();
		toast.promise(res, {
			loading: "Please wait...",
			success: (res) => res.data.message,
			error: (err) => err?.response.data.message,
		});

		await res;
		localStorage.removeItem("user");
		setUserDetails(null);
	};

	return (
		<div
			className={`w-full md:w-[30%] md:min-w-[300px] border relative
					${openChat && "hidden"} md:block
				`}
		>
			<div className="px-5 pt-5">
				<div className="h-10">
					<h1 className="text-3xl font-semibold text-pretty">Chat App</h1>
				</div>
				<div className="my-3 ">
					<SearchBox />
				</div>
			</div>
			<hr />
			<div className="h-[calc(100vh-220px)] overflow-y-scroll mt-3 px-5 py-3 space-y-2">
				<div className="space-y-3">
					{allUsers.map((user, i) => (
						<User user={user} key={i} />
					))}
				</div>
			</div>

			<div className="h-20 p-5" onClick={logOut}>
				<Button className="w-full">
					Logout <LogOut className="h-[16px]" />
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
