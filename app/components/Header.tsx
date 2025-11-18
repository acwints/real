import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-wide">
            ASHBY BART
          </Link>
          <nav className="hidden md:flex space-x-10 items-center">
            <a href="#vision" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Vision</a>
            <a href="#project" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Project</a>
            <a href="#impact" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Impact</a>
            <a href="#strategy" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Strategy</a>
            <Link href="/team" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Team</Link>
            <a href="#contact" className="text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
