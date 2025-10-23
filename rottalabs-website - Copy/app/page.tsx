import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Carousel from "@/components/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Smart Office Interior Design",
    description: "A modern office concept created in SketchUp, featuring ergonomic layouts, functional lighting, and photorealistic rendering. The project demonstrates how technical precision and aesthetics merge seamlessly.",
    image: "/Smart office.jpg",
  },
  {
    id: 2,
    title: "Mechanical Prototype Documentation",
    description: "Complete technical and technological documentation prepared for a client's product prototype. Includes CAD models, schematics, and process guidelines ready for manufacturing.",
    image: "/Mechanical documentation.jpg",
  },
  {
    id: 3,
    title: "3D Visualization Pack - Sustainable Home Concept",
    description: "A demo project showcasing an eco-friendly house design. Includes 3D models, multiple render views, and case study presentation, highlighting sustainable engineering and modern architecture.",
    image: "/3d visualization pack.jpg",
  },
  {
    id: 4,
    title: "Engineering Workflow Templates",
    description: "Developed ready-to-use calculation sheets and checklists for project documentation. This project helped streamline the client's workflow and reduced reporting time by 40%.",
    image: "/Templates.jpg",
  },
  {
    id: 5,
    title: "Student Mentorship Project",
    description: "Guided a student through a one-on-one mentorship program on 3D modeling and technical documentation. The project resulted in a fully developed prototype design and increased skill proficiency.",
    image: "/Student mentorship.jpg",
  },
]

const products = [
  {
    id: 1,
    title: "Engineering Edge - E-Book Series",
    description: "A collection of powerful, easy-to-read e-books packed with engineering insights, design strategies, and problem-solving techniques. Each guide is designed to help students, professionals, and innovators quickly gain practical knowledge they can apply immediately.",
    price: "$49",
    image: "/ebook series.jpg",
  },
  {
    id: 2,
    title: "ProModel Vault - Ready-to-Use CAD & 3D Models",
    description: "A curated library of SketchUp, CAD, and 3D models built with professional precision. From architectural components to engineering parts, each model is accurate, scalable, and production-ready, helping you save hours of work.",
    price: "$79",
    image: "/3d cad models.jpg",
  },
  {
    id: 3,
    title: "SmartSheets - Engineering Templates & Worksheets",
    description: "Professionally designed calculation sheets, project planners, checklists, and documentation templates that simplify your workflow. Perfect for engineers, students, and startups who need ready-made tools to save time and reduce errors.",
    price: "$99",
    image: "/Templates worksheets.jpg",
  },
  {
    id: 4,
    title: "RapidSkills - Mini-Courses & Tutorials",
    description: "Bite-sized digital courses focused on engineering design, 3D modeling, SketchUp, rendering, and technical documentation. Each course is clear, practical, and hands-on, giving you real skills in just hours, not weeks.",
    price: "$59",
    image: "/Tutorials.jpg",
  },
  {
    id: 5,
    title: "VisualLab - Infographics & Technical Packs",
    description: "Stunning sets of infographics, diagrams, and technical visuals made for reports, presentations, and digital content. Turn complex engineering and design concepts into clear, modern, and engaging visuals that stand out.",
    price: "$89",
    image: "/Infographics packs.jpg",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen will-change-scroll">
      <Navigation />

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(/bg.jpg)' }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center fade-in">
            <div className="flex justify-center mb-8">
              <Image src="/logo.webp" alt="Rottalabs Logo" width={120} height={120} className="w-25 h-25 border-2 border-black rounded-full" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">ROTTALABS</h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">ENGINEERING & DESIGN</p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              We create a world where the convergence of creativity, innovation, and problem-solving drives the future
              of digital products and experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-linear-to-br from-white from-15% to-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">SERVICES</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer everything from design to engineering, technical solutions tailored to your needs. We are here to
              bring your ideas to life through our expertise.
            </p>
          </div>

          <div className="mb-12">
            <Carousel autoRotate={true} autoRotateInterval={5000}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow mx-2 flex flex-col h-full">
                <div className="aspect-[4/3] bg-accent flex items-center justify-center overflow-hidden relative">
                  <img src="/Visionary spaces.jpg" alt="Visionary Spaces" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Visionary Spaces</h3>
                  <p className="text-muted-foreground flex-grow">Interior & Exterior Engineering Design with 3D modeling, photorealistic rendering, and engineering integration</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow mx-2 flex flex-col h-full">
                <div className="aspect-[4/3] bg-accent flex items-center justify-center overflow-hidden relative">
                  <img src="/Precision engineering.jpg" alt="Precision Engineering" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Precision Engineering</h3>
                  <p className="text-muted-foreground flex-grow">Custom mechanical, electrical, and structural designs with full technical documentation</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow mx-2 flex flex-col h-full">
                <div className="aspect-[4/3] bg-accent flex items-center justify-center overflow-hidden relative">
                  <img src="/Innovation navigator.jpg" alt="Innovation Navigator" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Innovation Navigator</h3>
                  <p className="text-muted-foreground flex-grow">Consulting for companies & startups with feasibility studies and prototyping advice</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow mx-2 flex flex-col h-full">
                <div className="aspect-[4/3] bg-accent flex items-center justify-center overflow-hidden relative">
                  <img src="/Blueprint to reality.jpg" alt="Blueprint to Reality" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Blueprint to Reality</h3>
                  <p className="text-muted-foreground flex-grow">Full technical & technological documentation including CAD models, drawings, schematics, and process guidelines</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-lg transition-shadow mx-2 flex flex-col h-full">
                <div className="aspect-[4/3] bg-accent flex items-center justify-center overflow-hidden relative">
                  <img src="/Mentorship.jpg" alt="Mentorship" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">Masterclass Mentorship</h3>
                  <p className="text-muted-foreground flex-grow">One-on-one engineering & design guidance with personalized sessions and hands-on coaching</p>
                </CardContent>
              </Card>
            </Carousel>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Preview with Carousel */}
      <section className="py-16 bg-linear-to-br from-gray-500 to-90% to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">PROJECTS</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest projects, and see how we showcase creativity, innovation, and problem-solving through
              our diverse portfolio of completed projects.
            </p>
          </div>

          <div className="mb-12">
            <Carousel autoRotate={true} autoRotateInterval={5000} className="will-change-transform">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 mx-2 flex flex-col h-full">
                  <div className="aspect-[4/3] bg-accent flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/projects">See All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Preview with Carousel */}
      <section className="py-16 bg-linear-to-br from-white from-10% to-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">PRODUCTS</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our premium e-books, CAD models, engineering templates, mini-courses, and visual resources designed for engineers, designers, and creative professionals.
            </p>
          </div>

          <div className="mb-12">
            <Carousel autoRotate={true} autoRotateInterval={6000} className="will-change-transform">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 mx-2 overflow-hidden flex flex-col h-full">
                  <div className="h-48 bg-accent flex items-center justify-center p-4 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={300}
                      height={192}
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm flex-grow">{product.description}</p>
                    {/* <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{product.price}</span>
                      <Button variant="outline" size="sm">
                        Buy Now
                      </Button>
                    </div> */}
                  </CardContent>
                </Card>
              ))}
            </Carousel>
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
