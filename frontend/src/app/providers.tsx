"use client"

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/services/redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const Providers = ({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;