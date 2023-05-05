import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

//hooks
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeletetDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {
  const {user} = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);

  const {deleteDocument} = useDeletetDocument('posts');

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não forma encontrados posts</p>
            <Link to='/posts/create' class='btn'>Criar primeiro post!</Link>
          </div>
        ) : (
          <>
            <div className={styles.post_head}>
              <span>Título</span>
              <span>Ações</span>
            </div>

            {posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div>
                <Link to={`/post/${post.id}`} className='btn btn-outline'>Ver</Link>
                <Link to={`/post/edit/${post.id}`} className='btn btn-outline'>Editar</Link>
                <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>Excluir</button>
              </div>
            </div>)}

          </>

        )}
    </div>
  )
}

export default Dashboard