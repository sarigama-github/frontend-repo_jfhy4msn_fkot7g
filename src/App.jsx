import React from 'react'
import ThreeScene from './components/ThreeScene'

const brand = {
  pink: '#FF7BC4',
  yellow: '#FFE8A3',
  blue: '#71D7FF',
  mint: '#A8FFC7',
  vanilla: '#FFF9F0'
}

function Section({ id, title, subtitle, children, bg }) {
  return (
    <section id={id} className={`relative w-full min-h-screen flex items-center ${bg || ''}`}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: brand.pink }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg md:text-xl text-slate-700" style={{ color: '#4b5563' }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

function FlavorCard({ name, color }) {
  return (
    <div className="group p-6 rounded-3xl border shadow-sm bg-white/80 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderColor: `${color}33` }}>
      <div className="w-12 h-12 rounded-2xl" style={{ background: color }} />
      <h4 className="mt-4 text-xl font-bold text-slate-800">{name}</h4>
      <p className="mt-2 text-slate-600 text-sm">Uma explosão de sabor artesanal.</p>
    </div>
  )
}

export default function App() {
  return (
    <div id="page-wrapper" className="relative overflow-x-hidden" style={{ fontFamily: 'Inter, Nunito, system-ui' }}>
      <ThreeScene />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl" style={{ background: brand.pink }} />
            <div>
              <p className="font-extrabold text-xl leading-none" style={{ color: '#111827' }}>Sorvetto</p>
              <p className="text-xs -mt-0.5" style={{ color: '#6b7280' }}>A Arte do Sabor</p>
            </div>
          </div>
          <a href="#cta" className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow" style={{ background: brand.blue }}>Visitar Loja</a>
        </div>
      </header>

      {/* Hero */}
      <Section
        id="hero"
        title="A Arte do Sabor"
        subtitle="Sorvetes artesanais com a experiência mais deliciosa da cidade."
        bg=""
      >
        <p className="mt-6 text-slate-700 max-w-xl">
          Descubra a verdadeira Arte do Sabor. Sorvetes artesanais criados com alegria, criatividade e muito amor.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="#sabores" className="px-6 py-3 rounded-full text-white font-semibold shadow" style={{ background: brand.pink }}>Experimentar Sabores</a>
          <a href="#sobre" className="px-6 py-3 rounded-full font-semibold" style={{ background: `${brand.mint}66`, color: '#065f46' }}>Saiba Mais</a>
        </div>
      </Section>

      {/* Sobre */}
      <Section
        id="sobre"
        title="Sobre a Sorveteria"
        subtitle="Na Sorvetto acreditamos que um bom sorvete é mais que um doce — é uma experiência feliz, refrescante e única."
      >
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-sm border border-slate-200/50">
            <p className="text-slate-700">Ingredientes frescos, técnicas artesanais e uma pitada generosa de criatividade.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-md shadow-sm border border-slate-200/50">
            <p className="text-slate-700">Elementos coloridos e divertidos para deixar seu dia mais feliz.</p>
          </div>
        </div>
      </Section>

      {/* Sabores */}
      <section id="sabores" className="relative w-full min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ color: brand.pink }}>Nossos Sabores</h2>
          <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-3xl">Do clássico ao criativo, nossos sabores são feitos todos os dias com ingredientes frescos e aquele toque especial que só a Sorvetto tem.</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl">
            <FlavorCard name="Morango dos Deuses" color={brand.pink} />
            <FlavorCard name="Chocolate Supremo" color="#8B5E3C" />
            <FlavorCard name="Maracujá Tropical" color="#FFD166" />
            <FlavorCard name="Baunilha Premium" color={brand.yellow} />
            <FlavorCard name="Menta Fresh" color={brand.mint} />
            <FlavorCard name="Caramelo Salgado" color="#D17842" />
          </div>
        </div>
      </section>

      {/* Experiência */}
      <Section
        id="experiencia"
        title="A Experiência Sorvetto"
        subtitle="Aqui cada colherada é pensada para surpreender. Viva uma experiência deliciosa e colorida."
      >
        <div className="mt-6 p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm">
          <div className="h-24 w-full rounded-2xl bg-gradient-to-r from-[#FF7BC4]/40 via-[#71D7FF]/40 to-[#FFE8A3]/40" />
        </div>
      </Section>

      {/* Depoimentos */}
      <Section id="depoimentos" title="O que falam da Sorvetto">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Incrível!", "A melhor experiência.", "Sabor e alegria.", "Volto sempre!"].slice(0,3).map((quote, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-sm">
              <p className="text-slate-800 font-semibold">{quote}</p>
              <p className="mt-2 text-slate-600 text-sm">— Cliente Feliz</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="cta" title="Pronto para sentir o sabor da felicidade?">
        <a href="#" className="inline-block mt-6 px-8 py-4 rounded-full text-white font-bold shadow-lg" style={{ background: brand.pink }}>
          Visitar Loja
        </a>
      </Section>

      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  )
}
