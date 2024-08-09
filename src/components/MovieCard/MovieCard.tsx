import React from "react";
import './MovieCard.scss';

interface MovieCardPros {
    movie: any;
}

const MovieCard : React.FC<MovieCardPros> = ({movie}) => {
    return (
        <>
            {movie.poster_path && (
                <div className="image-box">
                    <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                    />
                </div>
            )}
            <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-description">
                    <p>{movie.overview}</p>
                </div>
            </div>
        </>
    );
}

export default MovieCard;