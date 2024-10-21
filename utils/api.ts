import axios from 'axios';

const API_URL = 'https://conduit.bondaracademy.com/api';

export async function login(username: string, password: string) {
  const response = await axios.post(`${API_URL}/users/login`, {
    user: { email: username, password: password },
  });
  return response.data.user.token;
}

export async function createArticle(token: string, title: string, description: string, body: string, tagList: string[]) {
  const response = await axios.post(`${API_URL}/articles`, {
    article: {
      title,
      description,
      body,
      tagList
    }
  }, {
    headers: { Authorization: `Token ${token}` }
  });
  return response.data.article;
}

export async function deleteArticle(token: string, slug: string) {
  await axios.delete(`${API_URL}/articles/${slug}`, {
    headers: { Authorization: `Token ${token}` }
  });
}
