'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

const isProd = process.env.NODE_ENV === 'production';
const useStaticExport = process.env.USE_STATIC_EXPORT === 'true';
const basePath = isProd && useStaticExport ? '/real' : '';

export default function Team() {
  const team = [
    {
      name: 'Kiyan Mohebbizadeh',
      title: 'Development & Architecture',
      bio: 'UC Berkeley student specializing in urban planning and sustainable design. Focused on transit-oriented development and mixed-use residential projects.',
      image: `${basePath}/kiyan.jpeg`
    },
    {
      name: 'Tainn Schoeman',
      title: 'Engineering & Design',
      bio: 'UC Berkeley engineering student with expertise in structural systems and sustainable building technologies. Passionate about creating efficient, environmentally-conscious developments.',
      image: `${basePath}/tainn.jpeg`
    },
    {
      name: 'Andrew Winter',
      title: 'Finance & Strategy',
      bio: 'Berkeley Haas student specializing in real estate finance and development economics. Focused on capital structuring and financial modeling for large-scale urban projects.',
      image: `${basePath}/andrew.jpeg`
    },
    {
      name: 'Sanjit Sama',
      title: 'Business Development',
      bio: 'Berkeley Haas student with focus on real estate investment and market analysis. Expertise in feasibility studies and strategic planning for mixed-use developments.',
      image: `${basePath}/sanjit.jpeg`
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] mb-3 text-neutral-400">Leadership</p>
          <h1 className="text-4xl md:text-5xl font-light mb-4 leading-tight">
            Our Team
          </h1>
          <div className="w-24 h-px bg-white/40 mx-auto mb-4"></div>
          <p className="text-base md:text-lg font-light text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            UC Berkeley and Haas students envisioning the future of<br className="hidden md:block" />
            transit-oriented development in Berkeley
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                {/* Team photo with greyscale */}
                <div className="w-48 h-48 mx-auto mb-6 relative overflow-hidden rounded-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    sizes="192px"
                    unoptimized
                  />
                </div>
                
                <h3 className="text-lg font-light text-neutral-900 mb-2 tracking-wide">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 font-light">{member.title}</p>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-4 text-neutral-400 font-light">Advisory Board</p>
          <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-8">Expert Guidance</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <h4 className="font-light text-neutral-900 mb-2 text-base">Academic Programs</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Real Estate Development, Urban Planning, Engineering, and Business Administration at UC Berkeley and Haas</p>
            </div>
            <div>
              <h4 className="font-light text-neutral-900 mb-2 text-base">Focus Areas</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Transit-oriented development, sustainable design, affordable housing integration, and financial modeling</p>
            </div>
            <div>
              <h4 className="font-light text-neutral-900 mb-2 text-base">Methodology</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">Combining academic research with real-world feasibility analysis and community-centered design principles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-light mb-2">Ready to Learn More?</h2>
          <p className="text-sm text-neutral-400 mb-6">
            Contact our team to discuss investment opportunities
          </p>
          <a 
            href={`${basePath}/#contact`}
            className="inline-block px-10 py-3 bg-white text-neutral-900 text-sm uppercase tracking-widest hover:bg-neutral-200 transition"
          >
            Get In Touch
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

