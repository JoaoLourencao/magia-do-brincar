import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage";
import {BASE_URL_API} from "@env"

const api = axios.create({
  baseURL: BASE_URL_API,
})

api.interceptors.request.use(async (config, error) => {
  const user = JSON.parse(await AsyncStorage.getItem('@FoxDetail:user'))

  if(user) {
    config.headers.authorization = `${user.token}`
  }
  return config
})

export default api