import { WeddingHero } from "./components/WeddingHero";
import { WeddingEventDisplay } from "./components/WeddingEventDisplay";
import { RSVPSection } from "./components/RSVPSection";
import { PhotoGallery } from "./components/PhotoGallery";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <WeddingHero />

      {/* Main Content */}
      <div className="relative -mt-20 z-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Wedding Information Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Quick Info Cards */}
            <div className="wedding-card rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">💍</div>
              <h3 className="text-xl font-bold text-wedding-charcoal mb-2">Bryllup</h3>
              <p className="text-wedding-stone">Vi siger ja til hinanden</p>
            </div>

            <div className="wedding-card rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-wedding-charcoal mb-2">Fest</h3>
              <p className="text-wedding-stone">Vi fejrer sammen med jer</p>
            </div>

            <div className="wedding-card rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-bold text-wedding-charcoal mb-2">Kærlighed</h3>
              <p className="text-wedding-stone">Vi deler øjeblikket med jer</p>
            </div>
          </div>

          {/* Wedding Event Information */}
          <div className="mb-16">
            <WeddingEventDisplay />
          </div>

          {/* Photo Gallery Section */}
          <div className="mb-16">
            <PhotoGallery />
          </div>

          {/* RSVP Section */}
          <div className="mb-16">
            <RSVPSection />
          </div>
        </div>
      </div>

      {/* Elegant Footer */}
      <div className="bg-gradient-to-r from-wedding-sage-light to-wedding-mint py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="wedding-card rounded-2xl p-8 inline-block">
            <div className="text-6xl mb-4">💑</div>
            <h2 className="text-2xl font-bold text-wedding-charcoal mb-4">
              Med kærlighed og glæde
            </h2>
            <div className="flex items-center justify-center space-x-8 text-wedding-forest">
              <div className="text-center">
                <div className="text-lg font-semibold">Kasper</div>
                <div className="text-sm">❤️</div>
              </div>
              <div className="text-2xl">💕</div>
              <div className="text-center">
                <div className="text-lg font-semibold">Sofie</div>
                <div className="text-sm">❤️</div>
              </div>
            </div>
            <div className="mt-6 text-wedding-stone text-sm">
              Tak fordi I vil være en del af vores særlige dag
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
