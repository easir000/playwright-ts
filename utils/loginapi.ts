// utils/api.ts
import axios from 'axios';

const BASE_URL = 'https://conduit.bondaracademy.com/api'; // API base URL

// Function to get the API token
export async function getApiToken(): Promise<string> {
  try {
    // Sending the login request to get the token
    const response = await axios.post(`${BASE_URL}/users/login`, {
      user: {
        email: 'easir956@gmail.com',   // Use your email
        password: '123456',            // Use your password
      },
    });

    // Assuming the token is in response.data.user.token
    const token = response.data.user.token;
    console.log('API Token:', token); // Log the token to verify
    return token;
  } catch (error) {
    console.error('Error fetching API token:', error.response?.data || error.message);
    throw new Error('Failed to get API token');
  }
}
