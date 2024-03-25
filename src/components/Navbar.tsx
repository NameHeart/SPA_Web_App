import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
const { Option } = Select;

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [selectedLanguage, setSelectedLanguage] = useState('th');

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  useEffect(() => {
    if (isHomePage) {
      const selectedLanguageFromStorage = localStorage.getItem('selectedLanguage');
      if (selectedLanguageFromStorage) {
        setSelectedLanguage(selectedLanguageFromStorage);
      }
    }
  }, [isHomePage]);

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <>
      {isHomePage && (
        <div className='button_homepage'>
          <Select
            defaultValue={selectedLanguage}
            onChange={(value) => handleLanguageChange(value)}
          >
            <Option value='th'>TH</Option>
            <Option value='en'>EN</Option>
          </Select>
        </div>
      )}
      <div className='head_title'>
        {!isHomePage && (
          <>
            <div>
              {location.pathname === '/Form'
                ? t('form_title')
                : location.pathname === '/Button'
                ? t('layout_title')
                : ''}
            </div>
            <div className='button_right'>
              <Select
                defaultValue={selectedLanguage}
                onChange={(value) => handleLanguageChange(value)}
              >
                <Option value='th'>TH</Option>
                <Option value='en'>EN</Option>
              </Select>
              <Button type='default' onClick={handleOnClick}>
                {t('home_button')}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
