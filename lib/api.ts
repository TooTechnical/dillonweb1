import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

export const getProducts = async () => {
  try {
    const response = await api.get("products/")
    return response.data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

export const getProduct = async (id: number) => {
  try {
    const response = await api.get(`products/${id}/`)
    return response.data
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    throw error
  }
}

export const createComment = async (productId: number, text: string) => {
  try {
    const response = await api.post("comments/", { product: productId, text })
    return response.data
  } catch (error) {
    console.error("Error creating comment:", error)
    throw error
  }
}

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await api.post("users/", { username, email, password })
    return response.data
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("api-auth/login/", { username, password })
    return response.data
  } catch (error) {
    console.error("Error logging in:", error)
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await api.post("api-auth/logout/")
    return response.data
  } catch (error) {
    console.error("Error logging out:", error)
    throw error
  }
}

export default api

