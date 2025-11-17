'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. We will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-neutral-900/95 backdrop-blur-sm z-50 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-white tracking-wide">
              ASHBY BART
            </div>
            <div className="hidden md:flex space-x-10 items-center">
              <a href="#vision" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Vision</a>
              <a href="#project" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Project</a>
              <a href="#impact" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Impact</a>
              <a href="#strategy" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Strategy</a>
              <Link href="/team" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Team</Link>
              <a href="#contact" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen with Image Overlay */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-300">Berkeley, California</p>
          <h1 className="text-6xl md:text-8xl font-light mb-12 leading-tight tracking-tight">
            Ashby BART<br />Station
          </h1>
          <div className="w-24 h-px bg-white/40 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl font-light text-neutral-200 max-w-3xl mx-auto leading-relaxed mb-20">
            A transformative mixed-use development that reimagines<br className="hidden md:block" /> 
            urban living at the intersection of transit and community
          </p>
          <div className="mt-20 flex flex-col md:flex-row gap-12 justify-center items-center">
            <div className="text-center">
              <div className="text-5xl font-light mb-3">750—1,200</div>
              <div className="text-sm uppercase tracking-widest text-neutral-400">Units</div>
            </div>
            <div className="hidden md:block w-px h-20 bg-white/20"></div>
            <div className="text-center">
              <div className="text-5xl font-light mb-3">4.4</div>
              <div className="text-sm uppercase tracking-widest text-neutral-400">Acres</div>
            </div>
            <div className="hidden md:block w-px h-20 bg-white/20"></div>
            <div className="text-center">
              <div className="text-5xl font-light mb-3">50%+</div>
              <div className="text-sm uppercase tracking-widest text-neutral-400">Affordable</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-500">Our Vision</p>
          <h2 className="text-5xl md:text-7xl font-light text-neutral-900 mb-16 leading-tight">
            Transit-Oriented<br />Urban Placemaking
          </h2>
          <div className="w-24 h-px bg-neutral-300 mx-auto mb-16"></div>
          <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed max-w-4xl mx-auto">
            Development can be a catalyst for positive, transformative change. The Ashby BART project partners with the community, 
            local government, and private capital to create a vibrant urban place that serves residents, commuters, and neighbors alike.
          </p>
        </div>
      </section>

      {/* Impact Grid - 6 Values */}
      <section id="impact" className="py-40 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-500">Our Impact</p>
            <h2 className="text-5xl font-light text-neutral-900">Development Pillars</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-20">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 mb-6 tracking-wide">Housing</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Delivering 750-1,200 new homes to address Berkeley's acute housing shortage and support diverse communities.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 mb-6 tracking-wide">Community</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                At least 50% affordable housing ensures economic diversity and expands opportunities for all Berkeley residents.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 mb-6 tracking-wide">Transit</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Direct BART station access reduces car dependency and connects residents to the entire Bay Area.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 mb-6 tracking-wide">Commerce</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Street-level retail, cafés, and market hall create vibrant pedestrian life and support local entrepreneurs.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 mb-6 tracking-wide">Workspace</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                2-3 floors of office and co-working space for startups, nonprofits, and hybrid workers.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto bg-neutral-200 rounded-sm flex items-center justify-center">
                  <svg className="w-12 h-12 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-neutral-900 mb-6 tracking-wide">Sustainability</h3>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Transit-oriented design, bicycle facilities, and reduced parking align with Berkeley's climate goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section id="project" className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-28">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-500">The Project</p>
            <h2 className="text-5xl md:text-7xl font-light text-neutral-900 leading-tight">
              A New Chapter for<br />the Adeline Corridor
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-24 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-light text-neutral-900 mb-8 tracking-wide">Residential</h3>
              <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                <p>
                  The residential component will deliver between 750 and 1,200 housing units, with at least 50% designated as affordable 
                  in alignment with Assembly Bill 2923 and local agreements.
                </p>
                <p>
                  Housing will serve UC Berkeley students seeking off-campus accommodations, faculty and staff, young professionals 
                  commuting to San Francisco and Oakland, and families attracted to Berkeley's renowned schools and cultural amenities.
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-light text-neutral-900 mb-8 tracking-wide">Commercial</h3>
              <div className="space-y-6 text-neutral-600 leading-relaxed text-lg">
                <p>
                  Street-level retail will activate all building edges, creating opportunities for cafés, restaurants, and small shops 
                  that appeal to commuters, residents, and neighbors.
                </p>
                <p>
                  Concepts include a grocery or market hall, grab-and-go food outlets catering to BART passengers, and flexible retail 
                  bays supporting local entrepreneurs and small businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Strategy */}
      <section id="strategy" className="py-40 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-28">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-400">Investment Thesis</p>
            <h2 className="text-5xl md:text-7xl font-light mb-16 leading-tight">
              Strategic Opportunity
            </h2>
            <div className="w-24 h-px bg-white/40 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-24 max-w-5xl mx-auto mb-24">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-light mb-8 tracking-wide">Market Timing</h3>
              <div className="space-y-6 text-neutral-300 leading-relaxed text-lg">
                <p>
                  The Bay Area's housing crisis and UC Berkeley's persistent shortage of student and faculty housing ensure 
                  strong demand for well-located units.
                </p>
                <p>
                  Young professionals seeking more affordable alternatives to San Francisco and Oakland will find the project attractive, 
                  given its combination of transit access and modern amenities.
                </p>
                <p>
                  The integration of retail, office, and community space strengthens the project's resilience by diversifying revenue 
                  streams and establishing a vibrant neighborhood hub.
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-light mb-8 tracking-wide">Policy Support</h3>
              <div className="space-y-6 text-neutral-300 leading-relaxed text-lg">
                <p>
                  In 2022, both Ashby and North Berkeley BART sites were rezoned under the R-BMU designation to allow mid- to high-rise 
                  mixed-use development.
                </p>
                <p>
                  Assembly Bill 2923 mandates transit-oriented development on BART-owned sites, creating a favorable regulatory framework 
                  for this project.
                </p>
                <p>
                  Berkeley has prioritized higher-density construction near transit hubs, aligning with regional housing goals and 
                  statewide mandates.
                </p>
              </div>
            </div>
          </div>

          {/* Investment Memo CTA */}
          <div className="text-center pt-16 border-t border-neutral-800">
            <p className="text-neutral-400 mb-8 text-lg">Detailed financial analysis and development timeline available</p>
            <button className="px-12 py-4 bg-white text-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-200 transition">
              Download Investment Memo
            </button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-28">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-500">Location</p>
            <h2 className="text-5xl font-light text-neutral-900">Strategic Position</h2>
          </div>
          
          <div className="grid md:grid-cols-5 gap-20 items-center">
            <div className="md:col-span-2 text-center md:text-left">
              <p className="text-neutral-600 leading-relaxed mb-12 text-lg">
                Directly adjacent to the Ashby BART Station at the intersection of Shattuck and Ashby Avenues, 
                providing unparalleled connectivity throughout the Bay Area.
              </p>
              <div className="space-y-6">
                <div className="flex items-start justify-center md:justify-start">
                  <div className="text-neutral-400 mr-4 mt-1 text-xl">—</div>
                  <div className="text-left">
                    <div className="font-medium text-neutral-900 text-lg">Direct BART Access</div>
                    <div className="text-neutral-600">On-site station connectivity</div>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-start">
                  <div className="text-neutral-400 mr-4 mt-1 text-xl">—</div>
                  <div className="text-left">
                    <div className="font-medium text-neutral-900 text-lg">Adeline Corridor</div>
                    <div className="text-neutral-600">Vibrant commercial district</div>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-start">
                  <div className="text-neutral-400 mr-4 mt-1 text-xl">—</div>
                  <div className="text-left">
                    <div className="font-medium text-neutral-900 text-lg">UC Berkeley</div>
                    <div className="text-neutral-600">Strong institutional demand</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 bg-neutral-100 rounded-sm h-96 flex items-center justify-center">
              <div className="text-center text-neutral-400">
                <svg className="w-20 h-20 mx-auto mb-6 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm uppercase tracking-widest">Site Map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Specifications */}
      <section className="py-40 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-28">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-500">Property Details</p>
            <h2 className="text-5xl font-light text-neutral-900">Site Specifications</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Address</div>
              <div className="text-neutral-900 leading-relaxed">
                3101 Martin Luther King Jr Way<br />
                Berkeley, CA 94703
              </div>
              <div className="text-neutral-600 mt-3 leading-relaxed">
                3100 Adeline St<br />
                Berkeley, CA 94703
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Parcel Number</div>
              <div className="text-neutral-900 text-xl">53-1597-39-4</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Site Size</div>
              <div className="text-neutral-900 text-3xl font-light">4.4 acres</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Zoning</div>
              <div className="text-neutral-900 mb-3">R-BMU</div>
              <a 
                href="https://berkeley.municipal.codes/BMC/23.202.150(F)" 
            target="_blank"
            rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition underline"
              >
                View Municipal Code
              </a>
            </div>
            
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Topography</div>
              <div className="text-neutral-900">Low to no gradient</div>
              <div className="text-sm text-neutral-600 mt-2">Currently surface parking</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Configuration</div>
              <div className="text-neutral-900 leading-relaxed text-sm">
                Irregular triangular parcel bordered by residential west, mixed-use east
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-40 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-400">Get In Touch</p>
            <h2 className="text-5xl md:text-6xl font-light mb-8">Investment Inquiry</h2>
            <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto">
              Connect with us to learn more about this development opportunity
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-10 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest mb-4 text-neutral-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-b border-neutral-700 focus:border-white focus:outline-none text-white transition text-lg"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest mb-4 text-neutral-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-0 py-4 bg-transparent border-b border-neutral-700 focus:border-white focus:outline-none text-white transition text-lg"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="company" className="block text-xs uppercase tracking-widest mb-4 text-neutral-400">
                Company / Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-neutral-700 focus:border-white focus:outline-none text-white transition text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest mb-4 text-neutral-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-0 py-4 bg-transparent border-b border-neutral-700 focus:border-white focus:outline-none text-white transition resize-none text-lg"
              />
            </div>
            
            <div className="text-center pt-12">
              <button
                type="submit"
                className="px-16 py-5 bg-white text-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-200 transition"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-neutral-500 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div className="text-center md:text-left">
              <h3 className="text-white text-lg font-medium mb-6 tracking-wide">Ashby BART Station</h3>
              <p className="text-sm leading-relaxed">
                Mixed-Use Development<br />
                Berkeley, California
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="text-white text-sm uppercase tracking-widest mb-6">Property</h4>
              <p className="text-sm leading-relaxed">
                3101 Martin Luther King Jr Way<br />
                Berkeley, CA 94703<br />
                Parcel 53-1597-39-4
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="text-white text-sm uppercase tracking-widest mb-6">Navigation</h4>
              <div className="space-y-3 text-sm">
                <a href="#vision" className="block hover:text-white transition">Vision</a>
                <a href="#project" className="block hover:text-white transition">Project</a>
                <a href="#impact" className="block hover:text-white transition">Impact</a>
                <a href="#strategy" className="block hover:text-white transition">Strategy</a>
                <Link href="/team" className="block hover:text-white transition">Team</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 pt-10 text-center text-sm">
            <p>&copy; 2025 Ashby BART Station Development. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
