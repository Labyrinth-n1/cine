// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cine-2-0tdi.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocke le token et les données de l'utilisateur
        localStorage.setItem('token', data.token); // Stocke le token
        localStorage.setItem('lastName', data.lastName); // Stocke le nom
        localStorage.setItem('firstName', data.firstName); // Stocke le prénom
        localStorage.setItem('role', data.role); // Stocke le rôle de l'utilisateur (admin ou user)

        // Redirige l'utilisateur en fonction de son rôle
        if (data.role === 'admin') {
          navigate('/admin/dashboard'); // Redirige vers le tableau de bord admin
        } else {
          navigate('/reviews'); // Redirige vers la page des avis pour un utilisateur normal
        }
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      setError('Erreur de connexion avec le serveur');
    }
  };

  return (
    <div className="container">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="Home-Nav">

<div className="Home-Nav-Logo">
    <h2>AVIS<strong style={{color:'#aa0f0f'}}>CINE</strong></h2>
</div>


<ul className="Home-Nav-Links">
    <li className="Home-Nav-Links-li"><Link to="/">Home</Link></li>
    
    <li className="Home-Nav-Links-li"><Link to="/reviews">Films</Link></li>
    <li className="Home-Nav-Links-li"><Link to="/signup">Inscription</Link></li>
    <li className="Home-Nav-Links-li"><Link to="/login">Connexion</Link></li>
</ul> 

</div>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
      
        <Button label="Se connecter" />
        <p style={{position:'relative', bottom:'-10px'}}>Pas encore inscrit ? </p>
        <Link className="link" to="/signup">
          <Button label="S'inscrire" />
        </Link>
      </form>


    </div>
  );
};

export default Login;
