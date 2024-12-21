import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App.jsx';

window.addEventListener('load', () => {
  // Находим в DOM элемент с атрибутом id, равным my-app-root.
  const element = document.getElementById('my-app-root');

  if (!element) {
    throw new Error('Элемент не найден.');
  }

  // Определяем его как корневой элемент для отображения компонентов React.
  const root = createRoot(element);

  // Отображаем компонент App.
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});