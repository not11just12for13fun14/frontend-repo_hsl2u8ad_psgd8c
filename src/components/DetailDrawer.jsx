import { X, Star } from 'lucide-react'

export default function DetailDrawer({ open, onClose, hospital, onSeed }){
  if(!open || !hospital) return null

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">{hospital.name}</h3>
          <button onClick={onClose} className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"><X className="w-4 h-4"/></button>
        </div>
        <img src={hospital.image_url+"&auto=format&fit=crop&w=1200&q=60"} className="w-full h-40 object-cover rounded-lg"/>
        <p className="text-slate-300 mt-3 text-sm">{hospital.address}</p>
        <div className="mt-3 text-slate-200 text-sm">
          <p><span className="text-slate-400">Beds:</span> {hospital.available_beds} / {hospital.total_beds}</p>
          <p className="mt-1"><span className="text-slate-400">Specialties:</span> {hospital.specialties?.join(', ')}</p>
        </div>
        {hospital.avg_rating && (
          <div className="mt-3 inline-flex items-center gap-2 text-amber-300"><Star className="w-4 h-4 fill-current"/> {hospital.avg_rating} avg rating</div>
        )}
        <div className="mt-6">
          <button onClick={onSeed} className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white">Seed sample data</button>
        </div>
      </div>
    </div>
  )
}
