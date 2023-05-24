import React from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'

import HomePage from '../views/HomePage'
import SignupPage from '../views/SignupPage'
import ContactPage from '../views/Contact'
import ContactDetails from '../views/ContactDetails'
import ContactEdit from '../views/ContactEdit'
import StatisticPage from '../views/Statistic'
import App from '../App'

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Navigate to='/home' />
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'contact/:id',
        element: <ContactDetails />
      },
      {
        path: 'contact/edit',
        element: <ContactEdit />
      },
      {
        path: 'contact/edit/:id',
        element: <ContactEdit />
      },
      {
        path: 'statistic',
        element: <StatisticPage />
      }
    ]
  }
])
