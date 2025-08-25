import { WeddingEventDisplay } from "./components/WeddingEventDisplay";
import { RSVPSection } from "./components/RSVPSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Kasper & Sofie
            </h1>
            <p className="text-xl text-gray-600">Vi gifter os!</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Wedding Event Information */}
        <WeddingEventDisplay />

        {/* RSVP Section */}
        <RSVPSection />
      </div>

      {/* Footer */}
      <div className="bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Med kærlighed og glæde</p>
            <p className="text-sm">Kasper & Sofie</p>
          </div>
        </div>
      </div>
    </div>
  );
}
