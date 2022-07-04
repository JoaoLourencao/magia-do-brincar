import { BASE_URL_API } from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
console.log(BASE_URL_API, "--------------------------------")


const api = axios.create({
  baseURL: BASE_URL_API,
});
console.log(BASE_URL_API, "-------------teste")

console.log(axios, "-------------teste")

api.interceptors.request.use(async (config, error) => {
  const user = JSON.parse(await AsyncStorage.getItem('@MagiaDoBrincar:user'));

  if (user) {
    config.headers.authorization = `${user.token}`;
  }
  return config;
});

export default api;