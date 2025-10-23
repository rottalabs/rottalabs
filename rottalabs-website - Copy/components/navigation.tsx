"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo-transparent.png" alt="Rottalabs Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold" style={{ fontFamily: '"Fredoka", sans-serif' }}>ROTTALABS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-muted transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-foreground hover:text-muted transition-colors">
              Services
            </Link>
            <Link href="/projects" className="text-foreground hover:text-muted transition-colors">
              Projects
            </Link>
            <Link href="/products" className="text-foreground hover:text-muted transition-colors">
              Products
            </Link>
            {/* <Link href="/about" className="text-foreground hover:text-muted transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-muted transition-colors">
              Contact
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-foreground hover:text-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/projects"
                className="block px-3 py-2 text-foreground hover:text-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/products"
                className="block px-3 py-2 text-foreground hover:text-muted transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
