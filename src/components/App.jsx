import { Component } from 'react';
import { getApiResponse } from 'pixabayApi/pixabay-api';
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
    currentPage: 1,
    totalPages: 1,
  };

  async componentDidUpdate(_, prevState) {
    const searchString = this.state.searchString;
    const { currentPage } = this.state;

    if (
      prevState.searchString !== searchString ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ isLoading: true });
      this.updateGallery(searchString, currentPage);
    }
  }

  loadNextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  updateGallery = async (searchString, page) => {
    try {
      const response = await getApiResponse(searchString, page);

      if (response.totalHits === 0) {
        alert(`Images by your request "${searchString}" did not found`);
        return;
      }

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...response.hits],
        totalPages: Math.ceil(response.totalHits / response.hitsPerPage),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getSearchString = value => {
    if (this.state.searchString !== value.searchString) {
      this.setState({
        searchString: value.searchString,
        gallery: [],
        page: 1,
      });
    } else {
      alert(`You are actually looking at "${value.searchString}" pictures`);
    }
  };

  openModal = ({ largeImageURL, tags }) => {
    this.setState({ isModalOpen: true, largeImageURL, tags });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, largeImageURL: null, tags: null });
  };

  render() {
    const {
      gallery,
      isLoading,
      isModalOpen,
      largeImageURL,
      tags,
      currentPage,
      totalPages,
    } = this.state;

    return (
  <div className={css.app}>
    <Searchbar onSubmit={this.getSearchString} />

    {isLoading && <Loader />}

    {gallery.length > 0 && (
      <>
        <ImageGallery gallery={gallery} onClick={this.openModal} />

        {currentPage < totalPages && (
          <Button onClick={this.loadNextPage}>Load More</Button>
        )}
      </>
    )}

    {isModalOpen && (
      <Modal onClose={this.closeModal}>
        <Image URL={largeImageURL} tags={tags} />
      </Modal>
    )}
  </div>
);

  }
}

export default App;
