import FileManager from "@/components/file-manager"

export const metadata = {
  title: 'Files - Auren',
  description: 'Manage and organize your files',
}

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <FileManager />
    </div>
  )
}
