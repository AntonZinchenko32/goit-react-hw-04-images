import { useState, useEffect } from 'react';

// Стили
import { Global } from '../../styles/Global.styled';
import { AppWrapper } from './App.styled';

// Компоненты
import { Searchbar } from '../Searchbar/Searchbar.js';
import { ImageGallery } from '../ImageGallery/ImageGallery.js';
import { Loader } from '../Loader/Loader.js';
import { Button } from '../Button/Button.js';
import { Modal } from '../Modal/Modal.js';
import { getAllImages } from '../services/api.js';

export const App = () => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    // Записуємо дані з бекенду
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const data = await getAllImages(searchQuery, pageNumber);

        setImages(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    searchQuery && fetchImages();
  }, [searchQuery, pageNumber]);

  const handleSearch = value => {
    setSearchQuery(value);
    setPageNumber(1);
    setImages([]);
  };

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Global />
      <AppWrapper>
        {showModal && <Modal modalImage={modalImage} onClose={toogleModal} />}
        <Searchbar submit={handleSearch} />
        {isLoading && <Loader />}
        {images.length !== 0 && !error && (
          <>
            <ImageGallery
              data={images}
              getLargeImage={setModalImage}
              openModalFunc={toogleModal}
            />
            {totalHits > images.length && (
              <Button pageTurner={() => setPageNumber(pageNumber + 1)} />
            )}
          </>
        )}
      </AppWrapper>
    </>
  );
};
