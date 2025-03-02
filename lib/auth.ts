import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

interface User {
  id: string
  email: string
  username: string
  hash: string
  created: Date
  cart: string[]
}

const users: User[] = []

export const register = async (username: string, email: string, password: string): Promise<User> => {
  const existingUser = users.find((u) => u.email === email || u.username === username)
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hash = await bcrypt.hash(password, 10)
  const newUser: User = {
    id: uuidv4(),
    email,
    username,
    hash,
    created: new Date(),
    cart: [],
  }

  users.push(newUser)
  return newUser
}

export const login = async (usernameOrEmail: string, password: string): Promise<User> => {
  const user = users.find((u) => u.email === usernameOrEmail || u.username === usernameOrEmail)
  if (!user) {
    throw new Error("User not found")
  }

  const isValid = await bcrypt.compare(password, user.hash)
  if (!isValid) {
    throw new Error("Invalid password")
  }

  return user
}

export const getUser = (id: string): User | undefined => {
  return users.find((u) => u.id === id)
}

export const logout = (userId: string): void => {
  // In a real application, you would invalidate the user's session here
  console.log(`User ${userId} logged out`)
}

