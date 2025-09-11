"use client"

import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  FolderOpen,
  Star,
  Edit,
  Trash2,
  Eye
} from "lucide-react"

const projects = [
  {
    id: 1,
    name: "E-commerce Dashboard",
    description: "Modern dashboard for e-commerce analytics and management",
    status: "active",
    priority: "high",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    team: ["John Doe", "Jane Smith", "Mike Johnson"],
    tags: ["React", "TypeScript", "Analytics"],
    budget: "$15,000",
    spent: "$11,250"
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    description: "Complete redesign of the mobile application interface",
    status: "planning",
    priority: "medium",
    progress: 25,
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    team: ["Sarah Wilson", "David Lee"],
    tags: ["React Native", "UI/UX", "Mobile"],
    budget: "$25,000",
    spent: "$6,250"
  },
  {
    id: 3,
    name: "API Integration",
    description: "Integrate third-party APIs for payment processing",
    status: "completed",
    priority: "high",
    progress: 100,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    team: ["Alex Chen", "Emma Davis"],
    tags: ["API", "Payment", "Backend"],
    budget: "$8,000",
    spent: "$7,500"
  },
  {
    id: 4,
    name: "Security Audit",
    description: "Comprehensive security audit and vulnerability assessment",
    status: "on-hold",
    priority: "low",
    progress: 40,
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    team: ["Security Team"],
    tags: ["Security", "Audit", "Compliance"],
    budget: "$12,000",
    spent: "$4,800"
  }
]

const statusColors = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  planning: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "on-hold": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
}

const priorityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30"
}

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.3 })
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation({ threshold: 0.2 })

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  // Statistics
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === "active").length,
    completed: projects.filter(p => p.status === "completed").length,
    onHold: projects.filter(p => p.status === "on-hold").length
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
              <h1 className="text-4xl font-light text-white mb-2">Projects</h1>
              <p className="text-white/70 text-lg">Manage and track your project portfolio</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div 
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-1000 delay-200 ${
            statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Projects</p>
                  <p className="text-2xl font-light text-white">{stats.total}</p>
                </div>
                <FolderOpen className="h-8 w-8 text-white/40" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Active</p>
                  <p className="text-2xl font-light text-white">{stats.active}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Completed</p>
                  <p className="text-2xl font-light text-white">{stats.completed}</p>
                </div>
                <Circle className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">On Hold</p>
                  <p className="text-2xl font-light text-white">{stats.onHold}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div 
          ref={projectsRef}
          className={`mb-8 transition-all duration-1000 delay-400 ${
            projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-white/40 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="planning">Planning</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
                
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:border-white/40 focus:outline-none"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg mb-2">{project.name}</CardTitle>
                    <CardDescription className="text-white/70 text-sm mb-3">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                  </Badge>
                  <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm">Progress</span>
                    <span className="text-white text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Budget</span>
                    <span className="text-white">{project.budget}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Spent</span>
                    <span className="text-white">{project.spent}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Team</span>
                    <span className="text-white">{project.team.length} members</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">End Date</span>
                    <span className="text-white">{project.endDate}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-white/10 text-white/80 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No projects found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Create Project Modal */}
      {showCreateForm && (
        <CreateProjectModal
          onClose={() => setShowCreateForm(false)}
          onSubmit={(project) => {
            // Handle project creation
            console.log('New project:', project)
            setShowCreateForm(false)
          }}
        />
      )}
    </div>
  )
}

// Project Detail Modal Component
function ProjectDetailModal({ project, onClose }: { project: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-[#1a1a1b] border-white/20 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-white text-2xl mb-2">{project.name}</CardTitle>
              <CardDescription className="text-white/70 text-lg">{project.description}</CardDescription>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project details would go here */}
          <p className="text-white/60">Project details and management interface would be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

// Create Project Modal Component
function CreateProjectModal({ onClose, onSubmit }: { onClose: () => void, onSubmit: (project: any) => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#1a1a1b] border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Create New Project</CardTitle>
          <CardDescription className="text-white/70">
            Start a new project and track its progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/60">Project creation form would be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
