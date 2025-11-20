import { useEffect, useState } from 'react'
import HospitalCard from './HospitalCard'
import { Search, Crosshair } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function HospitalList({ onSelect }){
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [position, setPosition] = useState(null)

  useEffect(()=>{
    // Try geolocation first
    locate()
  },[])

  async function locate(){
    if(!navigator.geolocation){
      fetchAll()
      return
    }
    navigator.geolocation.getCurrentPosition(async (pos)=>{
      const { latitude, longitude } = pos.coords
      setPosition({lat: latitude, lng: longitude})
      await fetchNearby(latitude, longitude)
    }, ()=>{
      fetchAll()
    })
  }

  async function fetchAll(){
    setLoading(true)
    try{
      const res = await fetch(`${API_BASE}/hospitals`)
      const data = await res.json()
      setHospitals(data)
    }finally{ setLoading(false) }
  }

  async function fetchNearby(lat, lng){
    setLoading(true)
    try{
      const params = new URLSearchParams({lat, lng, radius_km: '30'})
      if(query) params.set('specialty', query)
      const res = await fetch(`${API_BASE}/hospitals/nearby?${params.toString()}`)
      const data = await res.json()
      setHospitals(data)
    }finally{ setLoading(false) }
  }

  async function onSearch(e){
    e.preventDefault()
    if(position){
      fetchNearby(position.lat, position.lng)
    } else {
      fetchAll()
    }
  }

  return (
    <section className="relative z-10 -mt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <form onSubmit={onSearch} className="bg-slate-900/70 border border-slate-700/50 rounded-xl p-3 flex items-center gap-2 mb-6">
          <Search className="w-5 h-5 text-slate-400"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} className="flex-1 bg-transparent outline-none text-slate-200 placeholder:text-slate-500" placeholder="Search by specialty (e.g., Cardiology, Emergency)"/>
          <button type="submit" className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm">Search</button>
          <button type="button" onClick={locate} title="Use current location" className="ml-2 p-2 rounded bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700">
            <Crosshair className="w-4 h-4"/>
          </button>
        </form>

        {loading && <p className="text-slate-300">Loading hospitals...</p>}
        {!loading && hospitals.length === 0 && (
          <p className="text-slate-400">No hospitals found.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map(h => (
            <HospitalCard key={h.id || h._id} hospital={h} onSelect={onSelect}/>
          ))}
        </div>
      </div>
    </section>
  )
}
