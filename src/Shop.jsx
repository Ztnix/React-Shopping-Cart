import "./styles/Shop.css";
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const { itemsList, handleCartClick, handleItemIncrease, handleItemDecrease } =
    useOutletContext();

  return (
    <div className="shopPage">
      <div className="shopContainer">
        {itemsList.map((item) => (
          <div className="shopItem" key={item.id}>
            <div className="itemImage">
              <img src={item.image} alt="" />
            </div>
            <div className="itemDescription">{item.title}</div>
            <div className="itemInfoContainer">
              <div className="tags">{item.category}</div>
              <div className="priceDetails">
                <div className="price">${item.price}</div>
                <div className="rating">
                  ⭐{item.rating.rate} - {item.rating.count} Reviews
                </div>
              </div>
              <div className="bottomAreaContainer">
                <div className="buttonsContainer">
                  <div className="quantityButtons">
                    <button
                      className="minusButtons"
                      onClick={() => {
                        handleItemDecrease(item);
                      }}
                    >
                      -
                    </button>
                    <div className="shopNumItem">{item.amount}</div>
                    <button
                      className="plusButton"
                      onClick={() => {
                        handleItemIncrease(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="addCartButton"
                    onClick={() => {
                      if (
                        item.amount !== 0 &&
                        item.confirmed + item.amount >= 0
                      ) {
                        handleCartClick(item);
                      }
                    }}
                  >
                    Add Item
                  </button>
                </div>
                <div className="currentCount">
                  ({item.confirmed} currently in cart)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
