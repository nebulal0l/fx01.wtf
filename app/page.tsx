"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, Key, Loader2, Shield, Info, Lock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const validateKey = (key: string): boolean => {
  const validKeys = ["FX01WTF_AUTH", "FX01WTF_AUTH2"]
  return validKeys.includes(key.trim().toUpperCase())
}

export default function Home() {
  const { toast } = useToast()
  const router = useRouter()
  const [key, setKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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
          className: "bg-zinc-900",
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
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-900 to-black text-white flex flex-col">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-violet-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
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
            <Card className="backdrop-blur-xl bg-black/40 border-white/10">
              <CardHeader className="space-y-1 pb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Welcome to fx01.wtf
                  </CardTitle>
                </div>
                <CardDescription className="text-zinc-400">Premium access to exclusive content</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleKeyCheck} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Key className="h-5 w-5 text-zinc-400" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Enter your access key"
                          value={key}
                          onChange={(e) => setKey(e.target.value.trim())}
                          className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white transition-all duration-300"
                    disabled={isLoading || !key}
                  >
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
            </Card>

            {/* Info Cards */}
            <div className="grid gap-4">
              {/* Security Info */}
              <Card className="backdrop-blur-xl bg-black/40 border-white/10">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <Lock className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-white">Access Key Required</h3>
                      <p className="text-sm text-zinc-400">
                        This system requires an access key to prevent abuse and protect against automated bots. Your
                        security is our priority.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="backdrop-blur-xl bg-black/40 border-white/10">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-white flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                      Premium Features
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-zinc-400">
                          <span className="h-1 w-1 rounded-full bg-blue-400 mr-2"></span>
                          24/7 Access
                        </div>
                        <div className="flex items-center text-sm text-zinc-400">
                          <span className="h-1 w-1 rounded-full bg-blue-400 mr-2"></span>
                          Regular Updates
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-zinc-400">
                          <span className="h-1 w-1 rounded-full bg-blue-400 mr-2"></span>
                          Premium Support
                        </div>
                        <div className="flex items-center text-sm text-zinc-400">
                          <span className="h-1 w-1 rounded-full bg-blue-400 mr-2"></span>
                          Exclusive Content
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Help tooltip */}
            <TooltipProvider>
              <div className="text-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="link" className="text-zinc-400 hover:text-zinc-300">
                      <Info className="h-4 w-4 mr-2" />
                      Need help?
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Contact support for assistance</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">© {new Date().getFullYear()} fx01.wtf. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

