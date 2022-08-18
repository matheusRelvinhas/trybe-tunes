import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from '../components/Load';
import Header from '../components/Header';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      load: true,
      userData: {},
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
      userData: user,
    });
  }

  render() {
    const { user, load, userData: { name, email, image, description } } = this.state;
    return (
      <div>
        <Header />
        Profile
        {load
          ? <Load />
          : (
            <div data-testid="page-profile">
              <div>
                <img
                  src={ image }
                  data-testid="profile-image"
                  alt="imagem do usuário"
                />
              </div>
              <br />
              <Link to="profile/edit">
                Editar perfil
              </Link>
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
              <p>
                {`Usuário: ${user}`}
              </p>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
