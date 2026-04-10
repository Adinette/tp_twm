'use client'

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Paramètres</h1>
        <p className="text-zinc-500">Configuration de l&apos;application.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Général */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="font-semibold mb-4">Général</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Thème</p>
                <p className="text-xs text-zinc-500">Suit les préférences système</p>
              </div>
              <span className="text-sm text-zinc-400">Auto</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Langue</p>
                <p className="text-xs text-zinc-500">Langue de l&apos;interface</p>
              </div>
              <span className="text-sm text-zinc-400">Français</span>
            </div>
          </div>
        </div>

        {/* Info technique */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="font-semibold mb-4">Informations techniques</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Next.js</span>
              <span className="font-mono">16.2.2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Prisma</span>
              <span className="font-mono">7.7.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">NextAuth</span>
              <span className="font-mono">4.24.13</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">PostgreSQL</span>
              <span className="font-mono">18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">React</span>
              <span className="font-mono">19.2.4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
