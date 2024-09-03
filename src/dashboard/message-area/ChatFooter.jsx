import messageServices from "@/api-service/messagesServices";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useData } from "@/context/DataProvider";
import React from "react";
import { useForm } from "react-hook-form";

const ChatFooter = () => {
	const { clickedUserDetails } = useData();

	const form = useForm({
		defaultValues: {
			message: "",
		},
	});
	

	const onSubmit = async (data) => {
		await messageServices.sendMessage(clickedUserDetails._id, data);
		form.reset({
			message: "",
		});
	};

	return (
		<div className="px-5 py-5 bg-white ">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="relative">
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										autoComplete="off"
										placeholder="Send message..."
										{...field}
										className="w-[calc(100%-85px)] outline-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="absolute top-1/2 -translate-y-1/2 right-0"
					>
						Send
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ChatFooter;
