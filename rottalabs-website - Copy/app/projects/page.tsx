"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Calendar, Users, MessageSquare, AlertCircle } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: 1,
    title: "Smart Office Interior Design",
    description: "A modern office concept created in SketchUp, featuring ergonomic layouts, functional lighting, and photorealistic rendering. The project demonstrates how technical precision and aesthetics merge seamlessly.",
    category: "Design",
    status: "Completed",
    year: "2024",
    technologies: ["SketchUp", "3D Modeling", "Photorealistic Rendering", "Ergonomic Design"],
    image: "/Smart office.jpg",
    client: "OfficeTech Solutions",
  },
  {
    id: 2,
    title: "Mechanical Prototype Documentation",
    description: "Complete technical and technological documentation prepared for a client's product prototype. Includes CAD models, schematics, and process guidelines ready for manufacturing.",
    category: "Engineering",
    status: "Completed",
    year: "2024",
    technologies: ["CAD", "Technical Documentation", "Schematics", "Process Guidelines"],
    image: "/Mechanical documentation.jpg",
    client: "MechTech Industries",
  },
  {
    id: 3,
    title: "3D Visualization Pack - Sustainable Home Concept",
    description: "A demo project showcasing an eco-friendly house design. Includes 3D models, multiple render views, and case study presentation, highlighting sustainable engineering and modern architecture.",
    category: "Design",
    status: "Completed",
    year: "2024",
    technologies: ["3D Modeling", "Sustainable Design", "Architecture", "Case Study"],
    image: "/3d visualization pack.jpg",
    client: "EcoHome Design",
  },
  {
    id: 4,
    title: "Engineering Workflow Templates",
    description: "Developed ready-to-use calculation sheets and checklists for project documentation. This project helped streamline the client's workflow and reduced reporting time by 40%.",
    category: "Engineering",
    status: "Completed",
    year: "2023",
    technologies: ["Workflow Optimization", "Calculation Sheets", "Checklists", "Process Improvement"],
    image: "/Templates.jpg",
    client: "ProcessFlow Corp",
  },
  {
    id: 5,
    title: "Student Mentorship Project",
    description: "Guided a student through a one-on-one mentorship program on 3D modeling and technical documentation. The project resulted in a fully developed prototype design and increased skill proficiency.",
    category: "Mentorship",
    status: "Completed",
    year: "2024",
    technologies: ["3D Modeling", "Technical Documentation", "Prototype Design", "Skill Development"],
    image: "/Student mentorship.jpg",
    client: "Engineering Academy",
  },
]

interface QuoteFormData {
  name: string
  phone: string
  email: string
  message: string
}

export default function ProjectsPage() {
  const [quoteForm, setQuoteForm] = useState<QuoteFormData>({
    name: "",
    phone: "",
    email: "",
    message: ""
  })
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setQuoteForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitQuote = async (e: React.FormEvent, projectTitle: string, projectId: number) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: null, text: '' })
    
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...quoteForm,
          projectTitle: projectTitle
        }),
      })

      if (response.ok) {
        setQuoteForm({ name: "", phone: "", email: "", message: "" })
        
        // Close dialog immediately
        setOpenDialogs(prev => ({
          ...prev,
          [projectId]: false
        }))
        setMessage({ type: null, text: '' })
      } else {
        const errorData = await response.json()
        setMessage({ 
          type: 'error', 
          text: errorData.error || 'Failed to submit quote request' 
        })
      }
    } catch (error) {
      console.error('Error submitting quote request:', error)
      setMessage({ 
        type: 'error', 
        text: 'Failed to submit quote request. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setQuoteForm({ name: "", phone: "", email: "", message: "" })
  }

  const handleDialogOpenChange = (projectId: number, open: boolean) => {
    setOpenDialogs(prev => ({
      ...prev,
      [projectId]: open
    }))
    if (!open) {
      resetForm()
    }
  }
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">PROJECTS</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest projects, and see how we showcase creativity, innovation, and problem-solving through
              our diverse portfolio of completed and ongoing projects.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      {/* <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default">All Projects</Button>
            <Button variant="outline">Engineering</Button>
            <Button variant="outline">Design</Button>
            <Button variant="outline">Full-Stack</Button>
            <Button variant="outline">Completed</Button>
            <Button variant="outline">In Progress</Button>
          </div>
        </div>
      </section> */}

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                <div className="aspect-video bg-accent relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary">{project.category}</Badge>
                    <Badge variant={project.status === "Completed" ? "default" : "outline"}>{project.status}</Badge>
                  </div> */}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-end mb-2">
                    {/* <span className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.year}
                    </span> */}
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {project.client}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <Dialog open={openDialogs[project.id]} onOpenChange={(open) => handleDialogOpenChange(project.id, open)}>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-auto">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request a Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Request a Quote - {project.title}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={(e) => handleSubmitQuote(e, project.title, project.id)} className="space-y-4">
                        {message.type === 'error' && (
                          <Alert className="border-red-500 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800">
                              {message.text}
                            </AlertDescription>
                          </Alert>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor={`name-${project.id}`}>Name</Label>
                          <Input
                            id={`name-${project.id}`}
                            type="text"
                            value={quoteForm.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="border-black focus:border-black"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`phone-${project.id}`}>Phone Number</Label>
                          <Input
                            id={`phone-${project.id}`}
                            type="tel"
                            value={quoteForm.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="Enter your phone number"
                            className="border-black focus:border-black"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`email-${project.id}`}>Email</Label>
                          <Input
                            id={`email-${project.id}`}
                            type="email"
                            value={quoteForm.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email address"
                            className="border-black focus:border-black"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`message-${project.id}`}>Message</Label>
                          <Textarea
                            id={`message-${project.id}`}
                            value={quoteForm.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            placeholder="Tell us about your project requirements..."
                            className="border-black focus:border-black"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Project Statistics</h2>
            <p className="text-muted-foreground">Our track record of successful project delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss how we can bring your ideas to life with our engineering and design expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Start Your Project</Button>
            <Button variant="outline" size="lg">
              View Our Services
            </Button>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
