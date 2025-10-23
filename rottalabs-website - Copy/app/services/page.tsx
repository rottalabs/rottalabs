"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, Users, CheckCircle, MessageSquare, AlertCircle } from "lucide-react"
import { useState } from "react"

const services = [
  {
    id: 1,
    name: "Visionary Spaces - Interior & Exterior Engineering Design",
    description: "Transform ideas into 3D realities using SketchUp modeling, photorealistic rendering, and engineering integration for interior layouts, exterior facades, or structural planning, balancing aesthetics, functionality, and technical precision.",
    duration: "2-4 weeks",
    price: "$2000+",
    features: ["3D SketchUp Modeling", "Photorealistic Rendering", "Engineering Integration", "Interior & Exterior Design"],
    category: "Design",
  },
  {
    id: 2,
    name: "Precision Engineering - Custom Design & Documentation",
    description: "Tailored engineering solutions, including custom mechanical, electrical, and structural designs, along with full technical documentation, emphasizing accuracy, compliance, and innovation.",
    duration: "3-6 weeks",
    price: "$3000+",
    features: ["Custom Mechanical Design", "Electrical Systems", "Structural Planning", "Full Documentation"],
    category: "Engineering",
  },
  {
    id: 3,
    name: "Innovation Navigator - Consulting for Companies & Startups",
    description: "Consulting package designed to guide businesses, entrepreneurs, and startups through product development challenges, offering feasibility studies, prototyping advice, workflow optimization, and technology adoption.",
    duration: "1-3 months",
    price: "$5000+",
    features: ["Feasibility Studies", "Prototyping Advice", "Workflow Optimization", "Technology Adoption"],
    category: "Consulting",
  },
  {
    id: 4,
    name: "Blueprint to Reality - Full Technical & Technological Documentation",
    description: "Specializes in creating comprehensive engineering, technological, and manufacturing documentation for products and prototypes, including CAD models, drawings, schematics, manuals, and process guidelines.",
    duration: "4-8 weeks",
    price: "$4000+",
    features: ["CAD Models", "Technical Drawings", "Schematics", "Process Guidelines"],
    category: "Documentation",
  },
  {
    id: 5,
    name: "Masterclass Mentorship - One-on-One Engineering & Design Guidance",
    description: "Personalized mentorship sessions for students, aspiring engineers, or professionals looking to enhance their skills in engineering, design, and technology, providing real-world techniques and hands-on coaching.",
    duration: "1-2 hours",
    price: "$150/hour",
    features: ["Personalized Sessions", "Real-world Techniques", "Industry Tools", "Hands-on Coaching"],
    category: "Mentorship",
  },
]

interface BookingFormData {
  name: string
  phone: string
  email: string
  message: string
  preferredDateTime: string
}

export default function ServicesPage() {
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
    preferredDateTime: ""
  })
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitBooking = async (e: React.FormEvent, serviceName: string, serviceId: number) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: null, text: '' })
    
    try {
      const response = await fetch('/api/booking-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingForm,
          serviceName: serviceName
        }),
      })

      if (response.ok) {
        setBookingForm({ name: "", phone: "", email: "", message: "", preferredDateTime: "" })
        
        // Close dialog immediately
        setOpenDialogs(prev => ({
          ...prev,
          [serviceId]: false
        }))
        setMessage({ type: null, text: '' })
      } else {
        const errorData = await response.json()
        setMessage({ 
          type: 'error', 
          text: errorData.error || 'Failed to submit booking request' 
        })
      }
    } catch (error) {
      console.error('Error submitting booking request:', error)
      setMessage({ 
        type: 'error', 
        text: 'Failed to submit booking request. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setBookingForm({ name: "", phone: "", email: "", message: "", preferredDateTime: "" })
  }

  const handleDialogOpenChange = (serviceId: number, open: boolean) => {
    setOpenDialogs(prev => ({
      ...prev,
      [serviceId]: open
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">SERVICES</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer everything from design to engineering, technical solutions tailored to your needs. Book a
              consultation to discuss your project requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="aspect-[1.5/1] bg-accent flex items-center justify-center overflow-hidden relative">
                  {service.id === 1 && (
                    <img src="/Visionary spaces.jpg" alt="Visionary Spaces" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {service.id === 2 && (
                    <img src="/Precision engineering.jpg" alt="Precision Engineering" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {service.id === 3 && (
                    <img src="/Innovation navigator.jpg" alt="Innovation Navigator" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {service.id === 4 && (
                    <img src="/Blueprint to reality.jpg" alt="Blueprint to Reality" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {service.id === 5 && (
                    <img src="/Mentorship.jpg" alt="Mentorship" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{service.category}</Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>1-on-1</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-1/2">
                  <div className="flex-grow">
                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Dialog open={openDialogs[service.id]} onOpenChange={(open) => handleDialogOpenChange(service.id, open)}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Consultation
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Book Consultation - {service.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleSubmitBooking(e, service.name, service.id)} className="space-y-4">
                          {message.type === 'error' && (
                            <Alert className="border-red-500 bg-red-50">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-red-800">
                                {message.text}
                              </AlertDescription>
                            </Alert>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor={`name-${service.id}`}>Name</Label>
                            <Input
                              id={`name-${service.id}`}
                              type="text"
                              value={bookingForm.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Enter your full name"
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`phone-${service.id}`}>Phone Number</Label>
                            <Input
                              id={`phone-${service.id}`}
                              type="tel"
                              value={bookingForm.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`email-${service.id}`}>Email</Label>
                            <Input
                              id={`email-${service.id}`}
                              type="email"
                              value={bookingForm.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="Enter your email address"
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`datetime-${service.id}`}>Preferred Date & Time (Optional)</Label>
                            <Input
                              id={`datetime-${service.id}`}
                              type="datetime-local"
                              value={bookingForm.preferredDateTime}
                              onChange={(e) => handleInputChange("preferredDateTime", e.target.value)}
                              className="border-black focus:border-black"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`message-${service.id}`}>Message</Label>
                            <Textarea
                              id={`message-${service.id}`}
                              value={bookingForm.message}
                              onChange={(e) => handleInputChange("message", e.target.value)}
                              placeholder="Tell us about your project requirements..."
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to book your consultation and get expert guidance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Service</h3>
              <p className="text-muted-foreground">Select the consultation service that best fits your needs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Time</h3>
              <p className="text-muted-foreground">Pick a convenient time slot from our available calendar</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Expert Advice</h3>
              <p className="text-muted-foreground">
                Join the session and receive personalized guidance for your project
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
