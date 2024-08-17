import React from "react";
import { isLoggedInVar } from '../apollo';
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { Search } from '../pages/client/search';
import { NotFound } from '../pages/404';
import { Category } from '../pages/client/category';
import { Restaurant } from '../components/restaurant';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const ClientRoutes = [
  <Route key={1} path="/" >
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" >
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <Category />
  </Route>,
  <Route key={6} path="/restaurants/:id">
    <Restaurant />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  const navigate = useNavigate();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {data.me.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};