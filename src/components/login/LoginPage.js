import React from 'react';
import { connect } from 'react-redux';

import { doGoogleLoginAction } from '../../redux/ducks';
import styles from './login.module.css'

function LoginPage({ loggedIn, fetching, doGoogleLoginAction }) {
  const doLogin = () => {
    doGoogleLoginAction()
  }

  if (fetching) return <h2>Loading...</h2>
  return (
    <div className={styles.container}>
    { !loggedIn ? 
      <div>
        <h1>
            Inicia Sesión con Google
        </h1>
        <button onClick={doLogin}>
            Iniciar
        </button>
      </div>
      :
      <div>
        <h1>
            Cierra tu sesión
        </h1>
        <button>
            Cerrar Sesión
        </button>
      </div>
    }
    </div>
  )
}

const mapStateToProps = ({ user: {loggedIn, fetching} }) => {
  return {
    fetching,
    loggedIn
  }
}

export default connect(mapStateToProps, { doGoogleLoginAction })(LoginPage);

