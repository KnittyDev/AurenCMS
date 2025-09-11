import Projects from "@/components/projects"

export const metadata = {
  title: 'Projects - Auren',
  description: 'Manage your projects and track progress',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <Projects />
    </div>
  )
}
