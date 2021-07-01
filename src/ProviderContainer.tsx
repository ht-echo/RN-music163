if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React from 'react';
import store from './store';

import App from './App';
import {Provider} from 'react-redux';

export default function ProviderContainer() {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
}
