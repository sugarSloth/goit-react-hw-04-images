import React, { Component } from 'react';
import { getApiResponse, requestParameters } from 'pixabayApi/pixabay-api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Image from './Image';
import Loader from './Loader';
import css from './App.module.css';

class App extends Component {
  state = {
    searchString: '',
    gallery: [],
    isLoading: false,
    error: null,
    isModalOpen: false,
    page: 1, // Додано: Стан для сторінки
  };

  async componentDidUpdate(_, prevState) {
    const { searchString, page } = this.state;

    if (prevState.searchString !== searchString || prevState.page !== page) {
      this.setState({ isLoading: true });
      this.updateGallery(searchString, page);
    }
  }

  loadNextPage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1, // Оновлення значення стану сторінки
    }));
  };

  updateGallery = (searchString, page) => {
    try {
      getApiResponse(searchString, page).then((response) => {
        if (response.totalHits === 0) {
          alert(`Images by your request "${searchString}" did not found`);
          return;
        } else {
          this.setState((prevState) => ({
            gallery: [...prevState.gallery, ...response.hits], // Додавання нових картинок до галереї
          }));
        }
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getSearchString = (value) => {
    if (this.state.searchString !== value.searchString) {
      this.setState({
        searchString: value.searchString,
        gallery: [],
        page: 1, // Скидання стану сторінки при новому пошуку
      });
    } else {
      alert(`You are actually looking at "${value.searchString}" pictures`);
    }
  };

  openModal = ({ largeImageURL, tags }) => {
    this.setState({ isModalOpen: true });
    this.setState({ largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    delete this.state.largeImageURL;
    delete this.state.tags;
  };

  render() {
    const { gallery, isLoading, isModalOpen, largeImageURL, tags } = this.state;
    const { getSearchString, loadNextPage, openModal, closeModal } = this;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={getSearchString} />

        {isLoading && requestParameters.page === 1 ? (
          <Loader />
        ) : (
          gallery.length > 0 && (
            <ImageGallery gallery={gallery} onClick={openModal} />
          )
        )}

        {requestParameters.page !== 1 &&
          (isLoading ? <Loader /> : <Button onClick={loadNextPage} />)}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <Image URL={largeImageURL} tags={tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
