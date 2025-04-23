"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"

interface MapMarker {
  position: [number, number]
  title: string
  popup: string
}

interface MapComponentProps {
  center: [number, number]
  markers?: MapMarker[]
}

// Custom component to handle map center changes
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

export default function MapComponent({ center, markers = [] }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    // Fix the 'icon not found' issue with Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })

    // Set map ready after component mounts
    setMapReady(true)
  }, [])

  // Handle theme changes for the map
  useEffect(() => {
    const handleThemeChange = () => {
      if (mapRef.current) {
        // Force a resize to redraw the map when theme changes
        mapRef.current.invalidateSize()
      }
    }

    // Listen for theme changes
    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("themeChange", handleThemeChange)
    }
  }, [mapRef.current])

  return (
    <div className="w-full h-[400px] rounded-md overflow-hidden">
      {mapReady && (
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => {
            mapRef.current = map
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position}>
              <Popup dangerouslySetInnerHTML={{ __html: marker.popup }} />
            </Marker>
          ))}

          <ChangeMapView center={center} />
        </MapContainer>
      )}
    </div>
  )
}
