import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-28 md:py-32">
        <div className="max-w-xl bg-slate-900/60 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
          <p className="text-blue-300/80 text-sm mb-2">Realtime hospital availability</p>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">Find nearby hospitals with live bed availability</h1>
          <p className="text-slate-300 mt-4">Auto-detect your location or search anywhere. Color cues show capacity at a glance: Green = plenty, Orange = limited, Red = full/very limited.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
    </section>
  )
}
