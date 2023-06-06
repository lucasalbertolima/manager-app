import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiaxios = axios.create({
  baseURL: 'https://api.managertrading.com',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

apiaxios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const sendReceipt = async (datadata) => {
  try {
    const response = await apiaxios.post(
      `/trade/send-receipt?transfer_id=${datadata.transfer_id}&client_id=${datadata.client_id}`, datadata.image
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiaxios;
