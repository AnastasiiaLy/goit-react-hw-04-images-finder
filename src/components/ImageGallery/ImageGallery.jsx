import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import { ThreeDots } from 'react-loader-spinner';
import css from './ImageGallery.module.css';

const ImageGallery = ({
  imagesArray,
  error,
  status,
  hits,
  totalHits,
  onLoadMore,
}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const openModal = selectedPic => {
    setSelectedImage(selectedPic);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  if (status === 'pending') {
    return <ThreeDots color="#ba90c6" className={css.loader} />;
  }

  if (status === 'rejected') {
    return <h1>{error && error.message}</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={css.gallery}>
          {imagesArray.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={openModal}
            />
          ))}
        </ul>
        {showModal && (
          <Modal selectedImage={selectedImage} closeModal={onCloseModal} />
        )}

        {hits < totalHits && (
          <button
            type="button"
            onClick={onLoadMore}
            className={css.LoadMoreBtn}
          >
            Load More
          </button>
        )}

        {hits >= totalHits && imagesArray.length > 0 && (
          <p className={css.noImagesNotify}>There are no more images</p>
        )}
      </>
    );
  }

  return null;
};

ImageGallery.propTypes = {
  imagesArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.object,
  status: PropTypes.oneOf(['idle', 'pending', 'rejected', 'resolved'])
    .isRequired,
  hits: PropTypes.number.isRequired,
  totalHits: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default ImageGallery;
