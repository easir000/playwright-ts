// utils/api.ts
import axios from 'axios';

const BASE_URL = 'https://conduit.bondaracademy.com/api';

export async function getApiToken(email: string, password: string): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      user: {
        email: email,
        password: password,
      },
    });

    const token = response.data.user.token;
    console.log('API Token:', token);
    return token;  // Return the token if successful
  } catch (error) {
    console.error('Error fetching API token:', error);  // Log the error details
    throw new Error('Failed to get API token');  // Throw an error with a custom message
  }
}
