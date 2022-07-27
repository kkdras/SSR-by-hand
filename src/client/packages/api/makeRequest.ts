import axios from "axios"
import confing from "./config"

let instance = axios.create({
	baseURL: confing.url,
	headers: {
		...confing.headers
	}
})

export default <T>({
	url = "/",
	method = "get",
	params = {},
	data = {},
	headers = {
	}
}) => {
	return instance.request<T>({
		url,
		headers,
		method,
		params,
		data
	}).then(res => res.data)
}