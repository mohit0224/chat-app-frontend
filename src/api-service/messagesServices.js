import axiosInstance from "@/helper/axiosInstance";

class messageService {
	getMessage = async (id) =>
		await axiosInstance.get(`/messages/get-message/${id}`);

	sendMessage = async (id, data) =>
		await axiosInstance.post(`/messages/send-message/${id}`, data);
}

const messageServices = new messageService();

export default messageServices;
