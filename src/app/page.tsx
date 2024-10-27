'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Calendar, MapPin, Users, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'; // Importing Image component from Next.js
import ScientificProgram from '@/components/ScientificProgram'

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'speakers', 'venue']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Speakers', href: '#speakers' },
    { name: 'Venue', href: '#venue' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <header className="fixed w-full z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ICCME 2024</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`text-sm uppercase tracking-wider hover:text-pink-400 transition-colors ${activeSection === item.name.toLowerCase() ? 'text-pink-400' : ''}`}
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
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-90 flex items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center space-y-6">
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
                      className="text-2xl font-bold hover:text-pink-400 transition-colors"
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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="flex flex-col items-center">
            <Image src="/4.png" alt="Palace" width={1200} height={1200} className="mb-4" /> {/* Updated img tag to Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4"
            >
              <Button
                size="lg"
                className="bg-pink-600 text-white font-semibold rounded-lg shadow-lg hover:bg-pink-700 transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                Register Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </a>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Key Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 flex items-start space-x-4"
                >
                  <item.icon className="w-8 h-8 text-pink-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="speakers" className="py-20 bg-black bg-opacity-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Featured Speakers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg overflow-hidden shadow-lg"
                >
                  <Image src={`/placeholder.svg?height=400&width=600`} alt={`Speaker ${i}`} width={600} height={400} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Dr. Jane Doe</h4>
                    <p className="text-gray-300 mb-4">Professor of Chemistry, University XYZ</p>
                    <p className="text-sm text-gray-400">Keynote: &quot;The Future of Sustainable Materials&quot;</p> {/* Escaped double quotes */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="venue" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Conference Venue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <Image src="/a.png" alt="Iberostar Selection Kuriat Palace" width={600} height={400} className="w-full h-64 object-cover" />
                <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg">
                  <h4 className="text-xl font-semibold mb-2">Iberostar Selection Kuriat Palace</h4>
                  <p className="text-gray-300">Experience luxury and comfort at our state-of-the-art conference venue.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <Image src="/s.png" alt="Monastir, Tunisia" width={600} height={400} className="w-full h-64 object-cover" />
                <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg">
                  <h4 className="text-xl font-semibold mb-2">Monastir, Tunisia</h4>
                  <p className="text-gray-300">Explore the rich history and beautiful landscapes of Monastir during your stay.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="program" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Scientific Program</h3>
            <ScientificProgram />
          </div>
        </section>
      </main>

      <footer className="bg-black bg-opacity-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 ICCME. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
