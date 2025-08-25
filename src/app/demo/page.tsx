import { ThingsServerSection } from "@/app/components/ThingsServerSection";
import { ThingsClientSection } from "@/app/components/ThingsClientSection";
import { UserProfile } from "@/app/components/UserProfile";
import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Server vs Client Data Fetching
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comparing Next.js Server Components vs TanStack Query approaches
          </p>

          {/* Overview */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">
              What You&apos;ll See:
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">
                  Server-Side Approach:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Server Component fetches data on server</li>
                  <li>• Server Actions handle form submissions</li>
                  <li>• Page refresh after adding items</li>
                  <li>• Great for SEO and initial page loads</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-2">
                  Client-Side Approach:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• TanStack Query manages data fetching</li>
                  <li>• Client-side mutations with optimistic updates</li>
                  <li>• Real-time updates without page refresh</li>
                  <li>• Advanced caching and error handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <UserProfile />

        {/* Server Section */}
        <ThingsServerSection />

        {/* Client Section */}
        <div className="mt-8">
          <ThingsClientSection />
        </div>

        {/* Architecture Comparison */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Architecture Comparison:
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Aspect</th>
                  <th className="text-left py-2">Server Component</th>
                  <th className="text-left py-2">TanStack Query</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2 font-medium">Data Fetching</td>
                  <td>Server-side at build/request time</td>
                  <td>Client-side with caching</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Caching</td>
                  <td>Next.js full-route cache</td>
                  <td>TanStack Query + browser cache</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Loading States</td>
                  <td>Page-level loading</td>
                  <td>Component-level loading</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Error Handling</td>
                  <td>Page-level error boundaries</td>
                  <td>Component-level error states</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">User Interactions</td>
                  <td>Page refreshes</td>
                  <td>Real-time updates</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Bundle Size</td>
                  <td>Smaller (no client JS for data)</td>
                  <td>Larger (includes TanStack Query)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">SEO</td>
                  <td>Excellent (server-rendered)</td>
                  <td>Good (with proper setup)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Best For</td>
                  <td>Content pages, marketing sites</td>
                  <td>Interactive apps, dashboards</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
