import PropTypes from 'prop-types';
import css from './Image.module.css';

function Image({ URL, tags = '' }) {
  return <img className={css.image} src={URL} alt={tags}></img>;
}

Image.propTypes = {
  URL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

export default Image;
