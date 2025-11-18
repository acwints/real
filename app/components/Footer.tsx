import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-muted-foreground py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 mb-16 text-center">
          <div>
            <h3 className="text-primary-foreground text-lg font-medium mb-6 tracking-wide">Ashby BART Station</h3>
            <p className="text-sm leading-relaxed">
              Mixed-Use Development<br />
              Berkeley, California
            </p>
          </div>
          
          <div>
            <h4 className="text-primary-foreground text-sm uppercase tracking-widest mb-6">Property</h4>
            <p className="text-sm leading-relaxed">
              3101 Martin Luther King Jr Way<br />
              Berkeley, CA 94703<br />
              Parcel 53-1597-39-4
            </p>
          </div>
          
          <div>
            <h4 className="text-primary-foreground text-sm uppercase tracking-widest mb-6">Navigation</h4>
            <div className="space-y-3 text-sm">
              <a href="#vision" className="block hover:text-primary-foreground transition">Vision</a>
              <a href="#project" className="block hover:text-primary-foreground transition">Project</a>
              <a href="#impact" className="block hover:text-primary-foreground transition">Impact</a>
              <a href="#strategy" className="block hover:text-primary-foreground transition">Strategy</a>
              <Link href="/team" className="block hover:text-primary-foreground transition">Team</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-10 text-center text-sm">
          <p>&copy; 2025 Ashby BART Station Development. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
