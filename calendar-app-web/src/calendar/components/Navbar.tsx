

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        Calendar
      </span>

      <button 
        className="btn btn-outline-danger"
        type="button"
        title="Logout"
        >
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        logout
      </button>
    </div>
  );
};