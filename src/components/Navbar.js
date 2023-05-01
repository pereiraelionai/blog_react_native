import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../hooks/Authentication';
import { useAuthValue } from '../context/AuthContext';

const Navbar = () => {

    const {user} = useAuthValue();
    const {logOut} = useAuthentication();

  return (
    <nav className={style.navbar}>
        <NavLink className={style.brand} to="/">
            Mini <span>Blog</span>
        </NavLink>
        <ul className={style.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) => (isActive ? style.active : '')}>Home</NavLink>
            </li>
            {!user && (
                <>
                <li>
                    <NavLink to="/login" className={({isActive}) => (isActive ? style.active : '')}>Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive}) => (isActive ? style.active : '')}>Registrar-se</NavLink>
                </li>
                </>
            )}

            {user && (
                <>
                <li>
                    <NavLink to="/posts/create" className={({isActive}) => (isActive ? style.active : '')}>Novo Post</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => (isActive ? style.active : '')}>Dashboard</NavLink>
                </li>
                </>
            )}            
            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? style.active : '')}>Sobre</NavLink>
            </li>
            {user && (
                <>
                <li>
                    <button onClick={logOut}>Sair</button>
                </li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar