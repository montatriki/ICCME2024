"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Component() {
  const [selectedDay, setSelectedDay] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "ATME", href: "/atme" },
    { label: "Committees", href: "/committees" },
    { label: "Speakers", href: "/speakers" },
    { label: "Publication", href: "/publication" },
    { label: "Program", href: "/program" },
    { label: "Registration", href: "/registration" },
    { label: "Gallery", href: "/gallery" },
    { label: "Venue", href: "/venue" },
    { label: "Contact", href: "/contact" }
  ]

  const schedule = {
    registration: {
      time: "14h-16h",
      title: "Registration",
      details: "Registration from 14:00 to 20:00 at Hotel"
    },
    openingCeremony: {
      time: "16h30-16h45",
      title: "Opening Ceremony",
      chairs: [
        { name: "Pr. Rached Ben Hassen" },
        { name: "Pr. Mounir ELACHABY" }
      ]
    },
    plenaryLecture: {
      time: "16h45-17h20",
      title: "Polymer and Biobased Materials",
      speaker: "Plenary Lecture 1 : Pr. Mounir ELACHABY",
      affiliation: "(University Mohammed VI Polytechnic-Morocco)"
    },
    coffeeBreak: {
      time: "17h20-17h45",
      title: "Coffee break"
    }
  }

  return (
<<<<<<< HEAD
    <div className="w-full relative">
      {/* Fixed Navigation */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0B1126] shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
=======
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed w-full z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tighter">ICCME 2024</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`text-sm uppercase tracking-widest font-bold hover:text-blue-600 transition-colors ${
                      activeSection === item.name.toLowerCase()
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-2'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-white flex items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center space-y-8">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <a
                      href={item.href}
                      className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
       <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden ">
          <div className="flex flex-col items-center">         
>>>>>>> origin/main
              <Image
                src="/iccme-logo.png"
                alt="ICCME2024"
                width={120}
                height={40}
                className="object-contain"
              />
<<<<<<< HEAD
            </div>
            
            {/* Navigation Items */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`text-sm transition-colors duration-200 ${
                    scrolled ? 'text-white hover:text-gray-300' : 'text-white hover:text-gray-200'
                  }`}
=======
              <div className="absolute inset-0 bg-gradient-to-t  rounded-lg" />          
           
          </div>

          <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-12 h-12 text-gray-600" />
          </a>
        </section>

        <section id="program" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-900 relative">
              Scientific Program
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600" />
            </h3>
            <ScientificProgram />
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-900 relative">
              Key Information
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: Calendar, title: 'Date', content: 'November 07-09, 2024' },
                { icon: MapPin, title: 'Venue', content: 'Iberostar Selection Kuriat Palace, Monastir, Tunisia' },
                { icon: Users, title: 'Participants', content: '500+ Researchers & Professionals' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white rounded-lg p-8 flex flex-col items-center text-center shadow-xl transform hover:scale-105 transition-transform duration-300"
>>>>>>> origin/main
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section with Main Image */}
      <div className="relative w-full h-[600px]">
        {!imageError ? (
          <Image
            src="http://www.edsf.fss.rnu.tn/ICCME2024/assets/css/venue-gallery/210.jpg"
            alt="Conference Venue"
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Image unavailable</p>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">ICCME 2024</h1>
              <p className="text-xl">International Conference on Chemistry Materials and Environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-center text-3xl font-bold mb-2">PROGRAMS</h1>
        <p className="text-center text-xl text-gray-600 mb-8">ICCME2024</p>
        <div className="h-1 w-16 bg-red-500 mx-auto mb-8"></div>

        {/* Day Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "secondary"}
              className={`px-8 py-2 rounded-full ${
                selectedDay === day
                  ? "bg-[#ff1744] hover:bg-[#ff1744]/90"
                  : "bg-[#1a237e] hover:bg-[#1a237e]/90"
              } text-white`}
              onClick={() => setSelectedDay(day)}
            >
              Day {day}
            </Button>
          ))}
        </div>

        <p className="text-center text-gray-600 italic mb-4">
          November 7th ,8th ,9th 2024
        </p>
        <p className="text-center text-red-500 hover:underline cursor-pointer mb-8">
          You can download this program
        </p>

        {/* Schedule */}
        <div className="space-y-6">
          {/* Registration */}
          <div className="border-b pb-4">
            <div className="text-lg font-semibold text-gray-700">
              {schedule.registration.time}
            </div>
            <h3 className="text-xl font-bold text-[#1a237e]">
              {schedule.registration.title}
            </h3>
            <p className="text-gray-600 italic">
              {schedule.registration.details}
            </p>
          </div>

          {/* Opening Ceremony */}
          <div className="border-b pb-4">
            <div className="text-lg font-semibold text-gray-700">
              {schedule.openingCeremony.time}
            </div>
            <h3 className="text-xl font-bold text-[#1a237e]">
              {schedule.openingCeremony.title}
            </h3>
            {schedule.openingCeremony.chairs.map((chair, index) => (
              <p key={index} className="text-gray-600 italic">
                Chair : {chair.name}
              </p>
            ))}
          </div>

          {/* Plenary Lecture */}
          <div className="border-b pb-4">
            <div className="text-lg font-semibold text-gray-700">
              {schedule.plenaryLecture.time}
            </div>
            <h3 className="text-xl font-bold text-[#1a237e]">
              {schedule.plenaryLecture.title}
            </h3>
            <p className="text-gray-600 italic">
              {schedule.plenaryLecture.speaker}
            </p>
            <p className="text-gray-600 italic">
              {schedule.plenaryLecture.affiliation}
            </p>
          </div>

          {/* Coffee Break */}
          <div className="border-b pb-4">
            <div className="text-lg font-semibold text-gray-700">
              {schedule.coffeeBreak.time}
            </div>
            <h3 className="text-xl font-bold text-[#1a237e]">
              {schedule.coffeeBreak.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
