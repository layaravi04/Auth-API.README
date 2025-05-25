import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Sparkles, Star, Users, Cherry } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setMessage(errorData.error || "Signup failed")
        return
      }

      const data = await response.json()
      setMessage("Account created successfully!")
    } catch (error) {
      setMessage("Network error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setMessage(errorData.error || "Login failed")
        return
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      setMessage("Login successful!")
      setTimeout(() => router.push("/profile"), 1000)
    } catch (error) {
      setMessage("Network error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-20 text-pink-300 w-8 h-8 animate-pulse" />
        <Sparkles className="absolute top-32 right-32 text-red-300 w-6 h-6 animate-bounce" />
        <Star className="absolute bottom-32 left-32 text-pink-400 w-7 h-7 animate-pulse" />
        <Users className="absolute bottom-20 right-20 text-red-400 w-8 h-8 animate-bounce" />
        <Cherry className="absolute top-1/2 left-10 text-red-500 w-6 h-6 animate-pulse" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4 shadow-lg">
            <Cherry className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Cherry APIs
          </h1>
          <p className="text-red-600 mt-2 font-medium">Sweet & Secure Authentication</p>
        </div>

        <Card className="border-2 border-pink-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-700 flex items-center justify-center gap-2">
              <Cherry className="w-6 h-6" />
              Cherry Authentication
            </CardTitle>
            <CardDescription className="text-pink-600">Join our sweet community with secure APIs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-pink-100">
                <TabsTrigger value="login" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-red-700">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="border-pink-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-red-700">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-pink-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                  >
                    {isLoading ? "Authenticating..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-red-700">
                      Name
                    </Label>
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="Your sweet name"
                      required
                      className="border-pink-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-red-700">
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="border-pink-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-red-700">
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-pink-200 focus:border-red-500 focus:ring-red-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg"
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {message && (
              <div
                className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  message.includes("successful") || message.includes("created")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
            <div className="mt-6 bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                <Cherry className="w-4 h-4" />
                Cherry APIs Features:
              </h3>
              <ul className="space-y-2 text-sm text-red-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  bcrypt password hashing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  JWT tokens with expiry
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  Protected routes
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-red-600">
          <p className="text-sm">Cherry APIs • Made with love and sweetness!</p>
        </div>
      </div>
    </div>
  )
}
