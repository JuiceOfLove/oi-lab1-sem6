import React, { useEffect, useState } from 'react';
import styles from './uploadModule.module.css';

const UploadModal = ({ close, setImageUrl }) => {
  const [inputValue, setInputValue] = useState('');

  const closeModal = () => {
    close(false);
  };

  const handleUrlChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = async () => {
    if (inputValue) {
      try {
        const response = await fetch(`https://oi-server-first.onrender.com/proxy-image?url=${encodeURIComponent(inputValue)}`);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          setImageUrl(reader.result);
          closeModal();
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        closeModal();
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <button onClick={closeModal} className={styles.closeButton}>
          x
        </button>
        <div className={styles.selectWrapper}>
          <div className={styles.select}>
            <label htmlFor="upload">Загрузите изображение</label>
            <input
              className={styles.inputField}
              id="upload"
              type="file"
              accept="image/jpg, image/png, image/webp"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.select}>
            <label htmlFor="uploadByUrl">Введите URL изображения</label>
            <div className={styles.selectInner}>
              <input
                className={styles.inputField}
                placeholder="Введите url"
                type="text"
                name=""
                id="uploadByUrl"
                value={inputValue}
                onChange={handleUrlChange}
              />
              <button onClick={handleConfirm} className={styles.confirmButton}>
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;