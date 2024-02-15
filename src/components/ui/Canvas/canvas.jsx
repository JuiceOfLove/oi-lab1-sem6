import React, { useEffect, useRef, useState } from 'react';
import styles from './canvas.module.css';

const Canvas = ({ imageUrl }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const imgRef = useRef(new Image());
    const [scale, setScale] = useState(1);
    const [clickedPixelColor, setClickedPixelColor] = useState('');
    const [hoveredPixelCoordinates, setHoveredPixelCoordinates] = useState({ x: 0, y: 0 });
    const [originalImageWidth, setOriginalImageWidth] = useState(0);
    const [originalImageHeight, setOriginalImageHeight] = useState(0);
    const [showClickMessage, setShowClickMessage] = useState(true);

    useEffect(() => {
      const img = imgRef.current;

      const loadImage = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;

        if (!canvas || !context) {
          return;
        }

        const scaledWidth = originalImageWidth * scale;
        const scaledHeight = originalImageHeight * scale;

        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      };

      img.onload = () => {
        setOriginalImageWidth(img.width);
        setOriginalImageHeight(img.height);
        loadImage();
      };

      if (imageUrl) {
        img.src = imageUrl;
      }

      if (img.complete) {
        loadImage();
      }
    }, [imageUrl, scale, originalImageWidth, originalImageHeight]);

    useEffect(() => {
      const canvas = canvasRef.current;
      contextRef.current = canvas.getContext('2d');

      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.max(0, e.clientX - rect.left);
        const y = Math.max(0, e.clientY - rect.top);

        setHoveredPixelCoordinates({ x, y });
      };

      const handleMouseLeave = () => {
        setHoveredPixelCoordinates({ x: 0, y: 0 });
        setShowClickMessage(true);
      };

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    const handleMouseClick = () => {
      const canvas = canvasRef.current;
      const x = Math.max(0, hoveredPixelCoordinates.x);
      const y = Math.max(0, hoveredPixelCoordinates.y);

      const pixel = contextRef.current.getImageData(x, y, 1, 1).data;
      const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

      setClickedPixelColor(color);
      setShowClickMessage(false);
    };

    const handleWheel = (e) => {
      if (e.altKey) {
        const delta = e.deltaY > 0 ? -0.1 : 0.04;
        setScale((prevScale) => Math.max(0.2, Math.min(5, prevScale + delta)));
      }
    };

    return (
      <div className={styles.canvasWrapper}>
        <div className={styles.bottomPanel}>
          {clickedPixelColor && (
            <span>Цвет пикселя: {clickedPixelColor}</span>
          )}
          {!clickedPixelColor && showClickMessage && (
            <span>Кликните на изображение, чтобы увидеть цвет пикселя</span>
          )}
          <span>Размер изображения: {originalImageWidth} x {originalImageHeight}</span>
          <span>Координаты пикселя: ({hoveredPixelCoordinates.x.toFixed(2)}, {hoveredPixelCoordinates.y.toFixed(2)})</span>
        </div>
        <canvas ref={canvasRef} className={styles.canvas} onClick={handleMouseClick} onWheel={handleWheel}></canvas>
      </div>
    );
  };

  export default Canvas;
