import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiaxios = axios.create({
  baseURL: 'https://api.managertrading.com',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

apiaxios.interceptors.request.use((config) => {
  return AsyncStorage.getItem('token').then((token) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
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

export const newRescueRequest = async (data) => {
  try {
    const response = await apiaxios.post(
      `/trade/rescue?client_id=`, data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSymbolInfo = async (data) => {
  try {
    const response = await apiaxios.get(
      `/trade/symbol?symbol_id=${data}`, 
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInternalTransfers = async () => {
  try {
    const response = await apiaxios.get(
      `/trade/internal-transfers?index=0&length=&order_by=created_at&type=all&asc=desc&date_start=&date_end=&client_id=`, 
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiaxios;
