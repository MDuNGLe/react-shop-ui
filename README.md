> ##  Пользовательский веб­‑интерфейс для интернет‑магазина
> ##### (Сафронов Дмитрий ВД50-4-21)
> ВД50-4-21

___

## Оглавление
- [Цель работы](#цель-работы)
- [Задание](#задание)
- [Ход работы](#ход-работы)
- [Реализация интернет-магазина](#реализация-интернет-магазина)
- [Итог](#итог)
___

#### Цель работы

* ##### Научиться с помощью библиотеки React создавать пользовательские веб­‑интерфейсы, взаимодействующие с RESTful API, реализующим спецификацию JSON:API.

#### Задание

* ##### С помощью библиотеки React создать пользовательский веб­‑интерфейс, взаимодействующий с RESTful API, реализующим спецификацию JSON:API.
___

### Ход работы:

Первым шагом

Проверям устновку `Node.js` и пакетного менеджера `npm` с помощью команд

``` bash
node -v
```
``` bash
npm -v
```

Далее создём каталог проекта и переходим в него

``` bash
mkdir react-shop-ui.example
cd react-shop-ui.example
```

Инициализируем программный пакет Node.js

``` bash
npm init
```

Следующим шагом установим пакеты, от которых зависит наше веб­‑приложение.

``` bach
npm install --save-prod react react-dom

npm install --save-dev @types/react @types/react-dom vite
```

Создадим файл `tsconfig.json` с конфигурацией проекта, файл выглядит следующим образом

``` json
{
  "compilerOptions": {
    "allowJs": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "checkJs": true,
    "composite": false,
    "downlevelIteration": true,
    "esModuleInterop": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "react",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "newLine": "lf",
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "removeComments": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES6",
    "verbatimModuleSyntax": true
  },
  "include": [
    "**/*.jsx"
  ]
}
```
___

#### Реализация интрнет-магазина

* __Файл `App.jsx`__

_Файл `App.jsx` отвечает за общий запуск и отображение основного компонента приложения. В данном случае это компонент ProductList, который представляет витрину с товарами._

> __Основные задачи:__
> * Импортирует компонент ProductList.
> * Определяет функцию App, которая возвращает данный компонент.
> * Экспортирует App для использования в других частях приложени

__Код файла App.jsx__

``` jsx
import React from 'react';
import { ProductList } from './ProductList.jsx';

function App() {
  return <ProductList />;
}

export {
  App
};
```
* __ProductList `App.jsx`__

_Файл `ProductList.jsx` содержит основной функционал приложения, связанный с витриной продуктов.._

> __Основные задачи:__
> * Хранение состояния продуктов `products` и нового продукта `newProduct` с помощью `useState`.
> * Получение списка продуктов с удалённого API при загрузке компонента через функцию `getProducts`.
> * Обработка добавления новых продуктов через форму.
> * Реализация удаления продуктов.
> * Отображение продуктов в виде карточек с использованием компонентов из библиотеки Material-UI.

> __Функции:__
> * `getProducts`: выполняет запрос на получение данных о продуктах через API.
> * `handleInputChange`: обрабатывает изменения в полях формы для добавления продукта.
> * `handleAddProduct`: добавляет новый продукт в список.
> * `handleDeleteProduct`: удаляет продукт по идентификатору.

> __Интерфейс:__
> * Форма для добавления нового продукта с полями для названия, изображения и цены..
> * Список продуктов, где каждый элемент представлен карточкой с кнопкой удаления.

__Код файла ProductList.jsx__

``` jsx
import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import { Button, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// Компонент «Витрина».
function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', image: '', price: '' });

  async function getProducts() {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
      headers: {
        'Accept': 'application/vnd.api+json',
      },
      method: 'GET',
    });
    const doc = await response.json();
    setProducts(doc);
  }

  useEffect(() => {
    getProducts().catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (newProduct.title && newProduct.image && newProduct.price) {
      const newProductWithId = { ...newProduct, id: Date.now() }; // Генерация уникального id
      setProducts((prev) => [newProductWithId, ...prev]);
      setNewProduct({ title: '', image: '', price: '' }); // Очистка полей
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const items = products.map((product) => {
    return (
      <article key={product.id}>
        <Card variant="outlined" sx={{ maxWidth: 345, marginBottom: 2 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={product.image || "https://mpt.ru/upload/head.jpg"}
            title={product.title}
          />

          <CardContent>
            <h2 className={styles.x} style={{ marginBottom: 10 }}>
              {product.title}
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Цена: {product.price} ₽</p>
          </CardContent>

          <CardActions>
            <Button variant="contained" color="error" onClick={() => handleDeleteProduct(product.id)}>
              Удалить
            </Button>
          </CardActions>
        </Card>
      </article>
    );
  });

  return (
    <>
      <h1>Продукты</h1>

      {/* Форма для добавления товара */}
      <div style={{ marginBottom: 20 }}>
        <TextField
          label="Наименование"
          name="title"
          value={newProduct.title}
          onChange={handleInputChange}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Изображение URL"
          name="image"
          value={newProduct.image}
          onChange={handleInputChange}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Цена"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleAddProduct}>
          Сохранить
        </Button>
      </div>

      {/* Отображение списка товаров */}
      <div>{items}</div>
    </>
  );
}

export { ProductList };

```

* __Файл `index.jsx`__

_Файл main.jsx отвечает за начальную настройку и отображение React-компонентов в DOM._

> Основные задачи:
> * Определяет DOM-элемент с атрибутом `id` равным `my-app-root` как корневой элемент.
> * В случае отсутствия корневого элемента выбрасывается ошибка.

__Код файла index.jsx__

``` jsx
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
```
* __Вспомогательные библиотеки и стили__


> __Material-UI:__
> * __Используется для стилизации компонентов__
> * `TextField:` для ввода текста.
> * `Button:` для кнопок.
> * `Card`, `CardMedia`, `CardContent`, `CardActions`: для отображения карточек продуктов

#### Пример работы

* __Заполним форму продукта и сохраним её__

[![Заполняем форму](https://i.postimg.cc/x1z5WbTV/Screenshot-1.png)](https://postimg.cc/xX9Lm8z6)

* __Товар добавился в нашу ветрину__
[![Товар на ветрине](https://i.postimg.cc/jjYcKdLw/Screenshot-2.png)](https://postimg.cc/RWGKLm14)

* __Так же если нажать на кнопку, товар удаляется из ветрины__
[![Товары удалены](https://i.postimg.cc/tgd5gQxr/Screenshot-3.png)](https://postimg.cc/DWZsCN5s)

#### Итог

_Приложение реализует функционал управления продуктами (получение, добавление, удаление) и имеет понятную структуру, которая легко расширяется._
