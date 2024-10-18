'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

type ColorSpace = 'rgb' | 'hsl' | 'hsv'

export default function ColorPicker() {
  const [colorSpace, setColorSpace] = useState<ColorSpace>('rgb')
  const [color, setColor] = useState({ r: 128, g: 128, b: 128, h: 0, s: 0, l: 50, v: 50 })
  const [hexColor, setHexColor] = useState('#808080')

  useEffect(() => {
    const updateHexColor = () => {
      let hex: string
      if (colorSpace === 'rgb') {
        hex = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
      } else {
        const rgb = colorSpace === 'hsl' ? hslToRgb(color.h, color.s, color.l) : hsvToRgb(color.h, color.s, color.v)
        hex = `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`
      }
      setHexColor(hex)
    }

    updateHexColor()
  }, [color, colorSpace])

  const handleColorChange = (colorKey: string) => (value: number) => {
    setColor(prevColor => ({ ...prevColor, [colorKey]: value }))
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setHexColor(hex)
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      setColor(prevColor => ({ ...prevColor, r, g, b }))
    }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    }
  }

  const hsvToRgb = (h: number, s: number, v: number) => {
    s /= 100
    v /= 100
    const f = (n: number, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
    return {
      r: Math.round(255 * f(5)),
      g: Math.round(255 * f(3)),
      b: Math.round(255 * f(1))
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Color Picker</h1>
          
          <div className="mb-6">
            <div className="w-full h-40 rounded-lg shadow-inner" style={{ backgroundColor: hexColor }}></div>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="colorSpace">Color Space</Label>
            <select
              id="colorSpace"
              value={colorSpace}
              onChange={(e) => setColorSpace(e.target.value as ColorSpace)}
              className="w-full p-2 border rounded"
            >
              <option value="rgb">RGB</option>
              <option value="hsl">HSL</option>
              <option value="hsv">HSV</option>
            </select>
          </div>

          <div className="space-y-4">
            {colorSpace === 'rgb' && (
              <>
                <div>
                  <Label>Red</Label>
                  <input
                    type="range"
                    value={color.r}
                    max={255}
                    step={1}
                    onChange={(e) => handleColorChange('r')(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Green</Label>
                  <input
                    type="range"
                    value={color.g}
                    max={255}
                    step={1}
                    onChange={(e) => handleColorChange('g')(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Blue</Label>
                  <input
                    type="range"
                    value={color.b}
                    max={255}
                    step={1}
                    onChange={(e) => handleColorChange('b')(Number(e.target.value))}
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6">
            <Label htmlFor="hexInput">HEX</Label>
            <Input
              id="hexInput"
              type="text"
              value={hexColor}
              onChange={handleHexChange}
              className="font-mono"
            />
          </div>

          <div className="mt-6 flex justify-between">
            <Link href="/">
              <Button variant="outline">Back to Welcome</Button>
            </Link>
            <Button onClick={() => navigator.clipboard.writeText(hexColor)}>
              Copy HEX
            </Button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 text-center py-4 mt-8 w-full">
        <p className="text-lg text-gray-700">Made by Taha Saif (GIAIC Student)</p>
      </footer>
    </>
  )
}
