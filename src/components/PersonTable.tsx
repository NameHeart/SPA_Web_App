import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePerson } from '../redux/personSlice';
import { Table, Button, Checkbox, Modal } from 'antd';
import { Person } from '../redux/person';
import { useTranslation } from 'react-i18next';

const PersonTable: React.FC = () => {
  const dispatch = useDispatch();
  const people = useSelector((state: any) => state.person);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      setShowModal(true);
      return;
    }

    selectedRowKeys.forEach((key: string) => {
      dispatch(deletePerson(key));
    });
    setSelectedRowKeys([]);
  };

  const onSelectChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys.map(String));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleToggleSelectAll = () => {
    if (selectedRowKeys.length === people.length) {
      setSelectedRowKeys([]);
    } else {
      const allKeys = people.map((person: Person) => person.id);
      setSelectedRowKeys(allKeys);
    }
  };

  const columns = [
    {
      title: t('name'),
      dataIndex: 'firstName',
      key: 'name',
      render: (text: string, record: Person) => (
        <span>{`${record.firstName} ${record.lastName}`}</span>
      ),
    },
    {
      title: t('gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: (text: string) => (
        <span>
          {text === 'male' && t('male')}
          {text === 'female' && t('female')}
          {text === 'unspecified' && t('unspecified')}
        </span>
      ),
    },
    { title: t('phone_number'), dataIndex: 'phoneNumber', key: 'phoneNumber' },
    {
      title: t('nationality'),
      dataIndex: 'nationality',
      key: 'nationality',
      render: (text: string, record: Person) => (
        <span>
          {text === 'nationality_option1' && t('nationality_option1')}
          {text === 'nationality_option2' && t('nationality_option2')}
          {text === 'nationality_option3' && t('nationality_option3')}
        </span>
      ),
    },
    {
      title: t('action'),
      key: 'actions',
      render: (text: string, record: Person) => (
        <Button type='primary' danger onClick={() => handleDelete()}>
          {t('delete')}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Checkbox
        checked={people.length > 0 && selectedRowKeys.length === people.length}
        onChange={handleToggleSelectAll}
        disabled={people.length === 0}
      >
        {t('select_all')}
      </Checkbox>

      <Button onClick={handleDelete} style={{ marginBottom: '1rem' }}>
        {t('delete')}
      </Button>

      <Modal
        title={t('alert')}
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key='submit' type='primary' onClick={() => setShowModal(false)}>
            OK
          </Button>,
        ]}
      ></Modal>

      <Table
        dataSource={people}
        columns={columns}
        rowKey='id'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        style={{ minHeight: 250 }}
      />
    </>
  );
};

export default PersonTable;
