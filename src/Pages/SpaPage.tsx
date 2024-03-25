import React from 'react';

import PersonForm from '../components/PersonForm';
import PersonTable from '../components/PersonTable';
import './SpaPage.css';
import '../redux/i18n';

const SpaPage: React.FC = () => {
  const handleSave = () => {};

  return (
    <div className='SpaPage'>
      <div className='container'>
        <div className='Person_form'>
          <PersonForm onSave={handleSave} />
        </div>
        <div className='Person_table'>
          <PersonTable />
        </div>
      </div>
    </div>
  );
};

export default SpaPage;
