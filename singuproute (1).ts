import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import memoryStore from "@/lib/memory-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body
    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }
    const existingUser = memoryStore.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }

    memoryStore.addUser(newUser)

    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
