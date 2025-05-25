import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import memoryStore from "@/lib/memory-store"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (jwtError) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }

    const user = memoryStore.findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Profile retrieved successfully",
        user: userWithoutPassword,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
