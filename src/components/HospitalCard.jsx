import { Star, MapPin } from 'lucide-react'

function capacityColor(available, total){
  const ratio = total>0 ? available/total : 0
  if(ratio >= 0.5) return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
  if(ratio >= 0.15) return 'bg-amber-500/15 text-amber-300 border-amber-400/30'
  return 'bg-rose-500/15 text-rose-300 border-rose-400/30'
}

export default function HospitalCard({ hospital, onSelect }){
  const ratio = hospital.total_beds ? Math.round((hospital.available_beds/hospital.total_beds)*100) : 0
  return (
    <button onClick={()=>onSelect?.(hospital)} className="text-left w-full group">
      <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/60 hover:bg-slate-800 transition">
        <div className="h-40 w-full bg-slate-900 overflow-hidden">
          <img src={hospital.image_url+"&auto=format&fit=crop&w=1200&q=60"} alt="hospital" className="w-full h-full object-cover group-hover:scale-105 transition" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-white font-semibold text-lg">{hospital.name}</h3>
              <p className="text-slate-400 text-sm inline-flex items-center gap-1"><MapPin className="w-4 h-4"/> {hospital.distance_km? `${hospital.distance_km} km • `: ''}{hospital.address}</p>
            </div>
            {hospital.avg_rating && (
              <div className="flex items-center gap-1 text-amber-300"><Star className="w-4 h-4 fill-current"/>{hospital.avg_rating}</div>
            )}
          </div>
          <div className={`mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${capacityColor(hospital.available_beds, hospital.total_beds)}`}>
            <span>{hospital.available_beds} / {hospital.total_beds} beds</span>
            <span className="opacity-70">({ratio}%)</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {hospital.specialties?.slice(0,4).map((s,i)=> (
              <span key={i} className="px-2 py-0.5 text-xs rounded bg-slate-700/60 text-slate-200 border border-slate-600/50">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </button>
  )
}
