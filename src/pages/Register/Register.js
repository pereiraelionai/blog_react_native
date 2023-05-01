import { useAuthentication } from "../../hooks/Authentication";
import styles from "./Register.module.css"

import {useState, useEffect} from 'react';

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayEmail, setDisplayEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName, 
      displayEmail,
      password
    }

    if(password != confirmPassword) {
      setError('As senhas precisam ser iguais!');
      return
    }

    const res = await createUser(user);

    console.log(res);
    
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError]);


  return (
    <div className={styles.register}>
        <h1>Cadastra-se para postar!</h1>
        <p>Crie seu usuário e compartilhe suas historias</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input type="text" name="displayName" required placeholder="Nome do usuário" value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
          </label>
          <label>
            <span>Email:</span>
            <input type="email" name="displayEmail" required placeholder="Email do usuário" value={displayEmail} onChange={(e) => setDisplayEmail(e.target.value)}/>
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name="displayPassword" required placeholder="Insira sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            <span>Confirme a senha:</span>
            <input type="password" name="displayConfirmPassword" required placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </label>
          {!loading && <button className="btn">Cadastrar</button>}
          {loading && <button className="btn" disabled>Aguarde...</button>}
          {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register