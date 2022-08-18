import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Load from './components/Load';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loginBtnState: true,
      loginName: '',
      loadingUser: false,
      userLoged: false,
    };
  }

  renderSearch = async () => {
    const { loginName } = this.state;
    await createUser({ name: loginName });
    this.setState({
      loadingUser: false,
      loginName: '',
    });
  }

  ifLoginClick = (event) => {
    event.preventDefault();
    this.setState({
      loadingUser: true,
      userLoged: true,
    }, this.renderSearch);
  }

  ifLoginChange = ({ target: { value } }) => {
    const minCharacters = 2;
    if (value.length > minCharacters) {
      this.setState({
        loginBtnState: false,
        loginName: value,
      });
    } else {
      this.setState({
        loginBtnState: true,
        loginName: value,
      });
    }
  }

  render() {
    const { loginBtnState, loadingUser, loginName, userLoged } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {userLoged
              ? <Redirect to="/search" />
              : (
                <Login
                  ifLoginClick={ this.ifLoginClick }
                  ifLoginChange={ this.ifLoginChange }
                  loginBtnState={ loginBtnState }
                  loginName={ loginName }
                />
              )}
          </Route>
          <Route exact path="/search">
            {loadingUser
              ? <Load />
              : <Search />}
          </Route>
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
