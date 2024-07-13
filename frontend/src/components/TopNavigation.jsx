import { useState, useEffect } from 'react';

const TopNavigation = () => {
  const [auth, setAuth] = useState(null);

  const handleOutput = () => {
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('userId');
    setAuth(JSON.parse(savedUser));
  }, []);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {auth ?? <button onClick={handleOutput} type="button" className="btn btn-primary">Выйти</button>}
      </div>
    </nav>
  );
};

export default TopNavigation;
