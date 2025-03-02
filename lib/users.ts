import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

const filePath = path.join(process.cwd(), "data", "users.json")

export interface User {
  id: string
  username: string
  email: string
  password: string
}

export function getUsers(): User[] {
  if (!fs.existsSync(filePath)) {
    return []
  }
  const fileContent = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContent)
}

export function saveUsers(users: User[]) {
  const dirPath = path.dirname(filePath)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers()
  return users.find((user) => user.email === email)
}

export function createUser(username: string, email: string, password: string): User {
  const users = getUsers()
  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    password: bcrypt.hashSync(password, 10),
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function validateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email)
  if (user && bcrypt.compareSync(password, user.password)) {
    return user
  }
  return null
}

