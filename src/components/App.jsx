import React, { useState, useEffect } from 'react';
import { getApiResponse } from 'pixabayApi/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Image from './Image';
import Loader from './Loader';
import css from './App.module.css';

function App() {
  const [searchString, setSearchString] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function updateGallery() {
      if (searchString.trim() === '') { // Перевірка на пустий пошуковий рядок
        setGallery([]);
        setTotalPages(1);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getApiResponse(searchString, currentPage);

        if (response.totalHits === 0) {
          alert(`Images by your request "${searchString}" did not found`);
          return;
        }

        setGallery(prevGallery => [...prevGallery, ...response.hits]);
        setTotalPages(Math.ceil(response.totalHits / response.hitsPerPage));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    updateGallery();
  }, [searchString, currentPage]);

  const loadNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const getSearchString = value => {
    const trimmedSearchString = value.searchString.trim();
    if (searchString !== trimmedSearchString) {
      setSearchString(trimmedSearchString);
      setGallery([]);
      setCurrentPage(1);
      setError(null);
    } else {
      alert(`You are actually looking at "${trimmedSearchString}" pictures`);
    }
  };

  const openModal = ({ largeImageURL, tags }) => {
    setIsModalOpen(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageURL(null);
    setTags(null);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={getSearchString} />

      {isLoading && <Loader />}

      {gallery.length > 0 && (
        <>
          <ImageGallery gallery={gallery} onClick={openModal} />

          {currentPage < totalPages && (
            <Button onClick={loadNextPage}>Load More</Button>
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Image URL={largeImageURL} tags={tags} />
        </Modal>
      )}

      {error && <p>An error occurred: {error.message}</p>}
    </div>
  );
}

export default App;
