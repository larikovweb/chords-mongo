import { FC } from 'react';
import { GlobalStyles } from '../styled/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { publicRoutes } from './routes';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const Application: FC = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:5050/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {publicRoutes.map(({ path, component }) => (
                <Route key={path} path={path} element={component} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
};

export default Application;
