
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Reviews from './components/Reviews'
import Login from './components/Login'
import SignUp from './components/SignUp'
import MovieDetail from './components/MovieDetails'
import AdminDashboard from './components/AdminDashboard'
import AddMovie from './components/addMovies'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  

  return (

    <>
       
       <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Reviews />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/movie/:id" element={<MovieDetail />} /> {/* Route pour afficher les détails du film */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
       </Router>
    </>
  )
}

export default App
