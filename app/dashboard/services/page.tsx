'use client'

const services = [
  {
    name: "Auth Service",
    description: "Gestion de l'authentification et des sessions utilisateur.",
    status: "actif",
    endpoint: "/api/auth",
    tech: "NextAuth + Prisma",
  },
  {
    name: "API Hello",
    description: "Endpoint protégé de test pour les microservices.",
    status: "actif",
    endpoint: "/api/hello",
    tech: "Next.js API Route",
  },
  {
    name: "Register Service",
    description: "Inscription des nouveaux utilisateurs avec validation.",
    status: "actif",
    endpoint: "/api/auth/register",
    tech: "bcrypt + Prisma",
  },
]

export default function ServicesPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Microservices</h1>
        <p className="text-zinc-500">
          Liste et état des services de l&apos;application.
        </p>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-0.5 rounded-full font-medium">
                    {service.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mb-3">{service.description}</p>
                <div className="flex items-center gap-4 text-xs text-zinc-400">
                  <span>
                    <span className="font-medium text-zinc-600 dark:text-zinc-300">Endpoint :</span>{" "}
                    <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                      {service.endpoint}
                    </code>
                  </span>
                  <span>
                    <span className="font-medium text-zinc-600 dark:text-zinc-300">Tech :</span>{" "}
                    {service.tech}
                  </span>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
