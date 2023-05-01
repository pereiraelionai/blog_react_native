import styles from "./Login.module.css";
import { useAuthentication } from "../../hooks/Authentication";

import {useState, useEffect} from 'react';

const Login = () => {
  const [displayEmail, setDisplayEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const {login, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayEmail,
      password
    }

    const res = await login(user);

    console.log(res);
    
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input type="email" name="displayEmail" required placeholder="Email do usuário" value={displayEmail} onChange={(e) => setDisplayEmail(e.target.value)}/>
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name="displayPassword" required placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {!loading && <button className="btn">Entrar</button>}
          {loading && <button className="btn" disabled>Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Login