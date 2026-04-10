'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import DashboardSidebar from "../components/DashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!session) {
    router.push("/front/auth/login")
    return null
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <div className="flex-1 bg-zinc-50 dark:bg-black">
        {children}
      </div>
    </div>
  )
}
