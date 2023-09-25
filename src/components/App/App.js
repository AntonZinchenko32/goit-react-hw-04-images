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

        setImages([...images, ...data.hits]);
        setTotalHits(data.totalHits);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };
    searchQuery && fetchImages();
  }, [searchQuery, pageNumber, images]);

  const handleSearch = value => {
    setSearchQuery(value);
    setPageNumber(1);
    setImages([]);
  };

  const pageTurner = () => {
    setPageNumber(pageNumber + 1);
  };

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const getLargeImage = imageURL => {
    setModalImage(imageURL);
  };

  return (
    <>
      <Global />
      <AppWrapper>
        {showModal && <Modal modalImage={modalImage} onClose={toogleModal} />}
        <Searchbar submit={handleSearch} />
        {isLoading && <Loader />}
        {images.length !== 0 && !error && 
          <>
            <ImageGallery
              data={images}
              getLargeImage={getLargeImage}
              openModalFunc={toogleModal}
            />
            {totalHits > images.length && <Button pageTurner={pageTurner} />}
          </>
        }
      </AppWrapper>
    </>
  );
};
