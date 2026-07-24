import Image from "next/image";
import type { GitHubUser } from "@/types/github-user";

async function getGitHubUser(): Promise<GitHubUser> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL no está configurada");
  }

  if (!username) {
    throw new Error("NEXT_PUBLIC_GITHUB_USERNAME no está configurada");
  }

  const response = await fetch(`${apiUrl}/user/${username}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información del perfil");
  }

  return response.json();
}

export default async function Home() {
  const user = await getGitHubUser();

  const createdAt = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(user.createdAt));

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
      <section className="w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="h-36 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="px-8 pb-10">
          <div className="-mt-16 flex flex-col items-center gap-6 sm:flex-row sm:items-end">
            <Image
              src={user.avatarUrl}
              alt={`Foto de perfil de ${user.username}`}
              width={128}
              height={128}
              priority
              className="h-32 w-32 rounded-full border-4 border-slate-900 bg-slate-800 object-cover"
            />

            <div className="text-center sm:pb-2 sm:text-left">
              <h1 className="text-3xl font-bold">
                {user.name || user.username}
              </h1>

              <p className="mt-1 text-slate-400">@{user.username}</p>
            </div>
          </div>

          <p className="mt-8 text-center text-lg leading-8 text-slate-300 sm:text-left">
            {user.bio || "Este usuario todavía no agregó una biografía."}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <Stat label="Repositorios" value={user.publicRepositories} />
            <Stat label="Seguidores" value={user.followers} />
            <Stat label="Siguiendo" value={user.following} />
          </div>

          <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <Info
              label="Ubicación"
              value={user.location || "No especificada"}
            />

            <Info label="Empresa" value={user.company || "No especificada"} />

            <Info label="Sitio web" value={user.website || "No especificado"} />

            <Info label="Miembro desde" value={createdAt} />
          </div>

          <a
            href={user.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Ver perfil en GitHub
          </a>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-4 text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-400 sm:text-sm">{label}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 break-words font-medium">{value}</p>
    </div>
  );
}
