'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"; // Adjust the import based on your project structure
// import ScientificProgramad from '@/components/ScientificProgramad'; // Ensure this is the correct import
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

export default function AdminPage() {

  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check local storage for authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  // Specify the event type
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { value: loginData } = await Swal.fire({
      title: 'Login',
      html: `
        <input id="username" class="swal2-input" placeholder="Username">
        <input id="password" type="password" class="swal2-input" placeholder="Password">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        return [
          usernameInput.value,
          passwordInput.value
        ];
      }
    });

    if (loginData) {
      const [username, password] = loginData;

      // Replace with your authentication logic
      if (username === 'Monta' && password === 'ICCME2024') {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Save to local storage
        Swal.fire('Success', 'Login successful!', 'success');
      } else {
        Swal.fire('Error', 'Invalid username or password', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <header className="fixed w-full z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
      </header>

      <main className="pt-20 p-4">
        {isAuthenticated ? (
          <section>
            <motion.h2 className="text-3xl font-semibold text-center mb-6">
              Current Scientific Program
            </motion.h2>
            {/* <ScientificProgramad /> */}
          </section>
        ) : (
          <section className="flex flex-col items-center justify-center min-h-[60vh]">
            <motion.h2 className="text-3xl font-semibold text-center mb-6">
              Login
            </motion.h2>
            <motion.form
              onSubmit={handleLoginSubmit}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 space-y-4"
            >
              <Button 
                type="submit" // Change to submit type
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </Button>
            </motion.form>
          </section>
        )}
      </main>

      <footer className="bg-black bg-opacity-50 py-4 text-center">
        <p>&copy; 2024 ICCME. All rights reserved.</p>
      </footer>
    </div>
  );
}
