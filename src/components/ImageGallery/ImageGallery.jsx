import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={css.gallery}>
      {gallery.map((image) => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          onClick={() => onClick({ ...image })}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};
