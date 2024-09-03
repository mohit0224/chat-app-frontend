import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupValidation } from "@/validation/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import authServices from "@/api-service/authServices";
import { toast } from "sonner";

const Signup = () => {
	const [buttonDisable, setButtonDisable] = useState(false);
	const form = useForm({
		resolver: zodResolver(signupValidation),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		try {
			setButtonDisable(true);
			const res = authServices.signup(data);
			toast.promise(res, {
				loading: "Please wait...",
				success: (res) => res.data.message,
				error: (err) => err?.response.data.message,
			});
			await res;
			setButtonDisable(false);
		} catch (error) {
			setButtonDisable(false);
		}
	};

	return (
		<>
			<div className="">
				<div className="max-w-3xl  mx-auto mt-10 px-5 md:px-0 space-y-8">
					<div>
						<h1 className="text-3xl font-semibold text-pretty">
							Create new account
						</h1>
					</div>

					<div>
						<div>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-5"
								>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Name</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="Enter your name"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="Enter your email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="Enter your password"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button
										type="submit"
										className="w-full"
										disabled={buttonDisable}
									>
										Sign up
									</Button>
									<h2 className="text-sm">
										Have an account ? <Link to={"/login"}>login</Link>
									</h2>
								</form>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
