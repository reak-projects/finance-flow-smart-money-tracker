import axios from 'axios';

const exchangeApi = axios.create({
  baseURL: 'https://api.exchangerate-api.com/v4',
});

/**
 * Get exchange rates relative to INR.
 */
export const getExchangeRates = async (base = 'INR') => {
  try {
    const res = await exchangeApi.get(`/latest/${base}`);
    return res.data;
  } catch (err) {
    console.error('Exchange rate API error:', err);
    return null;
  }
};
