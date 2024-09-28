
import { ChartPie, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Sidebar() {

  const navigate = useNavigate();

  const logout=()=>{
    localStorage.setItem('token','');
    navigate('/login');
  }

  return (
    <div className="w-64 h-auto bg-gradient-to-r to-violet-800 from-violet-700 text-white shadow-lg flex flex-col relative">
      <div className="flex items-center justify-center py-10">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex flex-col p-4 space-y-2 text-lg">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? 'bg-violet-500 p-2 rounded-md text-white font-semibold flex items-center gap-2  transition-all'
              : 'hover:bg-violet-500 p-2 rounded-md text-white font-semibold flex items-center gap-2  transition-all'
          }
        >
          <div>Users</div>
          <Users className='h-5 w-5 text-white'/>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? 'bg-violet-500 p-2 rounded-md text-white font-semibold flex items-center gap-2 transition-all'
              : 'hover:bg-violet-500 p-2 rounded-md text-white font-semibold flex items-center gap-2 transition-all'
          }
        >
          <div>Analytics</div>
          <ChartPie className='h-5 w-5 text-white'/>
        </NavLink>

        <button onClick={logout} className='bg-violet-500 p-2 rounded-md text-white font-semibold flex items-center justify-center gap-2 transition-all w-[86%] absolute bottom-4 text-center'>Logout</button>
      </nav>

    </div>
  );
}

export default Sidebar;
