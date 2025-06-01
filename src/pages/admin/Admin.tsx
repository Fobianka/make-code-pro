import { Button, Form, Input, message, Select } from 'antd';

import { useAppDispatch } from '../../reduxHooks';
import { ProductType } from '../../types';
import { createProduct } from '../product/productSlice';
import BackHome from '../../components/BackHome/BackHome';

const Admin = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleFinish = (values: ProductType) => {
    console.log(values);
    dispatch(createProduct(values));
    message.success('Товар создан');
    form.resetFields();
  };

  return (
    <>
      <BackHome />
      <div style={{ marginLeft: 30, paddingTop: 40 }}>
        <h3>Создание товара</h3>
        <Form
          onFinish={handleFinish}
          layout="vertical"
          wrapperCol={{ span: 8 }}
          style={{ marginTop: 30 }}
        >
          <Form.Item
            name="brand"
            label="Бренд"
            rules={[
              {
                required: true,
                min: 2,
                message: 'минимум 2 символа',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Название"
            rules={[
              {
                required: true,
                min: 5,
                message: 'минимум 5 символов',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            rules={[
              {
                required: true,
                min: 2,
                message: 'минимум 2 символа',
              },
            ]}
          >
            <Select
              options={[
                { value: 'laptop', label: 'ноутбук' },
                { value: 'monitor', label: 'монитор' },
                { value: 'phone', label: 'смартфон' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[
              {
                required: true,
                min: 7,
                message: 'минимум 7 символов',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="img"
            label="Изображение"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="rating" initialValue={1}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="quantity" initialValue={1}>
            <Input type="hidden" />
          </Form.Item>

          <Button htmlType="submit">Создать</Button>
        </Form>
      </div>
    </>
  );
};

export default Admin;
