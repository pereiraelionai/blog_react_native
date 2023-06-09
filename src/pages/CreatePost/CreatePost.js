import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const {user} = useAuthValue();

  const {insertDocument, response} = useInsertDocument("posts");

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

    insertDocument({
      title, 
      image, 
      body, 
      tagsArray,
      uid: user.uid,
      createBy: user.displayName
    })

    //redirect home page
    navigate('/');

  }

  return (
    <div className={styles.createpost}>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input type="text" name='title' placeholder='Pense em um bom título' required value={title} onChange={(e) => setTitle(e.target.value)}/>
          </label>
          <label>
            <span>URL da imagem:</span>
            <input type="text" name='image' placeholder='Insira uma imagem que representa o seu post' required value={image} onChange={(e) => setImage(e.target.value)}/>
          </label>   
          <label>
            <span>Conteúdo:</span>
            <textarea name='body' placeholder='Insira o conteúdo do post' required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          </label>  
          <label>
            <span>Tags:</span>
            <input type="text" name='tags' placeholder='Insira as tags separadas por virgula' required value={tags} onChange={(e) => setTags(e.target.value)}/>
          </label>     
          {!response.loading && <button className="btn">Postar</button>}
          {response.loading && <button className="btn" disabled>Aguarde...</button>}
          {response.error && <p className="error">{response.error}</p>}                      
          {formError && <p className="error">{formError}</p>}                      
        </form>
    </div>
  )
}

export default CreatePost