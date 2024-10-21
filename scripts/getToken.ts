// scripts/getToken.ts
import { getApiToken } from '../utils/loginapi';

(async () => {
  try {
    const token = await getApiToken();
    console.log('Retrieved Token:', token);
  } catch (error) {
    console.error('Failed to retrieve token:', error);
  }
})();
