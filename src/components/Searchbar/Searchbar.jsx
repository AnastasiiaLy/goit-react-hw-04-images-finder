import React, { useState } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

const SearchBar = ({ onSubmit }) => {
  const [imagesName, setImagesName] = useState('');

  const handleNameChange = event => {
    setImagesName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imagesName.trim() === '') {
      Notiflix.Notify.failure('Please enter your name of the image');
      return;
    }

    onSubmit(imagesName);
    setImagesName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className="button-label">
            <BsSearchHeart />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imagesName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

export default SearchBar;
