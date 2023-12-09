import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'));
      setMovies(state.movies);
      setHeroImage(state.heroImage);
      setLoading(state.loading);
      setCurrentPage(state.currentPage);
      setTotalPages(state.totalPages);
    } else {
      setLoading(true);
      const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&page=1`;
      fetchItems(endpoint);
    }
  }, []);

  const searchItems = (searchTerm) => {
    let endpoint = '';
    setSearchTerm(searchTerm);
    setLoading(true);

    if (searchTerm === '') {
      endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&page=1`;
    } else {
      endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
    }

    fetchItems(endpoint);
  };

  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);

    if (searchTerm === '') {
      endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${currentPage + 1}`;
    }

    fetchItems(endpoint);
  };

  const fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
        .then((result) => {
        setMovies([ ...result.results]);
        setHeroImage(result.results[0] || heroImage );
        setLoading(false);
        setCurrentPage(result.page);
        setTotalPages(result.total_pages);

        if (searchTerm === '') {
          localStorage.setItem(
            'HomeState',
            JSON.stringify({
              movies: [...movies, ...result.results],
              heroImage: heroImage || result.results[0],
              loading: false,
              currentPage: result.page,
              totalPages: result.total_pages,
            })
          );
        }
      });
  };

  return (
    <div className="rmdb-home">
      {heroImage ? (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            title={heroImage.original_title}
            text={heroImage.overview}
          />
          <SearchBar callback={searchItems} />
        </div>
      ) : null}
      <div className="rmdb-home-grid">
        <FourColGrid header={searchTerm ? 'Search Result' : 'Popular Movies'} loading={loading}>
          {movies.map((element, i) => (
            <MovieThumb
              key={i}
              clickable={true}
              image={
                element.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`
                  : './images/no_image.jpg'
              }
              movieId={element.id}
              movieName={element.original_title}
            />
          ))}
        </FourColGrid>
        {loading ? <Spinner /> : null}
        {currentPage <= totalPages && !loading ? (
          <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
