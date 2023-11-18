import { FC } from 'react';
import { Button, Input } from '../styled/components';
import { useMutation } from '@apollo/client';
import { $login } from '../graphql/mutation';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from '../styled/auth';

type Form = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const [loginMutation, { loading, error }] = useMutation($login);
  const navigate = useNavigate();
  const onSubmit = async (data: Form) => {
    const response = await loginMutation({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
    if (response.data.login.success) {
      alert('Вы вошли');
      navigate('/');
    } else {
      alert(response.data.login.message);
    }
  };

  const { register, handleSubmit } = useForm<Form>();

  return (
    <Auth.Wrapper>
      <Auth.Form onSubmit={handleSubmit(onSubmit)}>
        <Auth.Title>Авторизация</Auth.Title>
        <Input {...register('email')} type="email" placeholder="Email" />
        <Input {...register('password')} type="password" placeholder="Пароль" />
        <Button type="submit" disabled={loading}>
          Войти
        </Button>
        <Auth.Links>
          <Link to="/register">Регистрация</Link>
          <Link to="/reset-password">Забыли пароль?</Link>
        </Auth.Links>
      </Auth.Form>
    </Auth.Wrapper>
  );
};
