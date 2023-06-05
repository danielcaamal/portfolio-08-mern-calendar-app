import { useAuthStore } from "../../hooks";
import { useMemo } from 'react';


export const Navbar = () => {
  const { startLogout, user } = useAuthStore();
  const onLogout = async () => {
    await startLogout();
  };

  const username = useMemo(() => {
    return `${user?.fullName} (${user?.email})`;
  }, [user]);

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        CalendarApp
      </span>

      <>
        <span className="navbar-text">
          <i className="fas fa-user"></i>
          &nbsp;
          &nbsp;
          <span>{ username }</span>
        </span>
      </>

      <button 
        className="btn btn-outline-danger"
        type="button"
        title="Logout"
        onClick={onLogout}
        >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        logout
      </button>
    </div>
  );
};