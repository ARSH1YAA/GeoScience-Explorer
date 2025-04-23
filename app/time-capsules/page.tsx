"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Compass, Globe, Info, MapPin, TimerIcon, Upload, Search } from "lucide-react"
import MapComponent from "@/components/map-component"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

interface TimeCapsule {
  id: string
  timestamp: string
  lat: number
  lon: number
  note: string
  image?: string
}

export default function TimeCapsulePage() {
  const [location, setLocation] = useState<{ lat: number; lon: number }>({ lat: 28.6139, lon: 77.209 })
  const [customLat, setCustomLat] = useState<string>("28.6139")
  const [customLon, setCustomLon] = useState<string>("77.2090")
  const [citySearch, setCitySearch] = useState<string>("")
  const [isLoadingCity, setIsLoadingCity] = useState<boolean>(false)
  const [note, setNote] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsule[]>([])
  const [selectedCapsule, setSelectedCapsule] = useState<TimeCapsule | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitTimeCapsule = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!note.trim()) {
      setError("Please enter a message for your time capsule")
      return
    }

    // In a real app, we would upload the image and save the data to a database
    // For this demo, we'll just add it to our local state

    const newTimeCapsule: TimeCapsule = {
      id: Math.random().toString(36).substring(2, 15),
      timestamp: new Date().toISOString(),
      lat: location.lat,
      lon: location.lon,
      note: note,
      image: imagePreview || undefined,
    }

    setTimeCapsules([...timeCapsules, newTimeCapsule])
    setSuccess("Your time capsule has been created successfully!")

    // Reset form
    setNote("")
    setImage(null)
    setImagePreview(null)
  }

  const openTimeCapsule = (capsule: TimeCapsule) => {
    setSelectedCapsule(capsule)
    setIsDialogOpen(true)
  }

  return (
    <div className="container py-8 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TimerIcon className="h-8 w-8 text-emerald-600" />
          Digital Time Capsules
        </h1>
        <ThemeToggle />
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Time Capsule</TabsTrigger>
          <TabsTrigger value="view">View Time Capsules</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    Set Location
                  </CardTitle>
                  <CardDescription>Choose where to place your digital time capsule</CardDescription>
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

                  {success && (
                    <Alert className="bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800">
                      <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>{success}</AlertDescription>
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
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create Your Time Capsule</CardTitle>
                  <CardDescription>Leave a message and optional image for future explorers to discover</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitTimeCapsule} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="note">Your Message</Label>
                      <Textarea
                        id="note"
                        placeholder="Share your thoughts, observations, or scientific discoveries..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Attach an Image (Optional)</Label>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                            </div>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>

                        {imagePreview && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                              src={imagePreview || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setImage(null)
                                setImagePreview(null)
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Create Time Capsule
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="view" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              {isClient && (
                <MapComponent
                  center={[location.lat, location.lon]}
                  markers={timeCapsules.map((capsule) => ({
                    position: [capsule.lat, capsule.lon],
                    title: `Time Capsule: ${new Date(capsule.timestamp).toLocaleDateString()}`,
                    popup: `<strong>Time Capsule</strong><br/>Created: ${new Date(capsule.timestamp).toLocaleString()}`,
                  }))}
                />
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Time Capsules</h2>

            {timeCapsules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeCapsules.map((capsule) => (
                  <Card key={capsule.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Time Capsule</CardTitle>
                      <CardDescription>Created on {new Date(capsule.timestamp).toLocaleString()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        Lat: {capsule.lat.toFixed(6)}, Lon: {capsule.lon.toFixed(6)}
                      </div>

                      <p className="text-sm line-clamp-2">{capsule.note}</p>

                      {capsule.image && (
                        <div className="relative w-full h-32 rounded-lg overflow-hidden">
                          <Image
                            src={capsule.image || "/placeholder.svg"}
                            alt="Time Capsule Image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => openTimeCapsule(capsule)}>
                        Open Time Capsule
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">
                    No time capsules found. Create your first time capsule to see it here.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Time Capsule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Time Capsule</DialogTitle>
            <DialogDescription>
              Created on {selectedCapsule ? new Date(selectedCapsule.timestamp).toLocaleString() : ""}
            </DialogDescription>
          </DialogHeader>

          {selectedCapsule && (
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Location: Lat: {selectedCapsule.lat.toFixed(6)}, Lon: {selectedCapsule.lon.toFixed(6)}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Message:</h3>
                <div className="p-3 bg-muted rounded-md">
                  <p>{selectedCapsule.note}</p>
                </div>
              </div>

              {selectedCapsule.image && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Image:</h3>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={selectedCapsule.image || "/placeholder.svg"}
                      alt="Time Capsule Image"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <Button className="w-full mt-4" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
