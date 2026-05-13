import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Blog API calls
export const blogAPI = {
  getAll: () => apiClient.get('/blogs'),
  getById: (id) => apiClient.get(`/blogs/${id}`),
  create: (data) => apiClient.post('/blogs', data),
  update: (id, data) => apiClient.put(`/blogs/${id}`, data),
  delete: (id) => apiClient.delete(`/blogs/${id}`)
}

// Contact API calls
export const contactAPI = {
  sendMessage: (data) => apiClient.post('/contact', data)
}

// GitHub API calls
export const githubAPI = {
  getRepos: () => {
    const token = import.meta.env.VITE_GITHUB_API_TOKEN
    const username = import.meta.env.VITE_GITHUB_USERNAME
    
    return axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`,
      {
        headers: token ? { 'Authorization': `token ${token}` } : {}
      }
    )
  }
}

export default apiClient
