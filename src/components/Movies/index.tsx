
import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Movie from './Movie'
import './style.css'

type Props = {
    movies: any
    setMovies: any
    setTempMovies: any
}

type Movie = {
	imdbID: string
	title: string
	image: string
	year: string
}


const API_KEY = 'e4842b36'
const series = ['avengers', 'fast and furious', 'iron man', 'harry potter']

const Movies: React.FC<Props> = props => {
    useEffect(() => {
        const allMovies = series.map((series => {
            return fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(series)}&apikey=${API_KEY}&page=1`)
            .then(res => res.json())
        }))

        Promise.all(allMovies).then((movies: any) => {
       

            const updatedMovies: Movie[] = movies.map((movie: any) => movie.Search).flat(2).map((movie: any) => ({
                title: movie.Title,
                year: movie.Year,
                image: movie.Poster,
                imdb: movie.imdbID
            }))
            props.setMovies(updatedMovies)
            props.setTempMovies(updatedMovies)
        })
    }, [])

    if(props.movies.length === 0) {
        return <div className="loader">
            <CircularProgress /> 

        </div>
    }

    return (
        <div className='movies'>
            {props.movies.map((movie: Movie) => {
                return <Movie 
                            key={movie.imdbID}
                            title={movie.title}
                            year={movie.year}
                            image={movie.image}
                />
            })
            }
        </div>
    )
}

export default Movies