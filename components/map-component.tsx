"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

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

// Create a placeholder component to show while the map is loading
function MapPlaceholder() {
  return (
    <div className="w-full h-[400px] rounded-md overflow-hidden bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
        <p>Loading map...</p>
      </div>
    </div>
  )
}

export default function MapComponent(props: MapComponentProps) {
  const [isClient, setIsClient] = useState(false)

  // Dynamically import the map with ssr: false
  const DynamicMap = dynamic(() => import("./dynamic-map"), {
    ssr: false,
    loading: MapPlaceholder,
  })

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Return placeholder if not on client yet
  if (!isClient) {
    return <MapPlaceholder />
  }

  // Return the dynamic map component once mounted
  return <DynamicMap {...props} />
}
