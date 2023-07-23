import React, { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from './App.module.css';

const App = () => {
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesName, setImagesName] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleSearchSubmit = searchTerm => {
    setImagesName(searchTerm);
    setImagesArray([]);
    setHits(0);
    setPage(1);
    setStatus('pending');
  };

  useEffect(() => {
    const fetchImages = () => {
      const KEY = '36895134-9b9dfb2f5d96a62d5aae70f5d';
      const fetchBaseLink = 'https://pixabay.com/api/';

      fetch(
        `${fetchBaseLink}?q=${imagesName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(data => {
          setImagesArray(prevImagesArray => [...prevImagesArray, ...data.hits]);
          setHits(prevHits => prevHits + data.hits.length);
          setTotalHits(data.totalHits);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };

    if (imagesName !== '' || page !== 1) {
      fetchImages();
    }
  }, [imagesName, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <SearchBar onSubmit={handleSearchSubmit} />
      <ImageGallery
        imagesArray={imagesArray}
        error={error}
        status={status}
        hits={hits}
        totalHits={totalHits}
        onLoadMore={loadMoreImages}
      />
    </div>
  );
};

export default App;
