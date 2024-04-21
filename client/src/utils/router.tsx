import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { routes } from 'utils/constants/routes';
import Layout from 'components/Layout';
import Articles from 'pages/Articles/Articles';
import SingleArticle from 'pages/SingleArticle/SingleArticle';
import Editor from 'pages/Editor/Editor';
import NotFound from 'pages/NotFound';
import Primary from 'pages/Primary/Primary';
import SignIn from 'pages/SignIn/SignIn';
import SignUp from 'pages/SignUp/SignUp';
import Search from 'pages/Search/Search';
import User from 'pages/User';
import PrivacyPolicy from 'pages/PrivacyPolicy/PrivacyPolicy';

export const router = createBrowserRouter([
  {
    path: routes.Primary,
    // add component auth for checking instead of layout
    // and for authorization by roles
    element: <Layout />,
    children: [
      {
        path: routes.Primary,
        element: <Primary />
      },
      {
        path: routes.Articles,
        element: <Articles />
      },
      {
        path: `${routes.Articles}/:url`,
        element: <SingleArticle />
      },
      {
        path: `${routes.Users}/:username`,
        element: <User />
      },
      {
        path: `${routes.Search}`,
        element: <Search />
      },
      {
        path: routes.Editor,
        element: <Editor />
      }
    ]
  },
  {
    path: routes.SignUp,
    element: <SignUp />
  },
  {
    path: routes.SignIn,
    element: <SignIn />
  },
  {
    path: routes.PrivacyPolicy,
    element: <PrivacyPolicy />
  },
  {
    path: routes.NotFound,
    element: <NotFound />
  }
], { basename: '/blog' });
