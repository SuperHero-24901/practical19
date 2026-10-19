import { useState } from "react";
import StudentTable from "./components/StudentTable";

const initialStudents = [
  { id: 1, name: "Rahul Patel", email: "rahul.patel@example.com", course: "BCA" },
  { id: 2, name: "Priya Shah", email: "priya.shah@example.com", course: "BBA" },
  { id: 3, name: "Amit Kumar", email: "amit.kumar@example.com", course: "BSc IT" },
  { id: 4, name: "Neha Desai", email: "neha.desai@example.com", course: "MCA" },
  { id: 5, name: "Karan Joshi", email: "karan.joshi@example.com", course: "BCA" },
];
export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [pending, setPending] = useState(null);
  function confirmDelete() { setStudents((old)=>old.filter((s)=>s.id!==pending.id)); setPending(null); }
  return <main className="min-h-screen bg-[#f5f7fb] p-5 sm:p-9"><div className="mx-auto max-w-7xl"><header className="mb-8"><p className="text-sm font-bold uppercase tracking-widest text-indigo-600">CAMPUS / RECORDS</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Student management</h1><p className="mt-2 text-slate-500">Keep student records organized and easy to manage.</p></header>
  <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat title="Total students" value={students.length} icon="♙"/><Stat title="Courses represented" value={new Set(students.map(s=>s.course)).size} icon="▤"/><Stat title="Visible records" value={students.filter(s=>`${s.name} ${s.email} ${s.course}`.toLowerCase().includes(search.toLowerCase())).length} icon="⌕"/></div>
  <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold">Student directory</h2><p className="mt-1 text-sm text-slate-500">Review records or remove a selected student.</p></div><div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3"><span className="text-slate-400">⌕</span><input className="min-w-0 py-3 outline-none" placeholder="Search students..." value={search} onChange={(e)=>setSearch(e.target.value)}/></div></div><StudentTable students={students} onDelete={setPending} search={search}/></section></div>
  {pending && <div className="fixed inset-0 z-10 grid place-items-center bg-slate-950/50 p-4"><div role="dialog" aria-modal="true" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-xl text-red-600">!</div><h2 className="mt-4 text-xl font-bold">Delete student?</h2><p className="mt-2 text-sm leading-6 text-slate-500">You're about to remove <strong className="text-slate-800">{pending.name}</strong> from the displayed list. This action cannot be undone in this demo.</p><div className="mt-6 flex justify-end gap-3"><button onClick={()=>setPending(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 font-semibold">Cancel</button><button onClick={confirmDelete} className="rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700">Delete student</button></div></div></div>}</main>;
}
function Stat({title,value,icon}) { return <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{title}</p><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-lg text-indigo-600">{icon}</span></div><p className="mt-3 text-3xl font-black">{value}</p></div>; }
