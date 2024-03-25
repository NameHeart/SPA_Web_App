import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';
import './HomePage.css';
const { Meta } = Card;

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className='home'>
      <div className='card_container'>
        <Link to='/Button'>
          <Card style={{ width: 240, margin: 20 }}>
            <Meta
              title={t('homepage_tile1')}
              description={t('homepage_description1')}
            />
          </Card>
        </Link>
        <Link to='/Form'>
          <Card style={{ width: 240, margin: 20 }}>
            <Meta
              title={t('homepage_tile2')}
              description={t('homepage_description2')}
            />
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
