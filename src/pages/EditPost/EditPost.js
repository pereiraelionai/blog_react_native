import styles from './EditPost.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdatetDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument('posts', id);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body)

      const textTags = post.tagsArray.join(', ');

      setTags(textTags);
    }
  }, [post]);

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdatetDocument("posts");

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    //validate URL image
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    //create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //check all values

    if(!title || !image || !tags || !body) {
      setFormError('Preencha todos os campos!');
    }

    if(formError)  return;

    const data = {
      title, 
      image, 
      body, 
      tagsArray,
      uid: user.uid,
      createBy: user.displayName
    }

    updateDocument(id, data);

    //redirect home page
    navigate('/dashboard');

  }

  return (
    <div className={styles.editpost}>
      {post && (
        <>
          <h2>Editar post: {post.title}</h2>
          <p>Altere os dados do post como desejar!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name='title' placeholder='Pense em um bom título' required value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>
            <label>
              <span>URL da imagem:</span>
              <input type="text" name='image' placeholder='Insira uma imagem que representa o seu post' required value={image} onChange={(e) => setImage(e.target.value)}/>
            </label>   
            <p className={styles.preview_title}>Preview da imagem atual: </p>
            <img src={post.image} alt={post.title} className={styles.preview_image} />
            <label>
              <span>Conteúdo:</span>
              <textarea name='body' placeholder='Insira o conteúdo do post' required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </label>  
            <label>
              <span>Tags:</span>
              <input type="text" name='tags' placeholder='Insira as tags separadas por virgula' required value={tags} onChange={(e) => setTags(e.target.value)}/>
            </label>     
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && <button className="btn" disabled>Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}                      
            {formError && <p className="error">{formError}</p>}                      
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost