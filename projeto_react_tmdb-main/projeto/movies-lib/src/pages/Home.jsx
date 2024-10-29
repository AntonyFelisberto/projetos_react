import { useState,useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import './MovieGrid.css'
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const headerConfig = {
    headers : {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`
    }
}

const Home = () => {
    const [topMovies, setTopMovies] = useState([])

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url,headerConfig);
        const data = await res.json();

        setTopMovies(data.results)
    }

    useEffect(() =>{        
        const topRatedUrl = `${moviesUrl}top_rated`
        getTopRatedMovies(topRatedUrl)
    },[])

    return <div>
                <div className="container">
                    <h2 className="title">Melhores Filmes</h2>
                    <div className="movies-container">
                        {topMovies.length === 0 && <p>Carregando...</p>}
                        {topMovies.length > 0 && topMovies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
                    </div>
                </div>
            </div>;
}

export default Home;