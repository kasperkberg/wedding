"use client";

import { Card, CardContent } from "@/components/ui/card";

export function PhotoGallery() {
  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-wedding-charcoal mb-4 wedding-serif">
          Vores Historie
        </h2>
        <p className="text-xl text-wedding-stone max-w-2xl mx-auto wedding-serif">
          Nogle af de øjeblikke der har ført os hertil
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-wedding-bronze to-wedding-navy mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Photo Display */}
      <Card className="rounded-3xl p-8 overflow-hidden">
        <CardContent>
          <div className="relative">
            {/* Photo Container */}
            <div className="relative max-w-2xl mx-auto">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/vertical-photo-dump.jpg"
                  alt="Tirill og Christians kærlighedshistorie"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-wedding-gold rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-wedding-rose rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -left-6 w-6 h-6 bg-wedding-bronze rounded-full opacity-70"></div>
              <div className="absolute top-1/4 -right-6 w-8 h-8 bg-wedding-navy rounded-full opacity-50"></div>
            </div>

            {/* Photo caption */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground italic text-lg wedding-serif">
                "Hvert øjeblik med dig er en gave vi værdsætter"
              </p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-2xl font-bold text-wedding-bronze">
                  ♥
                </span>
                <span className="font-medium wedding-serif">
                  Tirill & Christian
                </span>
                <span className="text-2xl font-bold text-wedding-bronze">
                  ♥
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Memory timeline dots */}
      <div className="flex justify-center mt-8 space-x-4">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className="w-3 h-3 bg-wedding-sage-dark rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            title={`Minde ${dot}`}
          ></div>
        ))}
      </div>
    </section>
  );
}
