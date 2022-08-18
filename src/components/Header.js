import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      load: true,
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const user = await getUser();
    this.setState({
      user: user.name,
      load: false,
    });
  }

  render() {
    const { user, load } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {load ? <Load /> : (
          <>
            <p data-testid="header-user-name">{user}</p>
            <div>
              <Link to="/search" data-testid="link-to-search" className="link">
                Search
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites" className="link">
                Favorites
              </Link>
              <Link to="/profile" data-testid="link-to-profile" className="link">
                Profile
              </Link>
            </div>
          </>
        )}
      </header>
    );
  }
}

export default Header;
