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
