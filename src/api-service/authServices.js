import axiosInstance from "@/helper/axiosInstance";

class authService {
	signup = async (data) => await axiosInstance.post("/users", data);
	login = async (data) => await axiosInstance.post("/users/login", data);
	logout = async () => await axiosInstance.post("/users/logout", {});
	getAllUsers = async () => await axiosInstance.get("/users/");
	checkCookie = async () => await axiosInstance.get("/users/check-cookie");
}

const authServices = new authService();

export default authServices;
