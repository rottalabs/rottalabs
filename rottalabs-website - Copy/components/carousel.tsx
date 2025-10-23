"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  children: React.ReactNode[]
  autoRotate?: boolean
  autoRotateInterval?: number
  className?: string
}

export default function Carousel({
  children,
  autoRotate = true,
  autoRotateInterval = 4000,
  className = "",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(children.length) // Start from first duplicated set
  const [itemsPerView, setItemsPerView] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Calculate items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  const nextSlide = () => {
    if (!isTransitioning) return
    setCurrentIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (!isTransitioning) return
    setCurrentIndex((prev) => prev - 1)
  }

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex >= children.length * 2) {
        setIsTransitioning(false)
        setCurrentIndex(children.length)
        setTimeout(() => setIsTransitioning(true), 50)
      } else if (currentIndex <= 0) {
        setIsTransitioning(false)
        setCurrentIndex(children.length)
        setTimeout(() => setIsTransitioning(true), 50)
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener("transitionend", handleTransitionEnd)
      return () => carousel.removeEventListener("transitionend", handleTransitionEnd)
    }
  }, [currentIndex, children.length])

  // Auto-rotation effect
  useEffect(() => {
    if (autoRotate && children.length > itemsPerView) {
      intervalRef.current = setInterval(nextSlide, autoRotateInterval)
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [autoRotate, autoRotateInterval, children.length, itemsPerView])

  // Pause auto-rotation on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (autoRotate && children.length > itemsPerView) {
      intervalRef.current = setInterval(nextSlide, autoRotateInterval)
    }
  }

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  if (children.length === 0) return null

  const extendedChildren = [...children, ...children, ...children]

  return (
    <div 
      className={`carousel-container ${className}`} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={carouselRef}
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          transition: isTransitioning ? "transform 0.3s ease-in-out" : "none",
        }}
      >
        {extendedChildren.map((child, index) => (
          <div key={index} className="carousel-item px-2">
            {child}
          </div>
        ))}
      </div>

      {children.length > itemsPerView && (
        <>
          <button onClick={prevSlide} className="carousel-arrow left" aria-label="Previous slide">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={nextSlide} className="carousel-arrow right" aria-label="Next slide">
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  )
}
