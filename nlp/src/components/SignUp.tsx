// src/pages/SignUp.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/Home.scss';
import { Button } from "primereact/button";

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(''); // Code admin (facultatif)
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Construire les données utilisateur
    const userData: any = { firstName, lastName, email, password };
    if (code) userData.code = code; // Ajouter le code uniquement s'il est rempli

    try {
        const response = await fetch('https://cine-2-0tdi.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            setError('');
            navigate('/login'); // Redirection vers la page de connexion après inscription
        } else {
            // Si le code est incorrect ou une autre erreur
            setError(data.message || 'Erreur de serveur');
        }
    } catch (err) {
        setError('Erreur de connexion avec le serveur');
    }
};

  return (
    <div className="container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

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
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
        </div>
        <div>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
        </div>
        <div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
        </div>
        <div>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code secret Admin ( Facultatif )" />
        </div>
    
        
        <Button label="S'inscrire" />
        <p style={{position:'relative', bottom:'-10px'}}>Vous avez déjà un compte ? </p>
        <Link className="link" to="/login">
            <Button label="Se connecter" />
        </Link>
      </form>

    </div>
  );
};

export default SignUp;
