import axios from 'axios';

const fetchProducts = async () => {
  const { data } = await axios.get('https://dummyjson.com/products');
  return data.products;
};

export default fetchProducts;
