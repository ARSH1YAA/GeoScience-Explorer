import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ExternalLink, Database, MapPin, Thermometer } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
  return (
    <div className="container py-8 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Globe className="h-8 w-8 text-emerald-600" />
          About GeoScience Explorer
        </h1>
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            GeoScience Explorer is an interactive web application that combines geolocation with scientific data from
            various public APIs. It allows users to discover science-related landmarks, historical events, and
            environmental data based on their location or any coordinates worldwide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Public APIs Used</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-600" />
                  Wikipedia GeoSearch API
                </CardTitle>
                <CardDescription>Finds locations near specified coordinates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Used to discover points of interest near the user's location, filtered for science-related content.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href="https://www.mediawiki.org/wiki/API:Geosearch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    API Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-600" />
                  Wikipedia REST API
                </CardTitle>
                <CardDescription>Retrieves detailed information about articles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Provides summaries, images, and additional metadata for discovered locations.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href="https://en.wikipedia.org/api/rest_v1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    API Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-600" />
                  Wikidata API
                </CardTitle>
                <CardDescription>Structured data about entities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Retrieves additional structured data like inception dates for scientific landmarks.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href="https://www.wikidata.org/wiki/Wikidata:Data_access"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    API Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-emerald-600" />
                  Open-Meteo Weather API
                </CardTitle>
                <CardDescription>Free weather data API</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Provides current weather conditions and forecasts for the selected location.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link
                    href="https://open-meteo.com/en/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    API Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              GeoScience Explorer is built with modern web technologies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Next.js:</strong> React framework for server-side rendering and static site generation
              </li>
              <li>
                <strong>React:</strong> JavaScript library for building user interfaces
              </li>
              <li>
                <strong>Tailwind CSS:</strong> Utility-first CSS framework for rapid UI development
              </li>
              <li>
                <strong>shadcn/ui:</strong> Reusable component library built with Radix UI and Tailwind
              </li>
              <li>
                <strong>Leaflet:</strong> Open-source JavaScript library for interactive maps
              </li>
              <li>
                <strong>React Leaflet:</strong> React components for Leaflet maps
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xl font-bold">Location-Based Discovery</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Use your current location or enter custom coordinates to explore scientific points of interest nearby.
              </p>
            </div>

            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xl font-bold">Interactive Maps</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Visualize scientific locations and time capsules on interactive maps for easy exploration.
              </p>
            </div>

            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xl font-bold">Weather Data</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Access current weather conditions and forecasts for your selected location.
              </p>
            </div>

            <div className="flex flex-col space-y-2 rounded-lg border p-6 shadow-sm dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xl font-bold">Digital Time Capsules</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Create and discover digital time capsules with notes, images, and scientific observations.
              </p>
            </div>
          </div>
        </section>

        <section className="flex justify-center">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/explore" className="flex items-center gap-2">
              Start Exploring
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
