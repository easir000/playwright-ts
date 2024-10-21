import { getApiToken } from './utils/loginapi';

(async () => {
  try {
    const token = await getApiToken('easir956@gmail.com', '123456');
    console.log('Token retrieved:', token);
  } catch (error) {
    console.error('Failed to retrieve token:', error.message);
  }
})();
