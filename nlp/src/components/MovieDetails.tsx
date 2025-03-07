import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rating } from 'primereact/rating';
import axios from 'axios';

interface Movie {
  id: string;
  title: string;
  description: string;
  stars: number;
  date: string;
  image: string;
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/movies/${id}`);
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération du film', err);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des commentaires', err);
      }
    };

    fetchMovie();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Assurez-vous que l'ID est stocké après la connexion
    if (newComment.trim() && userId) {
      try {
        const res = await axios.post('http://localhost:5000/api/comments', {
          movieId: id,
          userId: userId,  // Utilisation de l'ID de l'utilisateur
          text: newComment,
        });
        setComments([...comments, res.data]);
        setNewComment('');
      } catch (err) {
        console.error('Erreur lors de l\'ajout du commentaire', err);
      }
    } else {
      console.log('Utilisateur non connecté ou commentaire vide');
    }
  };
  
  
  
  if (loading) return <div>Chargement...</div>;

  if (!movie) return <div>Film non trouvé</div>;

  return (
    <div>

      <div style={{display:'flex', alignItems:'center', justifyContent:'center',fontFamily:'Montserrat', padding:'2rem', height:'100vh'}} className="user">
        <img  style={{height:'400px'}}src={movie.image} alt="" />

      <div style={{padding:'2rem'}} className="details">
        <h2>{movie.title}</h2>
      <p style={{width:'300px'}}>{movie.description}</p>
      <Rating value={movie.stars} cancel={false} readOnly /> <br /> <br />

      <div>
        <h3>Commentaires</h3>
        {comments.map((comment: any) => (
  <div key={comment._id}>
    <strong>{comment.userId?.firstName} {comment.userId?.lastName} :</strong>
    <p>{comment.text}</p>
  </div>
))}

      </div>

      <div>
        <textarea
        style={{ width:'300px', border:'none',borderBottom:'1px solid #aa0f0f', fontFamily:'Montserrat'}}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajoutez un commentaire"
        /> <br />
        <button style={{padding:'.7rem', fontFamily:'Montserrat', border:'none', backgroundColor:'#aa0f0f', borderRadius:'2px'}} onClick={handleCommentSubmit}>Poster un commentaire</button>
      </div>

      </div>


      
      </div>
      
      
    </div>
  );
};

export default MovieDetail;
