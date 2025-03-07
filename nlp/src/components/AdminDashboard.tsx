import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';  // Styles de base pour le cercle

import '../css/Home.scss';

const AdminDashboard = () => {
  const [value, setValue] = useState('');
  const [prediction, setPrediction] = useState<{ score_0: number; score_1: number } | null>(null);
  const [error, setError] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setError("Veuillez entrer un texte avant de soumettre.");
      return;
    }

    const requestBody = JSON.stringify({ text: value });

    try {
      console.log("📤 Envoi de la requête :", requestBody);

      const response = await fetch('http://localhost:3000/api/v1/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });

      const data = await response.json();
      console.log("📥 Réponse reçue :", data);

      if (response.ok) {
        setPrediction(data);
        setError('');
      } else {
        setError('Erreur de prédiction : ' + (data.error || 'Réponse invalide.'));
        setPrediction(null);
      }
    } catch (err) {
      console.error("❌ Erreur lors de la requête :", err);
      setError('Erreur de connexion avec le serveur.');
      setPrediction(null);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('lastName');
    const storedFirstName = localStorage.getItem('firstName');

    if (!storedFirstName || !storedName) {
      navigate('/login');
    } else {
      setFirstName(storedFirstName);
      setLastName(storedName);
    }
  }, [navigate]);

  // Calcul des pourcentages
  const positivePercentage = prediction ? (prediction.score_1 * 100).toFixed(2) : '0.00';
  const negativePercentage = prediction ? (prediction.score_0 * 100).toFixed(2) : '0.00';

  return (
    <div>
      <div className="Home-Nav">
        <div className="Home-Nav-Logo">
          <h2>AVIS<strong style={{ color: '#aa0f0f' }}>CINE</strong></h2>
        </div>
        <ul style={{ fontFamily: 'Montserrat' }} className="Home-Nav-Links">
          <li className="Home-Nav-Links-li"><a href="/">Dashboard</a></li>
          <li className="Home-Nav-Links-li"><a href="/admin/dashboard">Test-API</a></li>
        </ul>
      </div>

      <h1 style={{ fontFamily: 'Montserrat', textAlign: 'center' }}>Hey, Admin {firstName} {lastName}!</h1>
      <h2 style={{ textAlign: 'center', fontFamily: 'Montserrat', position: 'relative', bottom: '-50px' }}>Prédiction de sentiment</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Entrez votre texte ici..."
          rows={4}
          cols={50}
          style={{ fontFamily: 'Montserrat', padding: '2rem' }}
          required
        ></textarea>
        <br />
        <button type="submit">Soumettre</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction && (
        <div style={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
          <h3>Résultats</h3>
          <div style={{ display: 'inline-block', width: '150px', marginRight: '50px' }}>
            <p>Commentaire positif à {positivePercentage}%</p>
            <CircularProgressbar
              value={parseFloat(positivePercentage)}
              maxValue={100}
              text={`${positivePercentage}%`}
              styles={{
                path: { stroke: 'green' },
                text: { fill: 'green', fontSize: '16px' },
                trail: { stroke: '#d6d6d6' },
              }}
              strokeWidth={6} // Réduire l'épaisseur de la barre
              
            />
          </div>

          <div style={{ display: 'inline-block', width: '150px' }}>
            <p>Commentaire négatif à {negativePercentage}%</p>
            <CircularProgressbar
              value={parseFloat(negativePercentage)}
              maxValue={100}
              text={`${negativePercentage}%`}
              styles={{
                path: { stroke: '#ff4d4d' }, // Rouge clair pour négatif
                text: { fill: '#ff4d4d', fontSize: '16px' },
                trail: { stroke: '#d6d6d6' },
              }}
              strokeWidth={6} // Réduire l'épaisseur de la barre
            
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
