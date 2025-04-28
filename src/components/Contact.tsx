"use client"

import type React from "react"
import { FaWhatsapp } from "react-icons/fa";

import { useState, useRef, useEffect } from "react"
import { MapPin, Mail, Clock, Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { useToast } from "@/components/ui/use-toast"

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }, // Trigger animation when 10% of the form is visible
    )

    if (formRef.current) {
      observer.observe(formRef.current)
    }

    return () => {
      // Check if formRef.current exists before unobserving
      const currentFormRef = formRef.current
      if (currentFormRef) {
        observer.unobserve(currentFormRef)
      }
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Make sure this endpoint is correct and accessible
      const res = await fetch("https://kodai-cool-stay-vibe.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      const result = await res.json()

      if (res.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll get back to you soon!",
        })
        setName("")
        setEmail("")
        setMessage("")
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Fetch error:", error) // Log the actual error
      toast({
        title: "Error",
        description: "Failed to send message. Check console for details or try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-hotel-beige">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-hotel-teal">Contact Us</h2>
          <div className="h-1 w-20 bg-hotel-orange mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            {" "}
            {/* Added text color */}
            Have questions or need more information? Reach out to us and we'll be happy to assist you.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {" "}
          {/* Added items-start for top alignment */}
          {/* Column 1: Contact Form */}
          {/* Added w-full to the wrapper */}
          <div
            ref={formRef}
            className={`w-full h-full transition-opacity duration-1000 ease-in-out ${isFormVisible ? "opacity-100" : "opacity-0"}`}
          >
            {/* Increased padding, added w-full and kept h-full */}
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg h-full w-full flex flex-col">
              {" "}
              {/* Increased padding, shadow, added flex flex-col */}
              <h3 className="text-3xl font-semibold mb-8 text-hotel-teal">Send Us a Message</h3>{" "}
              {/* Increased font size and margin */}
              {/* Added flex-grow to make the form take available space */}
              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-grow">
                {" "}
                {/* Increased space-y, added flex flex-col flex-grow */}
                {/* Input fields container */}
                <div className="space-y-4">
                  {" "}
                  {/* Kept moderate spacing for inputs */}
                  <div className="space-y-2">
                    {" "}
                    {/* Increased space between label and input */}
                    <Label htmlFor="contact-name" className="text-base font-medium text-gray-800">
                      Your Name
                    </Label>{" "}
                    {/* Slightly larger text */}
                    <Input
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="border-gray-300 focus:border-hotel-teal focus:ring-hotel-teal/50 rounded-md text-base py-2.5 px-4" /* Adjusted styling for size */
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    {" "}
                    {/* Increased space */}
                    <Label htmlFor="contact-email" className="text-base font-medium text-gray-800">
                      Your Email
                    </Label>{" "}
                    {/* Slightly larger text */}
                    <Input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="border-gray-300 focus:border-hotel-teal focus:ring-hotel-teal/50 rounded-md text-base py-2.5 px-4" /* Adjusted styling for size */
                      required
                    />
                  </div>
                  {/* Made the message area container grow */}
                  <div className="space-y-2 flex flex-col flex-grow">
                    {" "}
                    {/* Increased space, added flex flex-col flex-grow */}
                    <Label htmlFor="contact-message" className="text-base font-medium text-gray-800">
                      Your Message
                    </Label>{" "}
                    {/* Slightly larger text */}
                    <Textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      // Increased min-height significantly and added flex-grow to fill vertical space
                      className="border-gray-300 focus:border-hotel-teal focus:ring-hotel-teal/50 rounded-md min-h-[180px] flex-grow text-base p-4" /* Adjusted styling, increased min-h */
                      required
                    />
                  </div>
                </div>{" "}
                {/* End input fields container */}
                {/* Button container - use mt-auto to push to bottom */}
                <div className="mt-auto pt-6">
                  {" "}
                  {/* Added pt-6 for spacing */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    // Made button slightly larger
                    className="w-full bg-hotel-teal hover:bg-hotel-teal/90 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out flex items-center justify-center text-lg" /* Adjusted styling */
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2.5" /> {/* Slightly larger icon and margin */}
                        Send Message
                      </>
                    )}
                  </Button>
                </div>{" "}
                {/* End button container */}
              </form>
            </div>
          </div>
          {/* Column 2: Contact Info + Map */}
          {/* This column stacks its children vertically */}
          <div className="flex flex-col space-y-8 md:space-y-8 h-full">
            {" "}
            {/* Ensures spacing between info and map */}
            {/* Contact Information Block */}
            <div className="bg-hotel-teal text-white p-6 md:p-8 rounded-lg shadow-md flex-grow-0">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>{" "}
              {/* Changed font-bold to font-semibold */}
              <div className="space-y-5">
                {" "}
                {/* Adjusted spacing */}
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-hotel-sand flex-shrink-0" /> {/* Adjusted icon style */}
                  <div>
                    <h4 className="font-semibold mb-0.5">Address</h4> {/* Changed font-bold to font-semibold */}
                    <p className="text-hotel-sand/90 text-sm leading-relaxed">
                      123 Kodaikanal Hills,
                      <br />
                      Tamil Nadu, India 624103
                    </p>{" "}
                    {/* Adjusted text style */}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-0.5">Phone</h4>

                <div>
                  <h4 className="font-semibold mb-0.5">Phone</h4>
                  <div className="flex flex-col space-y-1 text-sm">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-hotel-sand/90 hover:text-hotel-sand/90 hover:text-base transition-all duration-200"
                    >
                      <FaWhatsapp className="text-green-500" />
                      +91 9876543210
                    </a>
                    <a
                      href="https://wa.me/911234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-hotel-sand/90 hover:text-hotel-sand/90 hover:text-base transition-all duration-200"
                    >
                      <FaWhatsapp className="text-green-500" />
                      +91 1234567890
                    </a>
                  </div>
                </div>
                </div>


                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-1 text-hotel-sand flex-shrink-0" /> {/* Adjusted icon style */}
                  <div>
                    <h4 className="font-semibold mb-0.5">Email</h4> {/* Changed font-bold to font-semibold */}
                    <p className="text-hotel-sand/90 text-sm leading-relaxed">
                      info@kodaicoolstay.com
                      <br />
                      bookings@kodaicoolstay.com
                    </p>{" "}
                    {/* Adjusted text style */}
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1 text-hotel-sand flex-shrink-0" /> {/* Adjusted icon style */}
                  <div>
                    <h4 className="font-semibold mb-0.5">Reception Hours</h4> {/* Changed font-bold to font-semibold */}
                    <p className="text-hotel-sand/90 text-sm leading-relaxed">24 Hours, 7 Days a Week</p>{" "}
                    {/* Adjusted text style */}
                  </div>
                </div>
              </div>
            </div>
            {/* Map Block */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md flex-grow">
              <h3 className="text-2xl font-semibold mb-4 text-hotel-teal">Find Us</h3>{" "}
              {/* Changed font-bold to font-semibold */}
              {/* Removed flex-grow, added aspect-video for responsive height */}
              <div className="relative w-full h-[400px] flex-grow rounded-lg overflow-hidden bg-gray-200 border border-gray-200">
  {/* Added fixed height */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125473.87472381365!2d77.42177569726562!3d10.239328100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b076663e44a169f%3A0x8005a3513c2b79c7!2sKodaikanal%2C%20Tamil%20Nadu%20624101!5e0!3m2!1sen!2sin!4v1713379050834!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Hotel Location Map"
  ></iframe>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
