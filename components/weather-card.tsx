import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react"

interface WeatherCardProps {
  weatherData: any
  isLoading: boolean
}

// Weather code mapping to icons
const getWeatherIcon = (code: number) => {
  // WMO Weather interpretation codes (WW)
  // https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
  if (code === 0) return <Sun className="h-6 w-6 text-yellow-500" />
  if (code >= 1 && code <= 3) return <Cloud className="h-6 w-6 text-gray-400" />
  if (code >= 45 && code <= 49) return <CloudFog className="h-6 w-6 text-gray-400" />
  if ((code >= 51 && code <= 59) || (code >= 80 && code <= 82))
    return <CloudDrizzle className="h-6 w-6 text-blue-400" />
  if ((code >= 61 && code <= 69) || (code >= 83 && code <= 84)) return <CloudRain className="h-6 w-6 text-blue-500" />
  if (code >= 71 && code <= 79) return <CloudSnow className="h-6 w-6 text-blue-200" />
  if (code >= 85 && code <= 86) return <CloudSnow className="h-6 w-6 text-blue-200" />
  if (code >= 95 && code <= 99) return <CloudLightning className="h-6 w-6 text-yellow-400" />
  return <Cloud className="h-6 w-6 text-gray-400" />
}

// Weather code to description
const getWeatherDescription = (code: number) => {
  if (code === 0) return "Clear sky"
  if (code === 1) return "Mainly clear"
  if (code === 2) return "Partly cloudy"
  if (code === 3) return "Overcast"
  if (code >= 45 && code <= 49) return "Fog"
  if (code >= 51 && code <= 55) return "Drizzle"
  if (code >= 56 && code <= 59) return "Freezing Drizzle"
  if (code >= 61 && code <= 65) return "Rain"
  if (code >= 66 && code <= 69) return "Freezing Rain"
  if (code >= 71 && code <= 75) return "Snow fall"
  if (code >= 76 && code <= 79) return "Snow grains"
  if (code >= 80 && code <= 84) return "Rain showers"
  if (code >= 85 && code <= 86) return "Snow showers"
  if (code >= 95 && code <= 99) return "Thunderstorm"
  return "Unknown"
}

export default function WeatherCard({ weatherData, isLoading }: WeatherCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) return null

  const current = weatherData.current
  const daily = weatherData.daily
  const hourly = weatherData.hourly

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-emerald-600" />
          Local Weather
        </CardTitle>
        <CardDescription>Current conditions at your selected location</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getWeatherIcon(current.weather_code)}
            <span className="text-lg font-medium">{getWeatherDescription(current.weather_code)}</span>
          </div>
          <div className="text-2xl font-bold">
            {current.temperature_2m}°{weatherData.current_units.temperature_2m}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Thermometer className="h-4 w-4 text-orange-500" />
            Feels like: {current.apparent_temperature}°{weatherData.current_units.apparent_temperature}
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-4 w-4 text-blue-500" />
            Wind: {current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="h-4 w-4 text-blue-500" />
            Humidity: {current.relative_humidity_2m}
            {weatherData.current_units.relative_humidity_2m}
          </div>
          <div className="flex items-center gap-1">
            <CloudRain className="h-4 w-4 text-blue-500" />
            Precipitation: {current.precipitation} {weatherData.current_units.precipitation}
          </div>
        </div>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
            <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-2 pt-2">
            <div className="grid grid-cols-3 gap-2">
              {daily.time.slice(0, 3).map((time: string, index: number) => (
                <div key={time} className="flex flex-col items-center p-2 rounded-md bg-muted">
                  <div className="text-xs font-medium">
                    {new Date(time).toLocaleDateString(undefined, { weekday: "short" })}
                  </div>
                  <div className="my-1">{getWeatherIcon(daily.weather_code[index])}</div>
                  <div className="text-xs flex gap-1">
                    <span className="font-medium">{Math.round(daily.temperature_2m_max[index])}°</span>
                    <span className="text-muted-foreground">{Math.round(daily.temperature_2m_min[index])}°</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="hourly" className="pt-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {hourly.time.slice(0, 12).map((time: string, index: number) => (
                <div key={time} className="flex flex-col items-center p-2 rounded-md bg-muted min-w-[60px]">
                  <div className="text-xs font-medium">{new Date(time).getHours()}:00</div>
                  <div className="my-1">{getWeatherIcon(hourly.weather_code[index])}</div>
                  <div className="text-xs font-medium">{Math.round(hourly.temperature_2m[index])}°</div>
                  <div className="text-xs text-muted-foreground">{hourly.precipitation_probability[index]}%</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
