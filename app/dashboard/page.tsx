"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Download, FileCode2, Gamepad2, Loader2, Calendar, Search, Filter, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContentItem {
  url: string
  name: string
  fileDate: string
  gameName: string
  type: "CFG" | "CHEAT"
}

const mockData: ContentItem[] = [
  {
    url: "https://example.com/file1.cfg",
    name: "SUPREME_RAGE",
    fileDate: "2024-03-02",
    gameName: "CS2",
    type: "CFG",
  },
  {
    url: "https://example.com/file2.dll",
    name: "AIMBOT_V2",
    fileDate: "2024-03-01",
    gameName: "CS2",
    type: "CHEAT",
  },
  {
    url: "https://example.com/file3.cfg",
    name: "HEADSHOT_PRO",
    fileDate: "2024-03-03",
    gameName: "VALORANT",
    type: "CFG",
  },
  {
    url: "https://example.com/file4.dll",
    name: "TRIGGER_MASTER",
    fileDate: "2024-03-02",
    gameName: "APEX",
    type: "CHEAT",
  },
]

export default function Dashboard() {
  const { toast } = useToast()
  const router = useRouter()
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGame, setSelectedGame] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    const key = localStorage.getItem("fx01_key")
    if (!key) {
      router.push("/")
      return
    }

    const fetchContent = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setContent(mockData)
      } catch (error) {
        console.error("Error:", error)
        toast({
          title: "Error",
          description: "Failed to load content. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [router, toast])

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGame = selectedGame === "all" || item.gameName === selectedGame
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesGame && matchesType
  })

  const uniqueGames = Array.from(new Set(content.map((item) => item.gameName)))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-zinc-400">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold">fx01.wtf</span>
            <div className="h-6 w-px bg-zinc-800"></div>
            <div className="flex items-center space-x-2 text-sm text-zinc-400">
              <span className="inline-flex items-center justify-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
                Premium Access
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white"
            onClick={() => {
              localStorage.removeItem("fx01_key")
              router.push("/")
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl font-semibold">Downloads</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search files..."
                className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  {uniqueGames.map((game) => (
                    <SelectItem key={game} value={game}>
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="CFG">Config</SelectItem>
                  <SelectItem value="CHEAT">Cheat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((item, index) => (
            <Card key={index} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-zinc-400">
                        <Gamepad2 className="h-4 w-4" />
                        <span>{item.gameName}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center space-x-1 text-xs text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.fileDate).toLocaleDateString()}</span>
                      </span>
                      <span
                        className={`inline-flex items-center space-x-1 text-xs ${
                          item.type === "CFG" ? "text-blue-500" : "text-purple-500"
                        }`}
                      >
                        {item.type === "CFG" ? <FileCode2 className="h-3 w-3" /> : <Gamepad2 className="h-3 w-3" />}
                        <span>{item.type}</span>
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    onClick={() => {
                      window.open(item.url, "_blank")
                      toast({
                        title: "Download started",
                        description: `Downloading ${item.name}`,
                      })
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-900 mb-4">
              <Filter className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-400">No results found</h3>
            <p className="text-sm text-zinc-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-sm text-zinc-500">© {new Date().getFullYear()} fx01.wtf</span>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-zinc-500">Premium Access</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

