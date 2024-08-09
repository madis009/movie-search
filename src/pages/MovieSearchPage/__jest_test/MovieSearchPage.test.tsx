import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MovieSearchPage from '../MovieSearchPage';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('MovieSearchPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should display movies when search is successful', async () => {
        const mockMovies = [
            {
                id: 1,
                title: 'Inception',
                overview: 'A mind-bending thriller',
                poster_path: '/inception.jpg',
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: { results: mockMovies } });

        render(<MovieSearchPage />);

        fireEvent.change(screen.getByPlaceholderText('Enter a movie title...'), { target: { value: 'Inception' } });
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => expect(screen.getByText('Inception')).toBeInTheDocument());
    });

    it('should display an error message when the API call fails', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('API error'));

        render(<MovieSearchPage />);

        fireEvent.change(screen.getByPlaceholderText('Enter a movie title...'), { target: { value: 'Inception' } });
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => expect(screen.getByText('Failed to fetch movies. Please try again.')).toBeInTheDocument());
    });

    it('should display no results message when no movies are found', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { results: [] } });

        render(<MovieSearchPage />);

        fireEvent.change(screen.getByPlaceholderText('Enter a movie title...'), { target: { value: 'Nonexistent Movie' } });
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => expect(screen.getByText('No movies found')).toBeInTheDocument());
    });
});
