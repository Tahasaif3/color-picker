import Link from 'next/link'
import { Button } from "./components/ui/button"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Color Picker</h1>
        <p className="text-xl text-white mb-8">Explore and create beautiful color palettes</p>
        <Link href="/color-picker">
          <Button className="bg-lightblue text-blue-600 hover:bg-blue-100 transition-colors">
            Start Picking Colors
          </Button>
        </Link>
      </div>
    </div>
  )
}