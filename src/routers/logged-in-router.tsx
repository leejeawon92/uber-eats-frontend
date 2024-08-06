import React from "react";
import { isLoggedInVar } from '../apollo';
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter, Navigate, Route, Router, Routes, useNavigate } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';

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
  <Route path="/" >
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
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
      <Routes>
        {data.me.role === "Client" && ClientRoutes}
        <Navigate to="/" />
      </Routes>
    </BrowserRouter>
  );
};