import styled from '@emotion/styled';
import { FC } from 'react';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { HelmetHead } from '../../components/HelmetHead';
import { $QueryAuthUser, $QueryUser } from '../../graphql/query';
import { useQuery } from '@apollo/client';

export const Layout: FC = () => {
  const { data } = useQuery($QueryAuthUser);
  const isAuth = !!data?.user;
  console.log(data);
  return (
    <>
      <HelmetHead title="Общий заголовок" descr="Общее описание" />
      <Header isAuth={isAuth} />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  display: block;
  padding-bottom: 2rem;
`;
