// src/components/PredictForm.tsx
import React, { useState } from 'react';

const PredictForm = () => {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState<{ score_0: number; score_1: number } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data);
        setError('');
      } else {
        setError('Erreur de prédiction : ' + (data.detail ? data.detail.map((item: any) => item.msg).join(', ') : ''));
        setPrediction(null);
      }
    } catch (err) {
      setError('Erreur de connexion avec le serveur');
      setPrediction(null);
    }
  };

  return (
    <div>
      <h2>Prédiction de texte</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Entrez votre texte ici..."
          rows={4}
          cols={50}
          required
        ></textarea>
        <br />
        <button type="submit">Soumettre</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction && (
        <div>
          <h3>Résultats de la prédiction</h3>
          <p>Score 0 : {prediction.score_0}</p>
          <p>Score 1 : {prediction.score_1}</p>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
