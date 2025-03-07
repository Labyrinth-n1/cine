import '../css/Home.scss'

function About() {
  return (


    <>
<div className='Home'>


<div className="Home-Nav">

<div className="Home-Nav-Logo">
    <h2>AVIS<strong style={{color:'#aa0f0f'}}>CINE</strong></h2>
</div>


<ul className="Home-Nav-Links">
    <li className="Home-Nav-Links-li"><a href="/">Home</a></li>
    
    <li className="Home-Nav-Links-li"><a href="/reviews">Films</a></li>
    <li className="Home-Nav-Links-li"><a href="/about">A propos</a></li>
    <li className="Home-Nav-Links-li"><a href="/contact">Contact</a></li>
</ul> 

</div>


    <div style={{fontFamily:'Montserrat', padding:'5rem', zIndex:'9999'}}>
      

Bienvenue sur AvisCine , votre destination de référence pour des critiques de films authentiques et passionnées ! Nous sommes un groupe de cinéphiles et de développeurs dédiés à offrir une plateforme intuitive et moderne permettant à chacun d'exprimer son avis sur ses films préférés.

Qui sommes-nous ?

Nous sommes une équipe de passionnés d'IA, rassemblés autour d'une idée simple !!

Notre mission est de proposer une plateforme simple et esthétiquement plaisante où vous pouvez :

Noter des films selon votre expérience personnelle.

Partager vos avis et découvrir ceux des autres spectateurs.

Explorer des critiques honnêtes et variées. <br /> <br />

Comment fonctionne notre système de notation ?

Nous utilisons un modèle basé sur les avis des utilisateurs pour fournir une évaluation fiable et pertinente des films. Voici comment cela fonctionne :

Notation en étoiles (1 à 5) : Chaque utilisateur peut attribuer une note à un film, allant de 1 étoile (à éviter) à 5 étoiles (chef-d'œuvre).

Avis textuels : En plus de la note, les utilisateurs peuvent laisser un commentaire expliquant leur ressenti.

Analyse des tendances : Les films les mieux notés et les plus discutés sont mis en avant sur la plateforme.

Notre vision

Nous souhaitons faire de [Nom du Site] une référence incontournable pour les amateurs de films. Que vous soyez cinéphile averti ou simple curieux, notre plateforme est conçue pour vous permettre d'explorer, de partager et de découvrir de nouveaux films selon vos préférences.

Rejoignez-nous et faites partie de cette aventure cinématographique ! 🎥🍿
    </div>
    </div>

    </>
  );
}

export default About;