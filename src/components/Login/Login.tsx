import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../reduxHooks';
import { login, registration } from './registrationSlice';
import './Login.css';

type UserFormType = {
  name: string;
  login: string;
  password: string;
  phone: string;
};

const Login = () => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const { user, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (error === 'Такой польователь уже существует') {
      setOpenRegistration(false);
      form.resetFields();
    }
  }, [error]);

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const handleFinish = async (values: UserFormType) => {
    if (values.phone) {
      await dispatch(registration(values));
    } else {
      dispatch(login(values));
    }
  };

  return (
    <div className="login">
      <h4>{error}</h4>
      {user ? (
        <>
          <p>{user.name} - вход успешен</p>
          <Link to="/admin" style={{ fontSize: 15 }}>
            Перейти в раздел Администрирования
          </Link>
        </>
      ) : (
        <>
          <Form form={form} onFinish={handleFinish}>
            <Form.Item
              name="login"
              rules={[
                { required: true, min: 5, message: 'Не менее 5-ти символов' },
                {
                  pattern: /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*$/,
                  message: 'Только латиница, цифры, ._- и без спецсимволов',
                },
              ]}
              help="Логин: минимум 5 символов"
            >
              <Input placeholder="Логин" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Введите пароль' },
                { min: 7, message: 'Не менее 7-ми символов' },
                {
                  pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{7,}$/,
                  message:
                    'Пароль должен содержать цифру, заглавную букву и латиницу',
                },
              ]}
              help="Пароль: минимум 7 символов, 1 заглавная буква, 1 цифра"
            >
              <Input placeholder="Пароль" />
            </Form.Item>
            {openRegistration && (
              <>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: 'Введите Имя' },
                    { min: 3, message: 'Не менее 3-х символов' },
                  ]}
                >
                  <Input placeholder="Ваше имя" />
                </Form.Item>
                <Form.Item name="phone">
                  <Input placeholder="Ваш телефон" />
                </Form.Item>
              </>
            )}

            <Button htmlType="submit">
              {openRegistration ? 'Регистрация' : 'Вход'}
            </Button>
          </Form>
          {!openRegistration && (
            <Button
              style={{ marginTop: 20 }}
              type="primary"
              onClick={() => setOpenRegistration(true)}
            >
              Регистрация
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
