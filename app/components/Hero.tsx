export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9ImhzbGEoMCwgMCUsIDEwMCUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      
      <div className="relative z-10 text-center text-primary-foreground max-w-6xl mx-auto px-6">
        <p className="text-sm uppercase tracking-[0.3em] mb-8 text-primary-foreground/70">Berkeley, California</p>
        <h1 className="text-6xl md:text-8xl font-light mb-12 leading-tight tracking-tight">
          Ashby BART<br />Station
        </h1>
        <div className="w-24 h-px bg-primary-foreground/40 mx-auto mb-12"></div>
        <p className="text-xl md:text-2xl font-light text-secondary-foreground max-w-3xl mx-auto leading-relaxed mb-20">
          A transformative mixed-use development that reimagines<br className="hidden md:block" /> 
          urban living at the intersection of transit and community
        </p>
        <div className="mt-20 flex flex-col md:flex-row gap-12 justify-center items-center">
          <div className="text-center">
            <div className="text-5xl font-light mb-3">144</div>
            <div className="text-sm uppercase tracking-widest text-primary-foreground/70">Units</div>
          </div>
          <div className="hidden md:block w-px h-20 bg-primary-foreground/20"></div>
          <div className="text-center">
            <div className="text-5xl font-light mb-3">4.4</div>
            <div className="text-sm uppercase tracking-widest text-primary-foreground/70">Acres</div>
          </div>
          <div className="hidden md:block w-px h-20 bg-primary-foreground/20"></div>
          <div className="text-center">
            <div className="text-5xl font-light mb-3">50%+</div>
            <div className="text-sm uppercase tracking-widest text-primary-foreground/70">Affordable</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-primary-foreground animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
