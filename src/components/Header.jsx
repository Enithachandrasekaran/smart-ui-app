const Header = () => {
  return (
    <div className="header">
      <input type="text" placeholder="Search" className="search" />

      <div className="header-right">
    
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="profile"
        />
      </div>
    </div>
  );
};

export default Header;
