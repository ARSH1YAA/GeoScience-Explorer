"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"

// Define the props interfaces
interface MapMarker {
  position: [number, number]
  title: string
  popup: string
}

interface MapComponentProps {
  center: [number, number]
  markers?: MapMarker[]
}

export default function DynamicMap({ center, markers = [] }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  // Initialize the map
  useEffect(() => {
    // Import Leaflet CSS
    import("leaflet/dist/leaflet.css")

    // Only create the map if it doesn't exist yet and the ref is available
    if (!mapInstance && mapRef.current) {
      // Fix the 'icon not found' issue with Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      })

      // Create the map
      const map = L.map(mapRef.current).setView(center, 13)

      // Add the tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Store the map instance
      setMapInstance(map)
    }

    // Cleanup function
    return () => {
      if (mapInstance) {
        mapInstance.remove()
        setMapInstance(null)
      }
    }
  }, [mapInstance, center])

  // Update the map center when it changes
  useEffect(() => {
    if (mapInstance) {
      mapInstance.setView(center, mapInstance.getZoom())
    }
  }, [mapInstance, center])

  // Add markers to the map
  useEffect(() => {
    if (mapInstance) {
      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Add new markers
      markers.forEach((marker) => {
        const newMarker = L.marker(marker.position).addTo(mapInstance).bindPopup(marker.popup)

        markersRef.current.push(newMarker)
      })
    }
  }, [mapInstance, markers])

  return <div ref={mapRef} className="w-full h-[400px] rounded-md overflow-hidden"></div>
}
