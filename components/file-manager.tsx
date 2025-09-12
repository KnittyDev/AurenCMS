"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Download, 
  Search, 
  Filter,
  Grid,
  List,
  MoreVertical,
  Folder,
  File,
  Image,
  Video,
  Music,
  Archive,
  FileText,
  Trash2,
  Share,
  Star,
  Eye,
  Edit,
  Copy,
  Move
} from "lucide-react"

const fileTypes = {
  image: { icon: Image, color: "text-green-400" },
  video: { icon: Video, color: "text-purple-400" },
  audio: { icon: Music, color: "text-pink-400" },
  document: { icon: FileText, color: "text-blue-400" },
  archive: { icon: Archive, color: "text-orange-400" },
  folder: { icon: Folder, color: "text-yellow-400" },
  other: { icon: File, color: "text-gray-400" }
}

const mockFiles = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    type: "document",
    size: "2.4 MB",
    modified: "2024-01-15",
    shared: true,
    starred: false,
    folder: "Documents"
  },
  {
    id: 2,
    name: "Dashboard Design.fig",
    type: "image",
    size: "15.2 MB",
    modified: "2024-01-14",
    shared: false,
    starred: true,
    folder: "Design"
  },
  {
    id: 3,
    name: "Team Meeting Recording.mp4",
    type: "video",
    size: "245.8 MB",
    modified: "2024-01-13",
    shared: true,
    starred: false,
    folder: "Recordings"
  },
  {
    id: 4,
    name: "Database Backup.zip",
    type: "archive",
    size: "1.2 GB",
    modified: "2024-01-12",
    shared: false,
    starred: false,
    folder: "Backups"
  },
  {
    id: 5,
    name: "Logo Assets",
    type: "folder",
    size: "12 files",
    modified: "2024-01-11",
    shared: true,
    starred: true,
    folder: "Assets"
  },
  {
    id: 6,
    name: "Presentation.pptx",
    type: "document",
    size: "8.7 MB",
    modified: "2024-01-10",
    shared: false,
    starred: false,
    folder: "Presentations"
  }
]

const folders = [
  { name: "Documents", count: 24, color: "bg-blue-500/20 text-blue-400" },
  { name: "Design", count: 12, color: "bg-purple-500/20 text-purple-400" },
  { name: "Recordings", count: 8, color: "bg-green-500/20 text-green-400" },
  { name: "Backups", count: 5, color: "bg-orange-500/20 text-orange-400" },
  { name: "Assets", count: 156, color: "bg-pink-500/20 text-pink-400" },
  { name: "Presentations", count: 18, color: "bg-yellow-500/20 text-yellow-400" }
]

export default function FileManager() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [currentFolder, setCurrentFolder] = useState("All Files")
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.3 })

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = currentFolder === "All Files" || file.folder === currentFolder
    const matchesFilter = filterBy === "all" || file.type === filterBy
    return matchesSearch && matchesFolder && matchesFilter
  })

  const handleFileSelect = (fileId: number) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id))
    }
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const getFileType = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'fig'].includes(extension || '')) return 'image'
    if (['mp4', 'avi', 'mov', 'wmv'].includes(extension || '')) return 'video'
    if (['mp3', 'wav', 'flac', 'aac'].includes(extension || '')) return 'audio'
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension || '')) return 'document'
    if (['zip', 'rar', '7z', 'tar'].includes(extension || '')) return 'archive'
    return 'other'
  }

  return (
    <div className="min-h-screen bg-[#0F0F10]">
      {/* Header */}
      <div 
        ref={headerRef}
        className={`bg-gradient-to-b from-[#0F0F10] to-[#1a1a1b] border-b border-white/10 transition-all duration-1000 ${
          headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-light text-white mb-2">File Manager</h1>
              <p className="text-white/70 text-lg">Organize and manage your files</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Folder className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div 
          ref={contentRef}
          className={`grid lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Folders */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <button
                  onClick={() => setCurrentFolder("All Files")}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    currentFolder === "All Files"
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4" />
                    <span className="text-sm">All Files</span>
                  </div>
                  <span className="text-xs text-white/60">{mockFiles.length}</span>
                </button>
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => setCurrentFolder(folder.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      currentFolder === folder.name
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Folder className="h-4 w-4" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    <Badge className={`text-xs ${folder.color}`}>
                      {folder.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Storage */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-sm">Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Used</span>
                    <span className="text-white">2.4 GB</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>4 GB total</span>
                    <span>1.6 GB free</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-white font-medium">{currentFolder}</h2>
                    <Badge className="bg-white/10 text-white/80">
                      {filteredFiles.length} files
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input
                        placeholder="Search files..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-white/40 focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      <option value="document">Documents</option>
                      <option value="image">Images</option>
                      <option value="video">Videos</option>
                      <option value="audio">Audio</option>
                      <option value="archive">Archives</option>
                    </select>
                    
                    <div className="flex items-center border border-white/20 rounded-lg">
                      <Button
                        variant={view === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setView("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={view === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setView("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* File List Header */}
                <div className="flex items-center space-x-4 p-3 border-b border-white/10">
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-white/20"
                  />
                  <span className="text-white/60 text-sm flex-1">Name</span>
                  <span className="text-white/60 text-sm w-24">Size</span>
                  <span className="text-white/60 text-sm w-32">Modified</span>
                  <span className="text-white/60 text-sm w-20">Actions</span>
                </div>

                {/* Files */}
                <div className="space-y-1">
                  {filteredFiles.map((file) => {
                    const fileType = getFileType(file.name)
                    const typeConfig = fileTypes[fileType as keyof typeof fileTypes]
                    const Icon = typeConfig.icon
                    
                    return (
                      <div
                        key={file.id}
                        className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors ${
                          selectedFiles.includes(file.id) ? 'bg-white/10' : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleFileSelect(file.id)}
                          className="rounded border-white/20"
                        />
                        
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`h-8 w-8 rounded flex items-center justify-center ${typeConfig.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-white font-medium text-sm truncate">{file.name}</p>
                              {file.starred && <Star className="h-3 w-3 text-yellow-400 fill-current" />}
                              {file.shared && <Share className="h-3 w-3 text-blue-400" />}
                            </div>
                            <p className="text-white/60 text-xs">{file.folder}</p>
                          </div>
                        </div>
                        
                        <span className="text-white/60 text-sm w-24">{file.size}</span>
                        <span className="text-white/60 text-sm w-32">{file.modified}</span>
                        
                        <div className="flex items-center space-x-1 w-20">
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 p-1">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 p-1">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 p-1">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {filteredFiles.length === 0 && (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No files found</h3>
                    <p className="text-white/60">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
