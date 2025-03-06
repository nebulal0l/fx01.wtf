"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, Key, Loader2, Shield, Info, Lock, CheckCircle, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

const validateKey = (key: string): boolean => {
  const validKeys = ["FX01WTF_AUTH", "FX01WTF_AUTH2"]
  return validKeys.includes(key.trim().toUpperCase())
}

export default function Home() {
  const { toast } = useToast()
  const router = useRouter()
  const [key, setKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowPosition, setGlowPosition] = useState({ x: "50%", y: "50%" })

  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Update glow position for card hover effect
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setGlowPosition({ x: `${x}%`, y: `${y}%` })

        // Update CSS variables for the glow effect
        cardRef.current.style.setProperty("--glow-position-x", `${x}%`)
        cardRef.current.style.setProperty("--glow-position-y", `${y}%`)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleKeyCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!key.trim()) return

    setIsLoading(true)

    try {
      const isValid = validateKey(key)

      if (isValid) {
        localStorage.setItem("fx01_key", key.trim().toUpperCase())
        toast({
          title: "Access granted",
          description: "Redirecting you to the dashboard...",
          className: "bg-zinc-900 border border-red-500/20",
        })

        document.body.style.opacity = "0"
        document.body.style.transition = "opacity 0.5s ease"

        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
      } else {
        throw new Error("Invalid authentication key")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Invalid key",
        description: "Please check your key and try again",
      })

      const input = document.querySelector("input")
      input?.classList.add("animate-shake")
      setTimeout(() => input?.classList.remove("animate-shake"), 500)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-white flex flex-col"
      style={{
        backgroundImage: `radial-gradient(
          circle at ${mousePosition.x}px ${mousePosition.y}px,
          rgba(220, 38, 38, 0.12) 0%,
          rgba(0, 0, 0, 0) 50%
        )`,
      }}
    >
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03]"></div>
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-red-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-red-900/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Animated lines */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] border border-red-500/5 rounded-full animate-pulse-slow"></div>
          <div className="absolute w-[600px] h-[600px] border border-red-500/10 rounded-full animate-pulse-slow animation-delay-1000"></div>
          <div className="absolute w-[400px] h-[400px] border border-red-500/20 rounded-full animate-pulse-slow animation-delay-2000"></div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-red-500/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-red-500/30 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-red-500/20 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-float animation-delay-3000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-red-500/20 bg-black/60 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent animate-gradient-x">
                fx01.wtf
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-zinc-400">Premium Access</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-md mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="space-y-8">
            {/* Welcome Card */}
            <Card
              ref={cardRef}
              className="relative overflow-hidden backdrop-blur-xl bg-black/40 border-red-500/20 group card-3d"
            >
              {/* Animated border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-red-500/40 via-red-600/40 to-red-500/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-flow"></div>

              <div className="relative">
                <CardHeader className="space-y-1 pb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-red-400" />
                    <CardTitle className="text-2xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      Welcome to fx01.wtf
                    </CardTitle>
                  </div>
                  <CardDescription className="text-zinc-400">Premium access to exclusive content</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleKeyCheck} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-red-400" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Enter your access key"
                            value={key}
                            onChange={(e) => setKey(e.target.value.trim())}
                            className="pl-10 bg-black/40 border-red-500/20 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300"
                      disabled={isLoading || !key}
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                          Continue to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="grid gap-4">
              {/* Security Info */}
              <Card className="backdrop-blur-xl bg-black/40 border-red-500/20 hover:border-red-500/40 transition-colors duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-500/10 p-3 rounded-lg">
                      <Lock className="h-6 w-6 text-red-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-white group-hover:text-red-400 transition-colors duration-300">
                        Access Key Required
                      </h3>
                      <p className="text-sm text-zinc-400">
                        This system requires an access key to prevent abuse and protect against automated bots. Your
                        security is our priority.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="backdrop-blur-xl bg-black/40 border-red-500/20 hover:border-red-500/40 transition-colors duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="pt-6 relative">
                  <div className="space-y-4">
                    <h3 className="font-medium text-white group-hover:text-red-400 transition-colors duration-300 flex items-center">
                      <CheckCircle className="h-5 w-5 text-red-400 mr-2" />
                      Premium Features
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-zinc-400 group/item">
                          <span className="h-1 w-1 rounded-full bg-red-400 mr-2 group-hover/item:scale-150 transition-transform duration-300"></span>
                          <span className="group-hover/item:text-red-400 transition-colors duration-300">
                            24/7 Access
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-zinc-400 group/item">
                          <span className="h-1 w-1 rounded-full bg-red-400 mr-2 group-hover/item:scale-150 transition-transform duration-300"></span>
                          <span className="group-hover/item:text-red-400 transition-colors duration-300">
                            Regular Updates
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-zinc-400 group/item">
                          <span className="h-1 w-1 rounded-full bg-red-400 mr-2 group-hover/item:scale-150 transition-transform duration-300"></span>
                          <span className="group-hover/item:text-red-400 transition-colors duration-300">
                            Premium Support
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-zinc-400 group/item">
                          <span className="h-1 w-1 rounded-full bg-red-400 mr-2 group-hover/item:scale-150 transition-transform duration-300"></span>
                          <span className="group-hover/item:text-red-400 transition-colors duration-300">
                            Exclusive Content
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Help dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-zinc-400 hover:text-red-400 transition-colors duration-300 mx-auto block group"
                >
                  <Info className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  Need help?
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900/95 border border-red-500/20 backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    Need Assistance?
                  </DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    If you are unable to gain access, please contact us directly.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-black/40 border border-red-500/20">
                    <div className="bg-red-500/10 p-3 rounded-full">
                      <Info className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Contact dxs8 on Discord</p>
                      <p className="text-sm text-zinc-400">You will be given the access key.</p>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button
                    className="absolute top-3 right-3 p-1 rounded-full bg-transparent hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                    variant="ghost"
                    size="icon"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-red-500/20 bg-black/60 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">© {new Date().getFullYear()} fx01.wtf. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-red-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-red-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-red-400 transition-colors duration-300">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

