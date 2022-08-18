import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { loginName, loginBtnState, ifLoginChange, ifLoginClick } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="loginName">
            Nome
            <input
              name="LoginName"
              data-testid="login-name-input"
              onChange={ ifLoginChange }
              value={ loginName }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ loginBtnState }
            onClick={ ifLoginClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  ifLoginClick: PropTypes.func.isRequired,
  loginName: PropTypes.string.isRequired,
  ifLoginChange: PropTypes.func.isRequired,
  loginBtnState: PropTypes.bool.isRequired,
};

export default Login;
