import axios from 'axios';
import errorHandle from './error';
import { UAParser } from 'ua-parser-js';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const Api = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
    }
    return Promise.reject(error);
  }
);
export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await Api.post('/login', userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const signup = async (userData: { name: string; email: string; password: string }) => {
  try {
    const response = await Api.post('/signup', userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const createUrl = async (userData: {
  title: string;
  longUrl: string;
  customUrl: string;
  user_id: string;
}) => {
  try {
    const shortUrl = Math.random().toString(36).substring(2, 6);
    const fileName = `qr-${shortUrl}`;
    const response = await Api.post('/create_url', userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const createLink = async (formData: any) => {
  try {
    const response = await Api.post('/create_link', formData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchUrls = async (userId: string) => {
  try {
    const response = await Api.get(`/fetch_urls/${userId}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const deleteLink = async (urlId: string) => {
  try {
    const response = await Api.patch('/delete_link', { urlId });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || 'desktop'; // Default to desktop if type is not detected

    const response = await fetch('https://ipapi.co/json');
    const { city, country_name: country } = await response.json();

    // Record the click
    await Api.post('/clicks_create', {
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error('Error recording click:', error);
  }
};

export const fetchLongUrl = async (urlId: string) => {
  try {
    const response = await Api.get(`/get_long_url/${urlId}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchLinkData = async (urlId: string, userId: string) => {
  try {
    const response = await Api.get(`/fetch_link_data/${urlId}/${userId}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const fetchClicksForUrl = async (urlId: string) => {
  try {
    const response = await Api.get(`/fetch_clicks_for_url/${urlId}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
export const fetchTotalClicks = async () => {
  try {
    const response = await Api.get(`/fetch_total_clicks}`);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};
