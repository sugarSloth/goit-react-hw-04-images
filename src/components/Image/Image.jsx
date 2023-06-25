import PropTypes from 'prop-types';
import css from './Image.module.css';

export default function Image({ URL, tags }) {
  return <img className={css.image} src={URL} alt={tags} />;
}

Image.propTypes = {
  URL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
