import { useState } from 'react';
import ProductList from './components/ProductList';
import './App.css';
import CartComponent from './components/CartComponent';

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, action) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          if (action === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary">Online Shop</h1>
      <ProductList handleAddToCart={handleAddToCart} />
      <CartComponent
        itemsInCart={cart}
        handleRemove={handleRemove}
        updateQuantity={updateQuantity}
      />
    </div>
  );
};

export default App;
