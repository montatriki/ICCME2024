'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Coffee, Users, Menu } from "lucide-react"; // Import Menu icon for mobile

export default function Component() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Toggle state for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B1126] shadow-md' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-red-500">ICCME</Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href} className="text-gray-700 hover:text-red-500">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {menuOpen && (
            <div className="md:hidden mt-2 space-y-4 text-center bg-white p-4 shadow-lg rounded-md">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href} className="block text-gray-700 hover:text-red-500">
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-16">
        <div className="w-full">
          <div className="relative w-full h-auto">
            <Image 
              src="http://www.edsf.fss.rnu.tn/ICCME2024/assets/css/venue-gallery/210.jpg"
              alt="Conference Venue"
              layout="responsive"
              width={1920}
              height={1080}
              className="object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-bold">PROGRAMS</h2>
            <p className="text-xl text-gray-600">ICCME2024</p>
            <div className="h-1 w-16 bg-red-500 mx-auto"></div>
          </div>

          {/* Day Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3].map((day) => (
              <Button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-8 py-2 rounded-full ${selectedDay === day ? "bg-red-500" : "bg-[#1a237e]"} text-white hover:opacity-90`}
              >
                Day {day}
              </Button>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 italic mb-2">November 7th, 8th-9th 2024</p>
            <p className="text-red-500 hover:underline cursor-pointer">You can download this program</p>
          </div>

          {/* Schedule */}
          <div className="space-y-6">
            {[
              { time: "14h-15h", title: "Registration", description: "Registration from 14:00 to 20:00 at Hotel" },
              { time: "16h30-16h45", title: "Opening Ceremony", chairs: ["Pr. Rached Ben Hassen", "Pr. Mounir ELACHABY"] },
              { time: "16h45-17h20", title: "Polymer and Biobased Materials", description: "Plenary Lecture 1 : Pr. Mounir ELACHABY (University Mohammed VI Polytechnic-Morocco)" },
              { time: "17h20-17h45", title: "Coffee break", icon: <Coffee className="h-4 w-4 text-gray-600" /> },
              { time: "17h45-18h45", title: "First poster session (P1)" },
              { time: "19h00", title: "Dinner" },
            ].map(({ time, title, description, chairs, icon }, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b">
                <div className="w-24 text-right">
                  <span className="text-gray-600 font-semibold">{time}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1a237e]">{title}</h3>
                  {description && <p className="text-gray-600 italic">{description}</p>}
                  {chairs && (
                    <div className="space-y-1">
                      {chairs.map((chair, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <p className="text-gray-600 italic">Chair : {chair}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Image 
              src="http://www.edsf.fss.rnu.tn/ICCME2024/assets/img/supporters/partenaireall.jpg"
              alt="Partner"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1126] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">📍</span> TheEvent
              </h3>
              <div className="space-y-2">
                <h4 className="font-bold">IMPORTANT DATES</h4>
                <p>Call for Abstracts/Registration Open: Jun 1, 2024</p>
                <p>Final deadline of Abstract Submission: September 30, 2024</p>
                <p>Notification of participation acceptance: October 1, 2024</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">CONTACT US</h4>
              <div className="space-y-2">
                <p>Address: (ATMR) Association Tunisienne des Materiaux et de l'Environnement</p>
                <p>Route 8011 ELGhazela Technopark Ariana Tunisia</p>
                <p>Email: info@example.com</p>
                <p>Phone: +216 93 307 532</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
