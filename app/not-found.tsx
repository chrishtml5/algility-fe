import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-theme px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-[#144132] mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-[#144132] mb-6">Page Not Found</h2>
      <p className="text-lg md:text-xl text-[#2A6B4F] max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full px-6 py-3 text-base font-medium bg-[#144132] text-white hover:bg-[#BEE847] hover:text-zinc-900 transition-colors duration-300"
      >
        Return Home
      </Link>
    </div>
  )
}
