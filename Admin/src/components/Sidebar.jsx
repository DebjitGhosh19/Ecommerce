import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-13 z-20 flex h-screen w-[1/10] flex-col items-center justify-start gap-3 bg-linear-to-b from-slate-900 to-slate-800 p-2 text-white shadow-[2px_0_14px_rgba(0,0,0,0.15)] sm:sticky sm:top-0 sm:h-screen sm:w-[18%] sm:min-w-[180px] sm:max-w-[220px] sm:justify-start sm:gap-6 sm:p-4 lg:w-[18%]">
      <nav className="flex w-full flex-col items-center justify-start gap-2 sm:items-stretch">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex w-full items-center justify-center gap-2 rounded-xl border px-2 py-2.5 font-semibold transition-all duration-200 sm:justify-start sm:gap-3 sm:px-3 sm:py-3 ${
              isActive
                ? 'border-white/20 bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                : 'border-transparent bg-white/5 text-slate-300 hover:-translate-x-0.5 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          <span className="flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 text-base">＋</span>
          <span className="hidden truncate text-[10px] whitespace-nowrap sm:inline sm:text-sm">Add Item</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex w-full items-center justify-center gap-2 rounded-xl border px-2 py-2.5 font-semibold transition-all duration-200 sm:justify-start sm:gap-3 sm:px-3 sm:py-3 ${
              isActive
                ? 'border-white/20 bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                : 'border-transparent bg-white/5 text-slate-300 hover:-translate-x-0.5 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          <span className="flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 text-base">▣</span>
          <span className="hidden truncate text-[10px] whitespace-nowrap sm:inline sm:text-sm">List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex w-full items-center justify-center gap-2 rounded-xl border px-2 py-2.5 font-semibold transition-all duration-200 sm:justify-start sm:gap-3 sm:px-3 sm:py-3 ${
              isActive
                ? 'border-white/20 bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                : 'border-transparent bg-white/5 text-slate-300 hover:-translate-x-0.5 hover:bg-white/10 hover:text-white'
            }`
          }
        >
          <span className="flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-white/15 text-base">🛒</span>
          <span className="hidden truncate text-[10px] whitespace-nowrap sm:inline sm:text-sm">Orders</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
