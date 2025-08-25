"use client";

export function PhotoGallery() {
  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-wedding-charcoal mb-4">
          Vores Historie
        </h2>
        <p className="text-xl text-wedding-stone max-w-2xl mx-auto">
          Nogle af de øjeblikke der har ført os hertil
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-wedding-forest to-wedding-rose mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Photo Display */}
      <div className="wedding-card rounded-3xl p-8 overflow-hidden">
        <div className="relative">
          {/* Photo Container */}
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/vertical-photo-dump.jpg"
                alt="Kasper og Sofies kærlighedshistorie"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-wedding-gold rounded-full opacity-80"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-wedding-rose rounded-full opacity-60"></div>
            <div className="absolute top-1/2 -left-6 w-6 h-6 bg-wedding-mint rounded-full opacity-70"></div>
            <div className="absolute top-1/4 -right-6 w-8 h-8 bg-wedding-blush rounded-full opacity-50"></div>
          </div>

          {/* Photo caption */}
          <div className="text-center mt-8">
            <p className="text-wedding-stone italic text-lg">
              "Hvert øjeblik med dig er en gave vi værdsætter"
            </p>
            <div className="flex items-center justify-center mt-4 space-x-2">
              <span className="text-2xl">💕</span>
              <span className="text-wedding-charcoal font-medium">Kasper & Sofie</span>
              <span className="text-2xl">💕</span>
            </div>
          </div>
        </div>
      </div>

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
