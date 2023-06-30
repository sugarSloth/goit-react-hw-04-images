import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={css.gallery}>
      {gallery.map(image => {
        const { largeImageURL, tags } = image;
        return (
          <ImageGalleryItem
            image={image}
            key={image.id}
            onClick={() => onClick({ largeImageURL, tags })}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default ImageGallery;
