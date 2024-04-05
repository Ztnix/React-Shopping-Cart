import "./styles/Cart.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const { cart, handleClearCart } = useOutletContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.amount;
    });
    setTotal(sum);
  }, [cart]);

  return (
    <div className="cartPage">
      {total !== 0 ? (
        <div className="cartContainer">
          <h1 className="XD">Review your selections:</h1>
          <div className="itemsContainer">
            <button
              className="clearCartButton"
              onClick={() => {
                handleClearCart();
              }}
            >
              Clear Cart
            </button>
            {cart.map((item) => (
              <div className="cartItem" key={item.id}>
                <div className="leftSide">
                  <div className="itemImage">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cartItemInfo">
                    <div className="itemDescription">{item.title}</div>
                    <div className="tags">{item.category}</div>
                    <div className="priceInfo">
                      <div className="price">${item.price}</div>
                      <div className="rating">
                        ⭐{item.rating.rate} - {item.rating.count} Reviews
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightSide">
                  <div className="itemAmount">No. in cart: {item.amount}</div>
                  <div className="subTotal">
                    Subtotal: ${(item.price * item.amount).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="totalArea">
            <div className="totalAmount">Total: ${total.toFixed(2)}</div>
          </div>
        </div>
      ) : (
        <div className="emptyCartMessage">
          <p>¡Your cart is empty</p>
          <p>Go check out our store!</p>
        </div>
      )}
    </div>
  );
}
