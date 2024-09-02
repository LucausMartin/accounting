import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound, Home, Me, Statistics } from '@myPages/index.ts';
import { NewRecord } from '@myPages/home/components/index.ts';
import App from './App.tsx';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Home />}>
          <Route path="new-record" element={<NewRecord />}></Route>
        </Route>
        <Route path="/me" element={<Me />}></Route>
        <Route path="/statistics" element={<Statistics />}></Route>
      </Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  </BrowserRouter>
);
