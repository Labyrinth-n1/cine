import "../css/Home.scss"
import 'primereact/resources/themes/lara-dark-blue/theme.css'; // Thème (vous pouvez en choisir un autre)
import 'primereact/resources/primereact.min.css'; // Styles généraux de PrimeReact
import 'primeicons/primeicons.css'; // Icônes de PrimeIcons (nécessaire pour les icônes)

import { Link } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


function Home()
{
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
            </ul> 
            
          </div>

          <div className="Home-Search">
            
              <InputText className="Home-Search-Input" placeholder="Find a movie" />
              <Button  icon="pi pi-search" className="Home-Search-Button p-button-warning" />
            
          </div>
          
          <div className="Home-Welcome">
             <h1 className="Home-Welcome-Title">Découvrez les films les mieux notés et donnez vos avis sur les films que vous avez déjà regardés !!</h1>
          </div>

          <div className="carrousel">

          </div>

          <div className="Home-Start">
              <Link to="/signup">
                  <Button iconPos="right" icon="pi pi-angle-right" className="Home-Start-Button"  label="Continue"  />
              </Link>
              
          </div> 
        <div className="Home-Left">

        </div>
      </div>
   )
}

export default Home