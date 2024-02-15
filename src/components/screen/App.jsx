import React, { useState } from 'react';
import styles from './mainPage.module.css';
import UploadModal from '../ui/modal/upload/uploadModal';
import Canvas from '../ui/Canvas/canvas';

function MainPage() {
  const [count, setCount] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const toggleListContainer = () => {
    const listContainer = document.querySelector(`.${styles.listContainer}`);
    listContainer.classList.toggle(styles.active);
  };

  return (
    <div className={styles.container}>
      {/* Upload Modal*/}
      {isUploadModalOpen &&
      <UploadModal
        close={setIsUploadModalOpen}
        setImageUrl={setImageUrl}
      />}

      {/* Menu */}
      <div className={`${styles.listContainer} ${styles.active}`}>
        <button className={`${styles.moreButton}`} aria-label="Menu Button" onClick={toggleListContainer}>
          <div className={`${styles.menuIconWrapper}`}>
            <div className={`${styles.menuIconLine} ${styles.half} ${styles.first}`}></div>
            <div className={`${styles.menuIconLine}`}></div>
            <div className={`${styles.menuIconLine} ${styles.half} ${styles.last}`}></div>
          </div>
        </button>
        <ul className={styles.moreButtonList}>
          <li className={styles.moreButtonListItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.feather} ${styles.featherShare}`}>
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
            <button onClick={openUploadModal} className={styles.uploadButton}>Upload</button>
          </li>
          {/* <li className={styles.moreButtonListItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.feather} ${styles.featherCopy}`}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <button onClick={openUploadModal} className={styles.uploadButton}>Set</button>
          </li>
          <li className={styles.moreButtonListItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.feather} ${styles.featherSettings}`}>
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
            <button onClick={openUploadModal} className={styles.uploadButton}>Share</button>
          </li>
          <li className={styles.moreButtonListItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.feather} ${styles.featherTrash2}`}>
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
            </svg>
            <button onClick={openUploadModal} className={styles.uploadButton}>Del</button>
          </li> */}
        </ul>
      </div>
      {/* Image */}
      {imageUrl && <Canvas imageUrl={imageUrl} />}
    </div>
  );
}

export default MainPage;