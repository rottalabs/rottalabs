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
import { Download, Star, ShoppingCart, MessageSquare, AlertCircle } from "lucide-react"
import { useState } from "react"

interface ProductFormData {
  name: string
  phone: string
  email: string
  message: string
}

const products = [
  {
    id: 1,
    name: "Engineering Edge - E-Book Series",
    description: "A collection of powerful, easy-to-read e-books packed with engineering insights, design strategies, and problem-solving techniques. Each guide is designed to help students, professionals, and innovators quickly gain practical knowledge they can apply immediately.",
    price: "$49.99",
    rating: 4.8,
    downloads: "2.3k",
    category: "Education",
    image: "/ebook series.jpg",
  },
  {
    id: 2,
    name: "ProModel Vault - Ready-to-Use CAD & 3D Models",
    description: "A curated library of SketchUp, CAD, and 3D models built with professional precision. From architectural components to engineering parts, each model is accurate, scalable, and production-ready, helping you save hours of work.",
    price: "$79.99",
    rating: 4.9,
    downloads: "1.8k",
    category: "3D Models",
    image: "/3d cad models.jpg",
  },
  {
    id: 3,
    name: "SmartSheets - Engineering Templates & Worksheets",
    description: "Professionally designed calculation sheets, project planners, checklists, and documentation templates that simplify your workflow. Perfect for engineers, students, and startups who need ready-made tools to save time and reduce errors.",
    price: "$99.99",
    rating: 4.7,
    downloads: "1.5k",
    category: "Templates",
    image: "/Templates worksheets.jpg",
  },
  {
    id: 4,
    name: "RapidSkills - Mini-Courses & Tutorials",
    description: "Bite-sized digital courses focused on engineering design, 3D modeling, SketchUp, rendering, and technical documentation. Each course is clear, practical, and hands-on, giving you real skills in just hours, not weeks.",
    price: "$59.99",
    rating: 4.8,
    downloads: "3.1k",
    category: "Courses",
    image: "/Tutorials.jpg",
  },
  {
    id: 5,
    name: "VisualLab - Infographics & Technical Packs",
    description: "Stunning sets of infographics, diagrams, and technical visuals made for reports, presentations, and digital content. Turn complex engineering and design concepts into clear, modern, and engaging visuals that stand out.",
    price: "$89.99",
    rating: 4.9,
    downloads: "2.7k",
    category: "Visuals",
    image: "/Infographics packs.jpg",
  },
]

export default function ProductsPage() {
  const [productForm, setProductForm] = useState<ProductFormData>({
    name: "",
    phone: "",
    email: "",
    message: ""
  })
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDialogOpenChange = (productId: number, open: boolean) => {
    setOpenDialogs(prev => ({
      ...prev,
      [productId]: open
    }))
    if (!open) {
      setMessage({ type: null, text: '' })
    }
  }

  const handleSubmitProduct = async (e: React.FormEvent, productName: string, productId: number) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage({ type: null, text: '' })
    
    try {
      const response = await fetch('/api/product-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productForm,
          projectTitle: productName,
          projectId: productId,
          type: 'product'
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Product request submitted successfully! We will contact you soon.' })
        setProductForm({ name: "", phone: "", email: "", message: "" })
        setTimeout(() => {
          setOpenDialogs(prev => ({ ...prev, [productId]: false }))
          setMessage({ type: null, text: '' })
        }, 2000)
      } else {
        setMessage({ type: 'error', text: 'Failed to submit product request. Please try again.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">PRODUCTS</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our premium e-books, CAD models, engineering templates, mini-courses, and visual resources designed for engineers, designers, and creative professionals. Download instantly and enhance your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
             <Card
             key={product.id}
             className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
           >
             <div className="w-full h-48 bg-accent overflow-hidden">
               <img
                 src={product.image || "/placeholder.svg"}
                 alt={product.name}
                 className="w-full h-full object-cover"
               />
             </div>
              <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    {/* <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{product.rating}</span>
                    </div> */}
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-1/2">
                  <div className="flex-grow">
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">{product.price}</span>
                      {/* <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Download className="h-4 w-4" />
                        <span>{product.downloads}</span>
                      </div> */}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Dialog open={openDialogs[product.id]} onOpenChange={(open) => handleDialogOpenChange(product.id, open)}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Request Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Request Product - {product.name}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleSubmitProduct(e, product.name, product.id)} className="space-y-4">
                          {message.type === 'error' && (
                            <Alert className="border-red-500 bg-red-50">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-red-800">
                                {message.text}
                              </AlertDescription>
                            </Alert>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor={`name-${product.id}`}>Name</Label>
                            <Input
                              id={`name-${product.id}`}
                              type="text"
                              value={productForm.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              placeholder="Enter your full name"
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`phone-${product.id}`}>Phone Number</Label>
                            <Input
                              id={`phone-${product.id}`}
                              type="tel"
                              value={productForm.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`email-${product.id}`}>Email</Label>
                            <Input
                              id={`email-${product.id}`}
                              type="email"
                              value={productForm.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="Enter your email address"
                              className="border-black focus:border-black"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`message-${product.id}`}>Message (Optional)</Label>
                            <Textarea
                              id={`message-${product.id}`}
                              value={productForm.message}
                              onChange={(e) => handleInputChange("message", e.target.value)}
                              placeholder="Tell us about your product requirements..."
                              className="border-black focus:border-black"
                            />
                          </div>
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Product Request"}
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



      <Footer />
    </div>
  )
}
