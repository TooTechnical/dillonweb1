import { NextResponse } from "next/server"
import { createUser, findUserByEmail } from "@/lib/users"

export async function POST(request: Request) {
  const { username, email, password } = await request.json()

  if (findUserByEmail(email)) {
    return NextResponse.json({ message: "Email already in use" }, { status: 400 })
  }

  const user = createUser(username, email, password)

  return NextResponse.json({ success: true })
}

