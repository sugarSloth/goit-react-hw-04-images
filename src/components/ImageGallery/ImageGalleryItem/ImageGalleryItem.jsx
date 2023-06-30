import PropTypes from 'prop-types';
import Image from 'components/Image';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, onClick }) {
  const { webformatURL, tags } = image;

  return (
    <li className={css.gallery_item} onClick={onClick}>
      <Image URL={webformatURL} tags={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default ImageGalleryItem;
