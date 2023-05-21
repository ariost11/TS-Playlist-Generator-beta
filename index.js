import * as React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Quiz from './Quiz';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <div>
    <h1>Taylor Swift Playist Generator</h1>
    <Quiz/>
  </div>
);
