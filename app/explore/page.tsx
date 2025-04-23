"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Compass, ExternalLink, Globe, Info, MapPin, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MapComponent from "@/components/map-component"
import WeatherCard from "@/components/weather-card"
import { ThemeToggle } from "@/components/theme-toggle"

interface LocationData {
  lat: number
  lon: number
}

interface ScienceLocation {
  title: string
  lat: number
  lon: number
  summary: string
  image?: string
  url: string
  distance: number
  wikidata_info?: string
}

export default function ExplorePage() {
  const [location, setLocation] = useState<LocationData>({ lat: 28.6139, lon: 77.209 })
  const [customLat, setCustomLat] = useState<string>("28.6139")
  const [customLon, setCustomLon] = useState<string>("77.2090")
  const [citySearch, setCitySearch] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [scienceLocations, setScienceLocations] = useState<ScienceLocation[]>([])
  const [weatherData, setWeatherData] = useState<any>(null)
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const getCurrentLocation = () => {
    setError(null)
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          setLocation(newLocation)
          setCustomLat(newLocation.lat.toString())
          setCustomLon(newLocation.lon.toString())
          setIsLoading(false)
        },
        (err) => {
          console.error("Geolocation error:", err)
          let errorMessage = "Unable to retrieve your location. "

          if (err.code === 1) {
            errorMessage += "Location permission was denied. Please enable location services in your browser settings."
          } else if (err.code === 2) {
            errorMessage += "Location information is unavailable."
          } else if (err.code === 3) {
            errorMessage += "The request to get user location timed out."
          }

          setError(errorMessage)
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    } else {
      setError("Geolocation is not supported by your browser. Please enter coordinates or search by city name.")
    }
  }

  const handleCustomLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lat = Number.parseFloat(customLat)
    const lon = Number.parseFloat(customLon)

    if (isNaN(lat) || isNaN(lon)) {
      setError("Please enter valid coordinates")
      return
    }

    if (lat < -90 || lat > 90) {
      setError("Latitude must be between -90 and 90")
      return
    }

    if (lon < -180 || lon > 180) {
      setError("Longitude must be between -180 and 180")
      return
    }

    setLocation({ lat, lon })
    setError(null)
  }

  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!citySearch.trim()) {
      setError("Please enter a city name")
      return
    }

    setIsLoadingCity(true)
    setError(null)

    try {
      // Use OpenStreetMap Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(citySearch)}&limit=1`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch location data")
      }

      const data = await response.json()

      if (data.length === 0) {
        setError(`No location found for "${citySearch}". Please try a different search term.`)
      } else {
        const result = data[0]
        const newLocation = {
          lat: Number.parseFloat(result.lat),
          lon: Number.parseFloat(result.lon),
        }

        setLocation(newLocation)
        setCustomLat(newLocation.lat.toString())
        setCustomLon(newLocation.lon.toString())
      }
    } catch (error) {
      console.error("Error searching for city:", error)
      setError("An error occurred while searching for the city. Please try again.")
    } finally {
      setIsLoadingCity(false)
    }
  }

  const fetchScienceLocations = async () => {
    setIsLoading(true)
    setScienceLocations([])
    setError(null)

    try {
      // First, fetch nearby locations from Wikipedia GeoSearch API
      const geoSearchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${location.lat}|${location.lon}&gsradius=5000&gslimit=20&format=json&origin=*`
      const geoResponse = await fetch(geoSearchUrl)
      const geoData = await geoResponse.json()

      const pages = geoData.query?.geosearch || []

      if (pages.length === 0) {
        setError("No locations found nearby. Try a different location.")
        setIsLoading(false)
        return
      }

      // Science-related keywords to filter results
      const scienceKeywords = [
        "science",
        "physics",
        "chemistry",
        "biology",
        "research",
        "discovery",
        "experiment",
        "scientist",
        "invention",
        "lab",
        "laboratory",
        "technology",
        "observatory",
        "genetics",
        "astronomy",
        "geology",
        "medicine",
        "math",
      ]

      // Process each location to get more details
      const locationPromises = pages.map(async (page: any) => {
        const title = page.title
        const pageLat = page.lat
        const pageLon = page.lon

        // Calculate distance (simplified version)
        const distance = calculateDistance(location.lat, location.lon, pageLat, pageLon)

        // Get article summary
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
        const summaryResponse = await fetch(summaryUrl)
        const summaryData = await summaryResponse.json()
        const summaryText = summaryData.extract?.toLowerCase() || ""

        // Check if the location is science-related
        const isScienceRelated = scienceKeywords.some((keyword) => summaryText.includes(keyword))

        if (isScienceRelated) {
          // Try to get Wikidata info
          const wikidataUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageprops&format=json&origin=*`
          const wikidataResponse = await fetch(wikidataUrl)
          const wikidataData = await wikidataResponse.json()

          const pages = wikidataData.query?.pages || {}
          const pageId = Object.keys(pages)[0]
          const entityId = pages[pageId]?.pageprops?.wikibase_item

          let wikidataInfo = ""

          if (entityId) {
            try {
              const entityUrl = `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`
              const entityResponse = await fetch(entityUrl)
              const entityData = await entityResponse.json()

              const claims = entityData.entities[entityId]?.claims || {}
              const inception = claims.P571?.[0]

              if (inception?.mainsnak?.datavalue?.value?.time) {
                const timestamp = inception.mainsnak.datavalue.value.time
                wikidataInfo = `🕰️ Date of inception: ${timestamp.substring(1, 11)}`
              }
            } catch (error) {
              console.error("Error fetching Wikidata:", error)
            }
          }

          return {
            title,
            lat: pageLat,
            lon: pageLon,
            summary: summaryData.extract,
            image: summaryData.thumbnail?.source,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
            distance: distance,
            wikidata_info: wikidataInfo,
          }
        }

        return null
      })

      const results = await Promise.all(locationPromises)
      const scienceResults = results.filter((result) => result !== null) as ScienceLocation[]

      if (scienceResults.length === 0) {
        setError("Found nearby places, but none related to science. Try a different location.")
      } else {
        setScienceLocations(scienceResults.sort((a, b) => a.distance - b.distance))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("An error occurred while fetching data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchWeatherData = async () => {
    setIsLoadingWeather(true)
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`,
      )
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error("Error fetching weather data:", error)
    } finally {
      setIsLoadingWeather(false)
    }
  }

  // Calculate distance between two coordinates in kilometers (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return Number.parseFloat((R * c).toFixed(2))
  }

  useEffect(() => {
    if (isClient && location.lat && location.lon) {
      fetchWeatherData()
    }
  }, [location, isClient])

  return (
    <div className="container py-8 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Globe className="h-8 w-8 text-emerald-600" />
          Explore Scientific Locations
        </h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                Location Settings
              </CardTitle>
              <CardDescription>Set your location to discover nearby scientific points of interest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button
                  onClick={getCurrentLocation}
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  disabled={isLoading || !isClient}
                >
                  <Compass className="h-4 w-4" />
                  {isLoading ? "Getting location..." : "Use My Current Location"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or search by city</span>
                  </div>
                </div>

                <form onSubmit={handleCitySearch} className="space-y-3">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Enter city name..."
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                      />
                    </div>
                    <Button type="submit" disabled={isLoadingCity}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or enter coordinates</span>
                  </div>
                </div>

                <form onSubmit={handleCustomLocationSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="latitude" className="text-sm font-medium">
                        Latitude
                      </label>
                      <Input
                        id="latitude"
                        type="text"
                        value={customLat}
                        onChange={(e) => setCustomLat(e.target.value)}
                        placeholder="e.g. 28.6139"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="longitude" className="text-sm font-medium">
                        Longitude
                      </label>
                      <Input
                        id="longitude"
                        type="text"
                        value={customLon}
                        onChange={(e) => setCustomLon(e.target.value)}
                        placeholder="e.g. 77.2090"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Set Location
                  </Button>
                </form>
              </div>

              {error && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="pt-2">
                <div className="text-sm font-medium mb-1">Current Coordinates:</div>
                <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span className="text-sm">Lat: {location.lat.toFixed(6)}</span>
                  <span className="text-sm">Lon: {location.lon.toFixed(6)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={fetchScienceLocations}
                className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
                disabled={isLoading}
              >
                <Search className="h-4 w-4" />
                {isLoading ? "Searching..." : "Find Scientific Locations"}
              </Button>
            </CardFooter>
          </Card>

          {weatherData && <WeatherCard weatherData={weatherData} isLoading={isLoadingWeather} />}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {isClient && (
                <MapComponent
                  center={[location.lat, location.lon]}
                  markers={scienceLocations.map((loc) => ({
                    position: [loc.lat, loc.lon],
                    title: loc.title,
                    popup: `<strong>${loc.title}</strong><br/>${loc.distance} km away`,
                  }))}
                />
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Scientific Locations</h2>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        <Skeleton className="h-24 w-24 rounded-md" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : scienceLocations.length > 0 ? (
              <div className="space-y-4">
                {scienceLocations.map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{location.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {location.distance} km away
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-900/20">
                          Science
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4">
                        {location.image && (
                          <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
                            <div className="relative w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                src={location.image || "/placeholder.svg"}
                                alt={location.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          {location.wikidata_info && (
                            <div className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                              {location.wikidata_info}
                            </div>
                          )}
                          <p className="text-sm line-clamp-4">{location.summary}</p>
                          <Button asChild variant="outline" size="sm" className="mt-2">
                            <Link
                              href={location.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Read more on Wikipedia
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">
                    No scientific locations found yet. Use the search button to discover nearby points of interest.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
