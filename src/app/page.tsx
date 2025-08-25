import { WeddingHero } from "./components/WeddingHero";
import { WeddingEventDisplay } from "./components/WeddingEventDisplay";
import { RSVPSection } from "./components/RSVPSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { Card, CardContent } from "@/components/ui/card";

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
            <Card className="rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 font-bold text-wedding-bronze">
                  ∞
                </div>
                <h3 className="text-xl font-bold mb-2 wedding-serif">
                  Bryllup
                </h3>
                <p className="text-muted-foreground">
                  Vi siger ja til hinanden
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 font-bold text-wedding-navy">
                  ♣
                </div>
                <h3 className="text-xl font-bold mb-2 wedding-serif">Fest</h3>
                <p className="text-muted-foreground">
                  Vi fejrer sammen med jer
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4 font-bold text-wedding-rose">
                  ♥
                </div>
                <h3 className="text-xl font-bold mb-2 wedding-serif">
                  Kærlighed
                </h3>
                <p className="text-muted-foreground">
                  Vi deler øjeblikket med jer
                </p>
              </CardContent>
            </Card>
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
      <div className="bg-gradient-to-r from-wedding-linen to-wedding-ivory py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Card className="rounded-2xl inline-block">
            <CardContent className="p-8">
              <div className="text-6xl mb-4 font-bold text-wedding-bronze">
                ∞
              </div>
              <h2 className="text-2xl font-bold mb-4 wedding-serif">
                Med kærlighed og glæde
              </h2>
              <div className="flex items-center justify-center space-x-8 text-wedding-navy">
                <div className="text-center">
                  <div className="text-lg font-semibold wedding-serif">
                    Tirill
                  </div>
                  <div className="text-sm">&</div>
                </div>
                <div className="text-2xl font-bold text-wedding-bronze">♥</div>
                <div className="text-center">
                  <div className="text-lg font-semibold wedding-serif">
                    Christian
                  </div>
                  <div className="text-sm">&</div>
                </div>
              </div>
              <div className="mt-6 text-muted-foreground text-sm wedding-serif">
                Tak fordi I vil være en del af vores særlige dag
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
