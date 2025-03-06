"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import {
  Download,
  FileCode2,
  Gamepad2,
  Loader2,
  Calendar,
  ExternalLink,
  Search,
  Filter,
  LogOut,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Star,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ContentItem {
  url: string
  name: string
  fileDate: string
  gameName: string
  type: "CFG" | "CHEAT"
  isNew?: boolean
  isPopular?: boolean
}

const mockData: ContentItem[] = [
  {
    url: "https://example.com/file1.cfg",
    name: "SUPREME_RAGE",
    fileDate: "2024-03-02",
    gameName: "CS2",
    type: "CFG",
    isPopular: true,
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
    isNew: true,
  },
  {
    url: "https://example.com/file4.dll",
    name: "TRIGGER_MASTER",
    fileDate: "2024-03-02",
    gameName: "APEX",
    type: "CHEAT",
    isPopular: true,
  },
  {
    url: "https://example.com/file5.cfg",
    name: "RECOIL_CONTROL",
    fileDate: "2024-03-04",
    gameName: "FORTNITE",
    type: "CFG",
    isNew: true,
  },
  {
    url: "https://example.com/file6.dll",
    name: "ESP_VISION",
    fileDate: "2024-03-05",
    gameName: "VALORANT",
    type: "CHEAT",
    isNew: true,
    isPopular: true,
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyPopular, setShowOnlyPopular] = useState(false)

  // Track mouse position for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

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

  const sortContent = (items: ContentItem[]) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.fileDate).getTime()
      const dateB = new Date(b.fileDate).getTime()
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB
    })
  }

  const filteredContent = sortContent(
    content.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.gameName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGame = selectedGame === "all" || item.gameName === selectedGame
      const matchesType = selectedType === "all" || item.type === selectedType
      const matchesNew = !showOnlyNew || item.isNew
      const matchesPopular = !showOnlyPopular || item.isPopular
      return matchesSearch && matchesGame && matchesType && matchesNew && matchesPopular
    }),
  )

  const uniqueGames = Array.from(new Set(content.map((item) => item.gameName)))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl animate-pulse"></div>
            <Loader2 className="h-8 w-8 animate-spin text-red-500 relative z-10" />
          </div>
          <p className="text-zinc-400">Loading your premium content...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{
        backgroundImage: `radial-gradient(
          circle at ${mousePosition.x}px ${mousePosition.y}px,
          rgba(220, 38, 38, 0.08) 0%,
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

      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-red-500/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-red-500/30 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-red-500/20 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-float animation-delay-3000"></div>
      </div>

      <header className="sticky top-0 z-50 border-b border-red-500/20 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent animate-gradient-x">
              fx01.wtf
            </span>
            <div className="h-6 w-px bg-red-500/20"></div>
            <div className="flex items-center space-x-2 text-sm text-zinc-400">
              <span className="inline-flex items-center justify-center rounded-full bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/20">
                Premium Access
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-red-400 transition-colors duration-300 group"
            onClick={() => {
              localStorage.removeItem("fx01_key")
              router.push("/")
            }}
          >
            <LogOut className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 space-y-4">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Premium Downloads
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search files..."
                className="pl-10 bg-zinc-900/50 border-red-500/10 text-white placeholder:text-zinc-500 focus:border-red-500/30 focus:ring-red-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger className="w-[140px] bg-zinc-900/50 border-red-500/10 focus:ring-red-500/20">
                  <SelectValue placeholder="Game" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-red-500/20">
                  <SelectItem value="all">All Games</SelectItem>
                  {uniqueGames.map((game) => (
                    <SelectItem key={game} value={game}>
                      {game}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] bg-zinc-900/50 border-red-500/10 focus:ring-red-500/20">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-red-500/20">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="CFG">Config</SelectItem>
                  <SelectItem value="CHEAT">Cheat</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-zinc-900/50 border-red-500/10 hover:bg-red-500/10 hover:text-red-400"
                  >
                    {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-red-500/20">
                  <DropdownMenuItem
                    onClick={() => setSortOrder("desc")}
                    className={sortOrder === "desc" ? "text-red-400" : ""}
                  >
                    Newest first
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOrder("asc")}
                    className={sortOrder === "asc" ? "text-red-400" : ""}
                  >
                    Oldest first
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="outline"
                size="icon"
                className={`bg-zinc-900/50 border-red-500/10 ${viewMode === "grid" ? "text-red-400" : "text-zinc-400"} hover:bg-red-500/10 hover:text-red-400`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`bg-zinc-900/50 border-red-500/10 ${viewMode === "list" ? "text-red-400" : "text-zinc-400"} hover:bg-red-500/10 hover:text-red-400`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={`cursor-pointer border-red-500/20 ${showOnlyNew ? "bg-red-500/10 text-red-400" : "bg-zinc-900/50 text-zinc-400"} hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30`}
              onClick={() => setShowOnlyNew(!showOnlyNew)}
            >
              <Clock className="h-3 w-3 mr-1" />
              New
            </Badge>

            <Badge
              variant="outline"
              className={`cursor-pointer border-red-500/20 ${showOnlyPopular ? "bg-red-500/10 text-red-400" : "bg-zinc-900/50 text-zinc-400"} hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30`}
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
            >
              <Star className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-zinc-900/50 border-red-500/10 hover:border-red-500/30 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium group-hover:text-red-400 transition-colors duration-300">
                            {item.name}
                          </h3>
                          {item.isNew && <Badge className="bg-red-500/10 text-red-400 border-red-500/20">New</Badge>}
                          {item.isPopular && (
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
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
                            item.type === "CFG" ? "text-red-400" : "text-red-500"
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
                      className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300"
                      onClick={() => {
                        window.open(item.url, "_blank")
                        toast({
                          title: "Download started",
                          description: `Downloading ${item.name}`,
                          className: "bg-zinc-900 border border-red-500/20",
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
        ) : (
          <Card className="bg-zinc-900/50 border-red-500/10">
            <CardContent className="p-0">
              <div className="divide-y divide-red-500/10">
                {filteredContent.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 hover:bg-red-500/5 transition-colors duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${item.type === "CFG" ? "bg-red-400/10" : "bg-red-500/10"}`}>
                        {item.type === "CFG" ? (
                          <FileCode2 className="h-4 w-4 text-red-400" />
                        ) : (
                          <Gamepad2 className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium group-hover:text-red-400 transition-colors duration-300">
                            {item.name}
                          </h3>
                          {item.isNew && <Badge className="bg-red-500/10 text-red-400 border-red-500/20">New</Badge>}
                          {item.isPopular && (
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-zinc-400">{item.gameName}</span>
                          <span className="text-zinc-500 text-xs">{new Date(item.fileDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300"
                      onClick={() => {
                        window.open(item.url, "_blank")
                        toast({
                          title: "Download started",
                          description: `Downloading ${item.name}`,
                          className: "bg-zinc-900 border border-red-500/20",
                        })
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
              <Filter className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-400">No results found</h3>
            <p className="text-sm text-zinc-500 mt-1">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-red-500/20 bg-black/80 backdrop-blur-xl">
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

