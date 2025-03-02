import { NextResponse } from "next/server"
import { validateUser } from "@/lib/users"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const user = validateUser(email, password)

  if (user) {
    // In a real app, you'd set a session or JWT token here
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
  }
}

