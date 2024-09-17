import { Loader2 } from "lucide-react"
import Layout from "@/app/ui/components/Layout"

export default function callbackPage() {
  return (
    <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <h1 className="text-2xl font-semibold text-foreground animate-pulse">
          Processing authentication, please wait...
        </h1>
      </div>
    </div>
    </Layout>

  )
}