import "../css/Home.scss";
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";
import axios from 'axios';

function Reviews() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  interface Movie {
    _id: string;
    title: string;
    description: string;
    date: string;
    stars: number;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('lastName');
    const storedFirstName = localStorage.getItem('firstName');

    if (!storedFirstName || !storedName) {
      navigate('/login');
    } else {
      setFirstName(storedFirstName);
      setLastName(storedName);
    }

    const fetchMovies = async () => {
      try {
        const res = await axios.get('https://cine-2-0tdi.onrender.com/api/movies');
        setMovies(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des films', err);
        setError('Erreur lors de la récupération des films');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [navigate]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Home">
      <div className="Home-Nav">

<div className="Home-Nav-Logo">
    <h2>AVIS<strong style={{color:'#aa0f0f'}}>CINE</strong></h2>
</div>


<ul className="Home-Nav-Links">
    <li className="Home-Nav-Links-li"><Link to="/">Home</Link></li>
    
    <li className="Home-Nav-Links-li"><Link to="/reviews">Films</Link></li>
    <li className="Home-Nav-Links-li"><Link to="/signup">Inscription</Link></li>
    <li className="Home-Nav-Links-li"><Link to="/login">Connexion</Link></li>
    <li>{firstName[0]} {lastName[0]}</li>
</ul> 

</div>

      <div className="Home-Search">
        <InputText
          className="Home-Search-Input"
          placeholder="Find a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button icon="pi pi-search" className="Home-Search-Button p-button-warning" />
      </div>

      {loading ? (
        <p>Chargement des films...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="carousel">
          {filteredMovies.map((movie) => (
            <Link to={`/movie/${movie._id}`} key={movie._id}>
            <div className="card" style={{ padding: '2rem', margin: '20px', borderRadius: '5px', height: '50vh' }}>
              <h3>{movie.title}</h3>
              <p>{movie.date}</p>
              <Rating value={movie.stars} cancel={false} readOnly />
            </div>
          </Link>
          
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
