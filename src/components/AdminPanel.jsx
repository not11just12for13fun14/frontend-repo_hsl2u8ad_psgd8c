import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AdminPanel(){
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)

  async function load(){
    setLoading(true)
    const res = await fetch(`${API_BASE}/hospitals`)
    const data = await res.json()
    setHospitals(data)
    setLoading(false)
  }
  useEffect(()=>{ load() },[])

  async function updateBeds(id, value){
    setUpdating(id)
    await fetch(`${API_BASE}/hospitals/${id}/beds`,{
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({available_beds: Number(value)})
    })
    await load()
    setUpdating(null)
  }

  async function seed(){
    await fetch(`${API_BASE}/seed`, {method:'POST'})
    await load()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-semibold">Hospital Admin</h2>
        <button onClick={seed} className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Seed Sample Data</button>
      </div>
      {loading? (
        <p className="text-slate-300">Loading...</p>
      ):(
        <div className="space-y-4">
          {hospitals.map(h=>(
            <div key={h.id} className="bg-slate-900/70 border border-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <img src={h.image_url+"&auto=format&fit=crop&w=400&q=60"} className="w-20 h-16 object-cover rounded"/>
                <div className="flex-1">
                  <p className="text-white font-medium">{h.name}</p>
                  <p className="text-slate-400 text-sm">{h.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} max={h.total_beds} defaultValue={h.available_beds} className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200" onBlur={(e)=> updateBeds(h.id, e.target.value)} />
                  <button onClick={(e)=> updateBeds(h.id, e.currentTarget.previousSibling.value)} className="p-2 rounded bg-emerald-600 text-white">
                    {updating===h.id? <Loader2 className="w-4 h-4 animate-spin"/> : <Check className="w-4 h-4"/>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
