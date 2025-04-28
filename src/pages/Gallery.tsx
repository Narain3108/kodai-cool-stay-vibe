// Gallery.tsx

import { useState, useEffect } from "react"
import { Maximize2, X } from "lucide-react"
import Footer from "@/components/Footer"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// Type for image dimensions
interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

// Type for gallery image
interface GalleryImage {
  id: number
  src: string
  alt: string
  dimensions?: ImageDimensions
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      src: "family.jpeg",
      alt: "Hotel Room Interior",
    },
    {
      id: 2,
      src: "suite.jpeg",
      alt: "Hotel View",
    },
    {
      id: 3,
      src: "background.jpeg",
      alt: "Hotel Lobby",
    },
    {
      id: 4,
      src: "suiter.jpeg",
      alt: "Hotel Room",
    },
    {
      id: 5,
      src: "about.jpeg",
      alt: "Hotel Exterior",
    },
    {
      id: 6,
      src: "fa1.jpeg",
      alt: "Hotel Exterior",
    },
    {
      id: 7,
      src: "se.jpeg",
      alt: "Hotel Exterior",
    },
    {
      id: 8,
      src: "sen.jpeg",
      alt: "Hotel Exterior",
    },
    {
      id: 9,
      src: "interi.jpeg",
      alt: "Hotel Exterior",
    },
    {
      id: 10,
      src: "1.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 11,
      src: "2.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 12,
      src: "3.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 13,
      src: "4.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 14,
      src: "5.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 15,
      src: "6.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 16,
      src: "7.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 17,
      src: "8.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 18,
      src: "9.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 19,
      src: "10.jpeg",
      alt: "Dummy Alt Text",
    },
    {
      id: 20,
      src: "11.jpeg",
      alt: "Dummy Alt Text",
    },
  
    {
      id: 21,
      src: "13.jpeg",
      alt: "Dummy Alt Text",
    },
  ]);
  
  // Preload images and get their dimensions
  useEffect(() => {
    const loadImageDimensions = async () => {
      const updatedImages = await Promise.all(
        images.map(async (image) => {
          return new Promise<GalleryImage>((resolve) => {
            const img = new window.Image()
            img.crossOrigin = "anonymous"
            img.onload = () => {
              const width = img.width
              const height = img.height
              const aspectRatio = width / height
              resolve({
                ...image,
                dimensions: { width, height, aspectRatio },
              })
            }
            img.onerror = () => {
              resolve({
                ...image,
                dimensions: { width: 1, height: 1, aspectRatio: 1 },
              })
            }
            img.src = image.src
          })
        })
      )
      setImages(updatedImages)
    }

    loadImageDimensions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Function to determine grid span based on aspect ratio
  const getGridSpan = (aspectRatio: number) => {
    if (aspectRatio > 1.7) return "col-span-2" // Very wide images
    if (aspectRatio > 1.3) return "col-span-1" // Standard landscape
    if (aspectRatio < 0.7) return "row-span-2" // Very tall images
    return "" // Default square-ish
  }

  return (
    <div className="min-h-screen bg-hotel-light">

      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-hotel-teal mb-4">Our Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautiful spaces and experiences through our carefully curated collection of images.
          </p>
        </div>

        {/* Adaptive Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4">
          {images.map((image) => (
            <Card
              key={image.id}
              className={`group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in ${
                image.dimensions ? getGridSpan(image.dimensions.aspectRatio) : ""
              }`}
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white w-8 h-8" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <ScrollArea className="h-[90vh] w-[90vw]">
              <div className="relative max-w-[90vw] max-h-[90vh] mx-auto">
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-w-full max-h-[90vh] object-contain animate-scale-in mx-auto"
                  crossOrigin="anonymous"
                />
              </div>
            </ScrollArea>
            <button
              className="absolute top-4 right-4 text-white text-xl p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Gallery
