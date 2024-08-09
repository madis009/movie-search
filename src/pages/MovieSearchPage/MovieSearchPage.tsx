import React, { useState } from 'react';
import useMovieSearch, { SearchParams } from '../../hooks/useMovieSearch';
import './styles/MovieSearchPage.scss';
import { Input, MovieCard, Button } from '../../components'; // Import Button here

const MovieSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        query: '',
        include_adult: false,
        language: 'en-US',
        page: 1,
        primary_release_year: '',
        region: '',
        year: ''
    });

    const { movies, loading, error, searchMovies } = useMovieSearch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSearch = () => {
        if (searchParams.query.trim()) {
            searchMovies(searchParams);
        }
    };

    return (
        <div className="page-container">
            <div className='search-container'>
                <h1>Movie Search</h1>
                <Input
                    type="text"
                    name="query"
                    value={searchParams.query}
                    onChange={handleInputChange}
                    placeholder="Enter a movie title..."
                    label="Movie Title"
                />
                <Input
                    type="select"
                    name="language"
                    value={searchParams.language ?? ''}
                    onChange={handleInputChange}
                    options={[
                        { label: 'English (US)', value: 'en-US' },
                        { label: 'Spanish (ES)', value: 'es-ES' },
                        { label: 'French (FR)', value: 'fr-FR' }
                    ]}
                    label="Language"
                />
                <Input
                    type="text"
                    name="primary_release_year"
                    value={searchParams.primary_release_year ?? ''}
                    onChange={handleInputChange}
                    placeholder="Primary Release Year"
                    label="Release Year"
                />
                <Input
                    type="text"
                    name="year"
                    value={searchParams.year ?? ''}
                    onChange={handleInputChange}
                    placeholder="Year"
                    label="Year"
                />
                <Input
                    type="text"
                    name="region"
                    value={searchParams.region ?? ''}
                    onChange={handleInputChange}
                    placeholder="Region (e.g., US)"
                    label="Region"
                />
                <Input
                    type="select"
                    name="include_adult"
                    value={String(searchParams.include_adult)}
                    onChange={handleInputChange}
                    options={[
                        { label: 'No', value: 'false' },
                        { label: 'Yes', value: 'true' }
                    ]}
                    label="Include Adult Content"
                />
                <Button onClick={handleSearch} className="search-button">Search</Button>
            </div>
            {!(loading || error) && (
                <div className='movies-container'>
                    {movies.map(movie => (
                        <div key={movie.id} className='movie'>
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                    {movies.length === 0 && !loading && !error && (
                        <div className='no-movies-message'>No movies found</div>
                    )}
                </div>
            )}
            {(loading || error) && (
                <div className="loading-error">
                    <div>
                        {loading && <div className="loading">Loading...</div>}
                        {error && <div className="error-message">{error}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieSearchPage;
