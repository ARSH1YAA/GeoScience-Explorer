"use client"
import dynamic from "next/dynamic"

interface MapMarker {
  position: [number, number]
  title: string
  popup: string
}

interface MapComponentProps {
  center: [number, number]
  markers?: MapMarker[]
}

// Dynamically import the map components with ssr: false to prevent window not defined errors
const MapWithNoSSR = dynamic(() => import("./map-with-no-ssr"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-md overflow-hidden bg-muted flex items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
})

export default function MapComponent({ center, markers = [] }: MapComponentProps) {
  return <MapWithNoSSR center={center} markers={markers} />
}
