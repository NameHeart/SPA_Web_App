import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addPerson, updatePerson } from '../redux/personSlice';
import { Person } from '../redux/person';
import { Button, DatePicker, Form, Input, Select, Radio } from 'antd';
import './PersonForm.css';
import moment from 'moment';

const { Option } = Select;

interface PersonFormProps {
  person?: Person;
  onSave: () => void;
}

const PersonForm: React.FC<PersonFormProps> = ({ person, onSave }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const handleSubmit = (values: any) => {
    const { prefix, birthdate, ...otherValues } = values;
    const formattedBirthdate = moment(birthdate).format('DD-MM-YYYY');

    const newPerson: Person = {
      id: person?.id || uuidv4(),
      prefix,
      birthdate: formattedBirthdate,
      ...otherValues,
    };

    if (person) {
      dispatch(updatePerson(newPerson));
    } else {
      dispatch(addPerson(newPerson));
    }
    onSave();
    form.resetFields();
  };

  return (
    <div>
      <div>{t('form_title')}</div>
      <div className='person-form'>
        <div className='person-form-container'>
          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              prefix: person?.prefix,
              firstName: person?.firstName || '',
              lastName: person?.lastName || '',
              birthdate: person?.birthdate
                ? moment(person.birthdate, 'DD-MM-YYYY')
                : '',
              nationality: person?.nationality,
              citizenId: person?.citizenId || '',
              gender: person?.gender || '',
              phoneNumber: person?.phoneNumber || '',
              passport: person?.passport || '',
              expectedSalary: person?.expectedSalary || 0,
            }}
          >
            <div className='form-group'>
              <Form.Item
                className='form-item'
                name='prefix'
                label={t('prefix_label')}
                initialValue={person?.prefix || null}
                style={{ width: '31%' }}
                rules={[{ required: true, message: t('prefix_required') }]}
              >
                <Select
                  onChange={(value) => form.setFieldsValue({ prefix: value })}
                  placeholder={person?.prefix ? '' : t('prefix_placeholder')}
                >
                  <Select.Option value={t('prefix_option1')}>
                    {t('prefix_option1')}
                  </Select.Option>
                  <Select.Option value={t('prefix_option2')}>
                    {t('prefix_option2')}
                  </Select.Option>
                  <Select.Option value={t('prefix_option3')}>
                    {t('prefix_option3')}
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                className='form-item'
                name='firstName'
                label={t('first_name_label')}
                style={{ width: '40%' }}
                rules={[{ required: true, message: t('first_name_required') }]}
              >
                <Input placeholder={t('first_name_placeholder')} />
              </Form.Item>

              <Form.Item
                className='form-item'
                name='lastName'
                label={t('last_name_label')}
                style={{ width: '40%' }}
                rules={[{ required: true, message: t('last_name_required') }]}
              >
                <Input placeholder={t('last_name_placeholder')} />
              </Form.Item>
            </div>
            <div className='form-group'>
              <Form.Item
                name='birthdate'
                label={t('birthdate_label')}
                rules={[{ required: true, message: t('birthdate_required') }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format='DD-MM-YYYY'
                  placeholder={t('birthdate_placeholder')}
                />
              </Form.Item>
              <Form.Item
                className='form-item'
                name='nationality'
                label={t('nationality_label')}
                style={{ width: '40%' }}
                rules={[{ required: true, message: t('nationality_required') }]}
              >
                <Select placeholder={t('nationality_placeholder')}>
                  <Select.Option value='nationality_option1'>
                    {t('nationality_option1')}
                  </Select.Option>
                  <Select.Option value='nationality_option2'>
                    {t('nationality_option2')}
                  </Select.Option>
                  <Select.Option value='nationality_option3'>
                    {t('nationality_option3')}
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              className='form-item'
              name='citizenId'
              label={t('citizen_id_label')}
              rules={[{ required: true, message: t('citizen_id_required') }]}
            >
              <Input placeholder={t('citizen_id_placeholder')} />
            </Form.Item>
            <div className='form-group'>
              <Form.Item
                className='form-item'
                name='gender'
                label={t('gender_label')}
                rules={[{ required: true, message: t('gender_required') }]}
              >
                <Radio.Group>
                  <Radio value='ชาย'>{t('male')}</Radio>
                  <Radio value='หญิง'>{t('female')}</Radio>
                  <Radio value='ไม่ระบุ'>{t('unspecified')}</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <Form.Item
              className='form-item'
              name='phoneNumber'
              label={t('phone_number_label')}
              rules={[{ required: true, message: t('phone_number_required') }]}
            >
              <Input
                addonBefore={
                  <Select defaultValue='' style={{ width: 75, background: 'white' }}>
                    <Option value='+66'>+66</Option>
                    <Option value='+1'>+1</Option>
                    <Option value='+44'>+44</Option>
                  </Select>
                }
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              className='form-item'
              name='passport'
              label={t('passport_label')}
            >
              <Input placeholder={t('passport_placeholder')} />
            </Form.Item>
            <div className='form_group_button'>
              <Form.Item
                className='form-item'
                name='expectedSalary'
                label={t('expected_salary_label')}
                rules={[
                  {
                    required: true,
                    message: t('expected_salary_required'),
                  },
                  {
                    validator: (_, value) => {
                      const salary = parseInt(value);
                      if (isNaN(salary) || salary <= 0) {
                        return Promise.reject(t('expected_salary_required'));
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input
                  type='number'
                  placeholder={t('expected_salary_placeholder')}
                />
              </Form.Item>
              <div className='button_group'>
                <Form.Item>
                  <Button type='default' onClick={() => form.resetFields()}>
                    {t('clear_data')}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type='default' htmlType='submit'>
                    {t('submit_data')}
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PersonForm;
