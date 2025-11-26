import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-wide">
            ASHBY BART
          </Link>
          <nav className="hidden md:flex space-x-10 items-center">
            <Link href="/team" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Team</Link>
            <Link href="/map" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Map</Link>
            <Link href="/model" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Model</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
