import { z } from "zod";

const signupValidation = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 8 characters long." })
		.max(20, { message: "Name cannot be longer than 20 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.max(20, { message: "Password cannot be longer than 20 characters." })
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least one uppercase letter.",
		})
		.refine((val) => /[a-z]/.test(val), {
			message: "Password must contain at least one lowercase letter.",
		})
		.refine((val) => /[0-9]/.test(val), {
			message: "Password must contain at least one number.",
		})
		.refine((val) => /[!.@#$%^&*]/.test(val), {
			message: "Password must contain at least one special character.",
		}),
});
const loginValidation = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long." })
		.max(20, { message: "Password cannot be longer than 20 characters." })
		.refine((val) => /[A-Z]/.test(val), {
			message: "Password must contain at least one uppercase letter.",
		})
		.refine((val) => /[a-z]/.test(val), {
			message: "Password must contain at least one lowercase letter.",
		})
		.refine((val) => /[0-9]/.test(val), {
			message: "Password must contain at least one number.",
		})
		.refine((val) => /[!.@#$%^&*]/.test(val), {
			message: "Password must contain at least one special character.",
		}),
});

export { signupValidation, loginValidation };
