'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Team() {
  const team = [
    {
      name: 'Kiyan Mohebbizadeh',
      title: 'Development & Architecture',
      bio: 'UC Berkeley student specializing in urban planning and sustainable design. Focused on transit-oriented development and mixed-use residential projects.',
      image: '/kiyan.jpeg'
    },
    {
      name: 'Tainn Schoeman',
      title: 'Engineering & Design',
      bio: 'UC Berkeley engineering student with expertise in structural systems and sustainable building technologies. Passionate about creating efficient, environmentally-conscious developments.',
      image: '/tainn.jpeg'
    },
    {
      name: 'Andrew Winter',
      title: 'Finance & Strategy',
      bio: 'Berkeley Haas student specializing in real estate finance and development economics. Focused on capital structuring and financial modeling for large-scale urban projects.',
      image: '/andrew.jpeg'
    },
    {
      name: 'Sanjit Sama',
      title: 'Business Development',
      bio: 'Berkeley Haas student with focus on real estate investment and market analysis. Expertise in feasibility studies and strategic planning for mixed-use developments.',
      image: '/sanjit.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-neutral-900/95 backdrop-blur-sm z-50 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white tracking-wide hover:text-neutral-300 transition">
              ASHBY BART
            </Link>
            <div className="hidden md:flex space-x-10 items-center">
              <Link href="/#vision" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Vision</Link>
              <Link href="/#project" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Project</Link>
              <Link href="/#impact" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Impact</Link>
              <Link href="/#strategy" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Strategy</Link>
              <Link href="/team" className="text-white transition text-sm uppercase tracking-wider">Team</Link>
              <Link href="/#contact" className="text-neutral-300 hover:text-white transition text-sm uppercase tracking-wider">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-neutral-400">Leadership</p>
          <h1 className="text-6xl md:text-7xl font-light mb-12 leading-tight">
            Our Team
          </h1>
          <div className="w-24 h-px bg-white/40 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl font-light text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            UC Berkeley and Haas students envisioning the future of<br className="hidden md:block" />
            transit-oriented development in Berkeley
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                {/* Team photo with greyscale */}
                <div className="w-64 h-64 mx-auto mb-8 relative overflow-hidden rounded-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    sizes="256px"
                  />
                </div>
                
                <h3 className="text-xl font-light text-neutral-900 mb-3 tracking-wide">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-light">{member.title}</p>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 text-neutral-400 font-light">Advisory Board</p>
          <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-20">Expert Guidance</h2>
          
          <div className="grid md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
            <div>
              <h4 className="font-light text-neutral-900 mb-3 text-base">Academic Programs</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Real Estate Development, Urban Planning, Engineering, and Business Administration at UC Berkeley and Haas</p>
            </div>
            <div>
              <h4 className="font-light text-neutral-900 mb-3 text-base">Focus Areas</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Transit-oriented development, sustainable design, affordable housing integration, and financial modeling</p>
            </div>
            <div>
              <h4 className="font-light text-neutral-900 mb-3 text-base">Methodology</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Combining academic research with real-world feasibility analysis and community-centered design principles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-8">Ready to Learn More?</h2>
          <p className="text-lg text-neutral-400 mb-12">
            Contact our team to discuss investment opportunities
          </p>
          <Link 
            href="/#contact"
            className="inline-block px-12 py-4 bg-white text-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-200 transition"
          >
            Get In Touch
          </Link>
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
                <Link href="/#vision" className="block hover:text-white transition">Vision</Link>
                <Link href="/#project" className="block hover:text-white transition">Project</Link>
                <Link href="/#impact" className="block hover:text-white transition">Impact</Link>
                <Link href="/#strategy" className="block hover:text-white transition">Strategy</Link>
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

