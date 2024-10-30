'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Calendar, MapPin, Users, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
          <div className="flex flex-col items-center">
          
              <Image
                src="/hb.jpg"
                alt="Palace"
                width={800}
                height={400}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-lg" />
          
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
                >
                  <div className="bg-blue-600 text-white p-4 rounded-full mb-6">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h4>
                  <p className="text-gray-600">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="venue" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-900 relative">
              Conference Venue
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden shadow-2xl group"
              >
                <div className="relative">
                  <Image
                    src="/a.png"
                    alt="Iberostar Selection Kuriat Palace"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl font-bold mb-2 text-white">Iberostar Selection Kuriat Palace</h4>
                    <p className="text-gray-200">Experience luxury and comfort at our state-of-the-art conference venue.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-lg overflow-hidden shadow-2xl group"
              >
                <div className="relative">
                  <Image
                    src="/s.png"
                    alt="Monastir, Tunisia"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl font-bold mb-2 text-white">Monastir, Tunisia</h4>
                    <p className="text-gray-200">Explore the rich history and beautiful landscapes of Monastir during your stay.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-4">&copy; 2024 ICCME. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
