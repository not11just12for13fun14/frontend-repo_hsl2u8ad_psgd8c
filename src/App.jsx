import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HospitalList from './components/HospitalList'
import DetailDrawer from './components/DetailDrawer'
import AdminPanel from './components/AdminPanel'
import { Routes, Route } from 'react-router-dom'

function ExplorePage(){
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <HospitalList onSelect={setSelected} />
      <DetailDrawer open={!!selected} hospital={selected} onClose={()=>setSelected(null)} onSeed={async()=>{ await fetch((import.meta.env.VITE_BACKEND_URL||'http://localhost:8000')+'/seed',{method:'POST'}); window.location.reload()}} />
      <footer className="text-center text-slate-500 text-sm py-10">Data is sample/demo. Use for exploration only.</footer>
    </div>
  )
}

function AdminPage(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />
      <AdminPanel />
    </div>
  )
}

function App(){
  return (
    <Routes>
      <Route path="/" element={<ExplorePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
