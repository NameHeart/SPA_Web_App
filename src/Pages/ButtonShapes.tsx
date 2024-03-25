import React, { useState } from 'react';
import { Button } from 'antd';
import './ButtonShapes.css';
import { useTranslation } from 'react-i18next';

const ButtonShapes: React.FC = () => {
  const [bottomShapes, setBottomShapes] = useState([
    { shape: 'circle-shape', key: 1 },
    { shape: 'rectangle-shape', key: 2 },
    { shape: 'oval-shape', key: 3 },
    { shape: 'rhombus-shape', key: 4 },
    { shape: 'fabric-button', key: 5 },
    { shape: 'rhombus_shape_tilted', key: 6 },
  ]);
  const { t } = useTranslation();

  const [topVisible, setTopVisible] = useState(true);

  const shuffleBottomShapes = () => {
    setBottomShapes(shuffleArray(bottomShapes));
  };

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleShapeClick = (shape: string) => {
    console.log(`Clicked on shape: ${shape}`);
    shuffleBottomShapes();
  };
  const moveLeft = () => {
    const newArray = [...bottomShapes];
    const firstItem = newArray.shift();
    if (firstItem !== undefined) {
      newArray.push(firstItem);
      setBottomShapes(newArray);
    }
  };

  const moveRight = () => {
    const newArray = [...bottomShapes];
    const lastItem = newArray.pop();
    if (lastItem !== undefined) {
      newArray.unshift(lastItem);
      setBottomShapes(newArray);
    }
  };

  const move = () => {
    setTopVisible((prevVisible) => !prevVisible);
  };
  return (
    <div className='button-layout'>
      <div className='button_head'>
        <div className='card_container_title  '>
          <Button className='card_item' type='primary' onClick={moveLeft}>
            <Button className='shape-button triangle-left'></Button>
          </Button>
          <Button className='shape-button-circle'>{t('more_shape')}</Button>
        </div>

        <div className='card_container_title '>
          <div className='horizontal_buttons'>
            <Button className='card_item_center' type='primary' onClick={move}>
              <Button
                className='shape-button triangle-up'
                onClick={() => handleShapeClick('triangle-up')}
              />
            </Button>
            <Button className='card_item_center' type='primary' onClick={move}>
              <Button
                className='shape-button triangle-down'
                onClick={() => handleShapeClick('triangle-down')}
              />
            </Button>
          </div>

          <Button className='shape-button-circle'>{t('more_position')}</Button>
        </div>

        <div className='card_container_title '>
          <Button className='card_item' type='primary' onClick={moveRight}>
            <Button className='shape-button triangle-right' />
          </Button>
          <Button className='shape-button-circle'>{t('more_shape')}</Button>
        </div>
      </div>
      {topVisible ? (
        <div className='group_button_container'>
          <div className='group_button_top'>
            {bottomShapes.slice(0, 3).map((button, index) => (
              <div className='card_container' key={index}>
                <Button className='card_item' type='primary'>
                  <Button
                    className={`shape-button ${button.shape}`}
                    onClick={() => handleShapeClick(button.shape)}
                  />
                </Button>
              </div>
            ))}
          </div>
          <div className='group_button_bottom'>
            {bottomShapes.slice(3, 6).map((button, index) => (
              <div className='card_container' key={button.key}>
                <Button className='card_item' type='primary'>
                  <Button
                    className={`shape-button ${button.shape}`}
                    onClick={() => handleShapeClick(button.shape)}
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='group_button_container'>
          <div className='group_button_bottom'>
            {bottomShapes.slice(0, 3).map((button, index) => (
              <div className='card_container' key={button.key}>
                <Button className='card_item' type='primary'>
                  <Button
                    className={`shape-button ${button.shape}`}
                    onClick={() => handleShapeClick(button.shape)}
                  />
                </Button>
              </div>
            ))}
          </div>
          <div className='group_button_top'>
            {bottomShapes.slice(3, 6).map((button, index) => (
              <div className='card_container' key={index}>
                <Button className='card_item' type='primary'>
                  <Button
                    className={`shape-button ${button.shape}`}
                    onClick={() => handleShapeClick(button.shape)}
                  />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonShapes;
