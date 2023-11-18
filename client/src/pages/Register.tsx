import { FC } from 'react';
import { Button, Input } from '../styled/components';
import { useMutation } from '@apollo/client';
import { $register } from '../graphql/mutation';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Auth } from '../styled/auth';

type Form = {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
};

export const Register: FC = () => {
  const [registerMutation, { loading, error }] = useMutation($register);

  const onSubmit = async (data: Form) => {
    console.log(data);
    await registerMutation({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
        repeatPassword: data.repeatPassword,
      },
    });
  };

  const { register, handleSubmit } = useForm<Form>();

  return (
    <Auth.Wrapper>
      <Auth.Form onSubmit={handleSubmit(onSubmit)}>
        <Auth.Title>Регистрация</Auth.Title>
        <Input {...register('name')} placeholder="Имя" />
        <Input {...register('email')} type="email" placeholder="Email" />
        <Input {...register('password')} type="password" placeholder="Пароль" />
        <Button type="submit" disabled={loading}>
          Зарегистрироваться
        </Button>
        <Auth.Links>
          <Link to="/login">Войти</Link>
          <Link to="/reset-password">Забыли пароль?</Link>
        </Auth.Links>
      </Auth.Form>
    </Auth.Wrapper>
  );
};
