import { createRoot } from 'react-dom/client';
import { AppRouter } from './router.tsx';
import store from './store/index.ts';
import { Provider } from 'react-redux';
import './index.less';
import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
