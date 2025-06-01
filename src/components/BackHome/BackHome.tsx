import { Link } from 'react-router-dom';

import './BackHome.css';

const BackHome = () => {
  return (
    <div className="back-home">
      <Link to="/">
        <h3>Home</h3>
      </Link>
    </div>
  );
};

export default BackHome;
