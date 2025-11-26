import Link from 'next/link';

export default function Location() {
  return (
    <section id="location" className="py-40 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-28">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 text-muted-foreground">Location</p>
          <h2 className="text-5xl font-light text-foreground">Strategic Position</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground leading-relaxed mb-12 text-lg">
              Directly adjacent to the Ashby BART Station at the intersection of Shattuck and Ashby Avenues, 
              providing unparalleled connectivity throughout the Bay Area.
            </p>
            <div className="space-y-6">
              <div>
                <div className="font-medium text-foreground text-lg mb-2">Direct BART Access</div>
                <div className="text-muted-foreground">On-site station connectivity</div>
              </div>
              <div>
                <div className="font-medium text-foreground text-lg mb-2">Adeline Corridor</div>
                <div className="text-muted-foreground">Vibrant commercial district</div>
              </div>
              <div>
                <div className="font-medium text-foreground text-lg mb-2">UC Berkeley</div>
                <div className="text-muted-foreground">Strong institutional demand</div>
              </div>
            </div>
            <div className="mt-12">
              <Link 
                href="/map" 
                className="inline-block px-8 py-3 bg-foreground text-background uppercase tracking-wider text-sm hover:bg-foreground/90 transition"
              >
                View Interactive Map
              </Link>
            </div>
          </div>
          
          <div className="bg-secondary rounded-sm h-96 flex items-center justify-center relative overflow-hidden group cursor-pointer">
            <Link href="/map" className="absolute inset-0 z-10"></Link>
            <div className="text-center text-muted-foreground group-hover:text-foreground transition">
              <svg className="w-20 h-20 mx-auto mb-6 opacity-30 group-hover:opacity-50 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-sm uppercase tracking-widest">Site Map</p>
              <p className="text-xs mt-2 opacity-60">Click to view interactive map</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
