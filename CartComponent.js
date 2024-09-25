import React from 'react';

function CartComponent({ itemsInCart, handleRemove, updateQuantity }) {
  const platformFee = 10;
  const shippingCharges = 20;
  const couponDiscount = 50;
  const gstRate = 0.18;

  const totalMRP = itemsInCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstAmount = totalMRP * gstRate;
  const totalAmount = totalMRP + platformFee + shippingCharges + gstAmount - couponDiscount;

  return (
    <div className="cart-container mt-4 border rounded shadow-sm p-4 bg-light">
      <h2 className="text-secondary">Your Cart</h2>
      {itemsInCart.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        <div>
          {itemsInCart.map((item) => (
            <div key={item.id} className="cart-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.image} alt={item.title} className="me-3" style={{ width: '50px', height: '50px' }} />
                <div>
                  <p className="mb-1">{item.title}</p>
                  <p className="mb-1">Price: ₹{item.price}</p>
                </div>
              </div>
              <div className="cart-quantity-controls d-flex align-items-center">
                <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => updateQuantity(item.id, 'increase')}>+</button>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}

          {/* Price Details */}
          <div className="price-details mt-4 p-3 border rounded shadow-sm">
            <p>Total MRP: ₹{totalMRP.toFixed(2)}</p>
            <p>Coupon Discount: -₹{couponDiscount}</p>
            <p>Platform Fee: ₹{platformFee}</p>
            <p>Shipping Charges: ₹{shippingCharges}</p>
            <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          </div>
          <button className="btn btn-success mt-3" onClick={() => alert('Order Placed!')}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default CartComponent;
