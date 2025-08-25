"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../../../lib/auth-types";
import { authClient } from "../../../lib/auth-client";

export function WeddingHero() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user as User | null);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();

    // Animation delay for smooth entrance
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthAction = () => {
    if (user) {
      // Scroll to RSVP section if authenticated
      document.getElementById('rsvp-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="wedding-hero relative overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>

      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌸</div>
        <div className="absolute top-32 right-16 text-5xl opacity-30 animate-bounce" style={{ animationDelay: '1s' }}>💐</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-25 animate-bounce" style={{ animationDelay: '2s' }}>🌿</div>
        <div className="absolute bottom-32 right-12 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>🌹</div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className={`text-center text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Main heading with elegant styling */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 wedding-text-glow">
              Kasper
            </h1>
            <div className="flex items-center justify-center mb-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="text-4xl mx-6">💍</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 wedding-text-glow">
              Sofie
            </h1>
          </div>

          {/* Wedding announcement */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl mb-4 font-light tracking-wider">
              Vi gifter os
            </p>
            <div className="w-32 h-px bg-white/50 mx-auto mb-6"></div>
            <p className="text-lg md:text-xl opacity-90 font-light">
              Vi inviterer jer til at fejre vores kærlighed
            </p>
          </div>

          {/* Call to action button */}
          <div className="mb-8">
            <button
              onClick={handleAuthAction}
              className="wedding-button px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              {user ? 'Se invitationen' : 'Se invitation'}
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-wedding-sage to-transparent z-15"></div>
    </section>
  );
}
