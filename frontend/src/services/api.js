import axios from "axios";

const API_URL = "http://localhost:5000/api/messages";

export const getConversations = () => axios.get(`${API_URL}/conversations`);
export const getMessages = (id) => axios.get(`${API_URL}/${id}`);
export const sendMessage = (msg) => axios.post(API_URL, msg);
