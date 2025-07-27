"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { Github, Linkedin, ChevronDown, X } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(() => import("./components/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-gray-600">Loading PDF viewer...</div>
    </div>
  ),
})

const photos = ["/11.jpeg", "/22.jpeg", "/33.jpeg"]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [showPDF, setShowPDF] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (hovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [hovering])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Hero Section */}
      <div className="container mx-auto px-12 py-16 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 ml-8 lg:ml-16">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">Hi, I am Aditya</h1>
              <div className="space-y-2 text-xl lg:text-2xl text-gray-300">
                <p>A Full-Stack Developer</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6">
              <a
                href="https://github.com/adii2ma"
                className="text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={28} />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-singh-750717310/"
                className="text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
              
            </div>

            {/* Button */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowPDF(true)}
                className="px-8 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 font-medium"
              >
                View Resume
              </button>
            </div>
          </div>

          {/* Right Image - moved slightly left */}
          <div className="flex justify-center lg:justify-start lg:ml-8">
            <div
              className="relative w-80 h-96 lg:w-96 lg:h-[500px]"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photos[currentIndex] || "/placeholder.svg"}
                  alt="Aditya Singh"
                  fill
                  className="object-cover transition-all duration-500"
                  style={{
                    maskImage: "radial-gradient(ellipse 70% 80% at center, black 40%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 80% at center, black 40%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black opacity-30"
                  style={{
                    maskImage: "radial-gradient(ellipse 70% 80% at center, transparent 50%, black 80%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 80% at center, transparent 50%, black 80%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white opacity-70" />
        </div>
      </div>

      {/* About Me Section */}
      <div className="container mx-auto px-12 py-16 flex">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 font-serif">About Me</h2>
          <div className="font-serif text-lg max-w-none w-full text-[clamp(16px,2.5vw,24px)] text-gray-300 leading-relaxed">
            <p className="whitespace-pre-line">
              Hi, I&apos;m Aditya Singh, a passionate Computer Science undergrad at VIT Vellore, specializing in Information Security. I&apos;m someone who genuinely enjoys building things — whether it&apos;s a scalable SaaS platform, a horror game with friends, or a CLI tool just because it&apos;s fun.
              
              Over the years, I&apos;ve had the opportunity to wear many hats: developer, team lead, maintainer, and event coordinator. I&apos;ve worked with technologies ranging from Godot and Golang to React Native and Redis, and I love diving deep into both creative and technical challenges. I thrive in collaborative environments — whether that&apos;s coordinating a festival, maintaining open-source projects, or mentoring juniors through ACM-VIT.
              
              What drives me is curiosity and the joy of solving real-world problems, especially in cybersecurity, distributed systems, and full-stack development. I also believe in giving back — through hosting events, guiding juniors, or just being there for my team.
              
              I like basketball too :)
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-12 text-center">
          <p className="text-gray-400">
            <a
              href="mailto:adityasingh789m@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              adityasingh789m@gmail.com   
            </a>
          </p>
          <p>
            my number 8920354418
          </p>

        </div>
      </footer>

      {/* PDF Modal */}
      {showPDF && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setShowPDF(false)}
              className="absolute top-4 right-4 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              <X size={20} />
            </button>
            <PDFViewer />
          </div>
        </div>
      )}
    </div>
  )
}
