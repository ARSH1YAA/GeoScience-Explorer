import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Map, Microscope } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">GeoScience Explorer</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Explore
            </Link>
            <Link href="/time-capsules" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Time Capsules
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              About
            </Link>
          </nav>
          <Button asChild>
            <Link href="/explore">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover Scientific Wonders Around You
                </h1>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore science-related landmarks, historical events, and environmental data based on your location.
                  Create digital time capsules to share your discoveries with the world.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/explore">
                      Start Exploring
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/time-capsules">View Time Capsules</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square rounded-full bg-emerald-100 dark:bg-emerald-900/20 p-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-40 w-40 text-emerald-600 opacity-20" />
                  </div>
                  <div className="absolute top-1/4 left-1/4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-bounce-slow">
                    <Microscope className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-pulse">
                    <Map className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover what makes GeoScience Explorer the perfect tool for science enthusiasts and explorers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-full">
                  <Map className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Location-Based Discovery</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Find scientific landmarks and historical events near your current location or any coordinates
                  worldwide.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-full">
                  <Microscope className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Scientific Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Access detailed information about scientific discoveries, research facilities, and natural phenomena.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Digital Time Capsules</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Create and discover digital time capsules with notes, images, and scientific observations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <div className="container flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between md:py-8">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-semibold">GeoScience Explorer</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 GeoScience Explorer. All rights reserved. Created for the Public APIs Hackathon.
          </p>
        </div>
      </footer>
    </div>
  )
}
