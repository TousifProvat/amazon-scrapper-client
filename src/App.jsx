import reactLogo from './assets/react.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    `http://localhost:5000/scrape/amazon?product=` || import.meta.VITE_BASE_URL;

  const onSearch = async (search) => {
    if (!search || !search.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + search);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-100 min-h-[100vh] p-2'>
      <h1 className='text-2xl font-semibold text-center my-4'>
        Amazon Scrapper
      </h1>
      <div className='w-full bg-white shadow-sm flex justify-center overflow-hidden rounded-md'>
        <input
          className='h-10 w-full px-3 outline-none border-2 focus:border-blue-300 rounded-md border-r-0 rounded-r-none'
          placeholder='Product Name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className='bg-blue-400 px-2 rounded-md text-white text-sm disabled:bg-blue-100 -ml-1'
          onClick={() => onSearch(search)}
          disabled={loading}
        >
          Search
        </button>
      </div>
      {loading && (
        <div className='flex items-center justify-center min-h-screen'>
          <div
            style={{
              borderTopColor: 'transparent',
            }}
            className='w-8 h-8 border-4 border-blue-400 rounded-full animate-spin'
          ></div>
          <p className='ml-2'>scrapping...</p>
        </div>
      )}
      <div className='products my-4 grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4'>
        {!loading &&
          products.map((product, index) => (
            <div className='w-[100%] bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mx-auto sm:mx-0 dark:bg-gray-800 dark:border-gray-700'>
              <img
                className='rounded-t-lg mx-auto'
                src={product.image}
                alt={product.title}
              />

              <div className='p-5'>
                <h5 className='text-gray-900 font-bold text-md tracking-tight mb-2 truncate'>
                  {product.title}
                </h5>

                <p className='font-normal text-gray-700 mb-3 dark:text-gray-400'>
                  {product.price.split('.')[0]}
                </p>
                <a
                  href={product.link}
                  target='_blank'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Read more
                  <svg
                    className='-mr-1 ml-2 h-4 w-4'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
