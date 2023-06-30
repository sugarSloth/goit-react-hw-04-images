import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api//';
const API_KEY = '34821763-cd0390e9b5fa3f24bbb43d369';

async function getApiResponse(searchTerm, page) {
  const requestParameters = {
    key: API_KEY,
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  };

  try {
    const response = await axios.get(BASE_URL, { params: requestParameters });
    const images = response.data;

    return {
      hits: images.hits,
      totalHits: images.totalHits,
      hitsPerPage: requestParameters.per_page,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getApiResponse };
