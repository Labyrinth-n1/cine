import { useState } from 'react';
import { Button } from 'primereact/button';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(0);
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Construire les données du film
    const movieData = { title, description, stars, date, image };

    try {
        const response = await fetch('http://localhost:3000/api/addMovie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieData),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccessMessage('Film ajouté avec succès');
            setError('');
        } else {
            setError(data.message || 'Erreur du serveur');
        }
    } catch (err) {
        setError('Erreur de connexion avec le serveur');
    }
};

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre du film" required />
        </div>
        <div>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        </div>
        <div>
          <input type="number" value={stars} onChange={(e) => setStars(Number(e.target.value))} placeholder="Étoiles" required />
        </div>
        <div>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" required />
        </div>
        <div>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
        </div>
    
        <Button label="Ajouter un film" />
      </form>
    </div>
  );
};

export default AddMovie;
