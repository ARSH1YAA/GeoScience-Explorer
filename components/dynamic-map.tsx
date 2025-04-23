"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

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

// Custom component to handle map center changes
function ChangeMapView({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

export default function DynamicMap({ center, markers = [] }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    // Fix the 'icon not found' issue with Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  return (
    <div className="w-full h-[400px] rounded-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={(map) => {
          if (map) mapRef.current = map
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
    </div>
  )
}
