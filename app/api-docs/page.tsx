import ApiDocs from "@/components/api-docs"

export const metadata = {
  title: 'API Documentation - Auren',
  description: 'Complete API reference and documentation',
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10]">
      <ApiDocs />
    </div>
  )
}
