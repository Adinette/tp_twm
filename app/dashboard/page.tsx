'use client'
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Chargement...</p>
      </div>
    )
  }

  if (!session) {
    router.push("/front/auth/login")
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="bg-white dark:bg-zinc-900 shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Projet TWM - Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {session.user?.name} ({session.user?.email})
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/front/auth/login" })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenue, {session.user?.name} !
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Vous êtes connecté au tableau de bord du projet TWM.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Microservices</h3>
            <p className="text-sm text-zinc-500">Gestion des microservices de l&apos;application</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Utilisateurs</h3>
            <p className="text-sm text-zinc-500">Gestion des comptes et des accès</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">API</h3>
            <p className="text-sm text-zinc-500">Documentation et test des endpoints</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
            <h3 className="font-semibold text-lg mb-2">Paramètres</h3>
            <p className="text-sm text-zinc-500">Configuration de l&apos;application</p>
          </div>
        </div>
      </main>
    </div>
  )
}
