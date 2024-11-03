'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Poster from "@/components/Poster";
import Timee from '../components/Timee';

interface PosterItem {
  id: string;
  pdfId: string;
  presenter: string;
  topic: string;
}

interface ProgramItem {
  id: number;
  time: string;
  activity: string;
  posters: PosterItem[];
}

export default function Component() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programData, setProgramData] = useState<ProgramItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        const response = await fetch(`/api/program?day=${selectedDay}`); // Pass the selected day as a query parameter
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProgramData(data);
      } catch (error) {
        console.error('Error fetching program data:', error);
      }
    };

    fetchProgramData();
  }, [selectedDay]); // Refetch data when selectedDay changes


  const navItems = [
    { label: "Home", href: "/" },
    { label: "ATME", href: "" },
    { label: "Committees", href: "http://www.edsf.fss.rnu.tn/ICCME2024/committees.php" },
    { label: "Speakers", href: "http://www.edsf.fss.rnu.tn/ICCME2024/speakers.php" },
    { label: "Publication", href: "http://www.edsf.fss.rnu.tn/ICCME2024/publication.php" },
    { label: "Program", href: "/" },
    { label: "Registration", href: "/registration" },
    { label: "Gallery", href: "/gallery" },
    { label: "Venue", href: "http://www.edsf.fss.rnu.tn/ICCME2024/venue.php" },
    { label: "Contact", href: "http://www.edsf.fss.rnu.tn/ICCME2024/contact.php" }
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
              src="http://www.edsf.fss.rnu.tn/ICCME2024/assets/css/venue-gallery/201.png"
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
            <h2 className="text-3xl font-bold">PROGRAM</h2>
            <p className="text-xl text-gray-600">ICCME2024</p>
            <div className="h-1 w-16 bg-red-500 mx-auto"></div>
          </div>

          {/* Day Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3].map((day) => (
              <Button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-10 py-5 rounded-full ${selectedDay === day ? "bg-red-500" : "bg-[#1a237e]"} text-white hover:opacity-90`}
              >
                Day {day}
              </Button>
            ))}
          </div>

          {/* Updated Program Content and Posters */}
          <div className="space-y-6">
            {programData.map((item) => (
              <div
                key={item.id}
                className="border border-white/20 rounded-lg p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl transition-shadow duration-300 hover:shadow-3xl"
              >
                <p className="text-xl font-semibold text-white">{item.time}</p>
                <p className="text-gray-300 mt-2 whitespace-pre-line">{item.activity}</p>
                <Timee time={item.time} />

                {item.posters && item.posters.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white">Poster Presentations:</h3>
                    <div className="grid gap-4">
                      {item.posters.map((poster) => (
                        <div
                          key={poster.id}
                          className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 hover:bg-white/20 transition-colors duration-300"
                        >
                          <Poster
                            presenter={{
                              id: poster.id,
                              presenter: poster.presenter,
                              topic: poster.topic
                            }}
                            pdfId={poster.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Partners Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="w-full">
            <Image
              src="http://www.edsf.fss.rnu.tn/ICCME2024/assets/img/supporters/partenaireall.jpg"
              alt="Partner"
              layout="responsive"
              width={1920}
              height={1080}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1126] text-white py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                <h3 className="text-xl font-bold">TheEvent</h3>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold relative inline-block">
                  IMPORTANT DATES
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-500"></span>
                </h4>
                <div className="space-y-2 mt-4">
                  <p>Call for Abstracts/Registration Open : Jun 1, 2024</p>
                  <p>Final deadline of Abstract Submission : September 30, 2024</p>
                  <p>Notification of participation acceptance : October 1, 2024</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold relative inline-block mb-6">
                CONTACT US
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-red-500"></span>
              </h4>
              <div className="space-y-2">
                <p>Address: (ATME) Association Tunisienne des Matériaux et de l&apos;Environnement</p>
                <p>ISSBAT, 9 Av. Dr Zouheir SAFI 1006, Tunis TUNISIE</p>
                <p>Phone: +216 21 999 999</p>
                <p>Email: contact@iccme2024.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}