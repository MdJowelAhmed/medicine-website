import { Outlet, NavLink, Link } from 'react-router';
import logo from '../assets/medimart.png'; // adjust path if needed

const UserDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-400 shadow-md p-6 space-y-4">
        <Link to='/'>
          <img className='w-40 rounded' src={logo} alt="" />
        </Link>
        <nav className="space-y-2">
          <NavLink
            to="/user/payment-history"
            end
            className={({ isActive }) =>
              isActive
                ? 'block p-2 rounded bg-gray-600 text-white font-semibold'
                : 'block p-2 rounded hover:bg-gray-300 text-gray-700'
            }
          >
            Payment History
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
