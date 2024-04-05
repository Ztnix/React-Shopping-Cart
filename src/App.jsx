import { useState } from "react";
import { useEffect } from "react";
import "./styles/App.css";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [idList, setIdList] = useState(createRandomArray());
  const [itemsList, setItemsList] = useState([]);
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState();
  loading, setIdList; //ELIMINAR

  function createRandomArray(size = 8) {
    let arr = [];
    while (arr.length < size) {
      let x = Math.floor(Math.random() * 20) + 1;
      if (arr.indexOf(x) === -1) arr.push(x);
    }
    return arr;
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const promises = idList.map(async (id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        return data;
      });

      const fetchedData = await Promise.all(promises);
      setItemsList(
        fetchedData.map((item) => ({ ...item, amount: 0, confirmed: 0 }))
      );
      setLoading(false);
    };

    fetchData();
  }, [idList]);

  function handleCartClick(item) {
    const existingItem = cart.find((obj) => obj.id === item.id);
    if (existingItem) {
      const updatedData = cart.map((obj) =>
        obj.id === item.id ? { ...obj, amount: obj.amount + item.amount } : obj
      );
      setCart(updatedData);
    } else {
      setCart([...cart, item]);
      console.log(itemsList);
    }
    const updatedItemsList = itemsList.map((obj) =>
      obj.id === item.id
        ? { ...obj, confirmed: obj.confirmed + item.amount }
        : obj
    );
    setItemsList(updatedItemsList);
  }

  function handleItemIncrease(item) {
    const updatedData = itemsList.map((obj) =>
      obj.id === item.id ? { ...item, amount: item.amount + 1 } : obj
    );
    setItemsList(updatedData);
  }

  function handleItemDecrease(item) {
    const updatedData = itemsList.map((obj) =>
      obj.id === item.id ? { ...item, amount: item.amount - 1 } : obj
    );
    setItemsList(updatedData);
  }

  const handleSelected = (selectedLink) => {
    setSelected(selectedLink);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="pageBody">
      <nav>
        <div className="navBar">
          <div className="storeLogo">STORE NAME HERE</div>
          <ul className="navButtons">
            <li className={selected === "home" ? "active" : ""}>
              <Link to="home" onClick={() => handleSelected("home")}>
                Home
              </Link>
            </li>
            <li className={selected === "shop" ? "active" : ""}>
              <Link to="shop" onClick={() => handleSelected("shop")}>
                Shop
              </Link>
            </li>
            <li className={selected === "cart" ? "active" : ""}>
              <Link to="cart" onClick={() => handleSelected("cart")}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="pageContent">
        <Outlet
          context={{
            handleCartClick,
            itemsList,
            cart,
            handleItemDecrease,
            handleItemIncrease,
            handleClearCart,
          }}
        />
      </div>
      <div className="footer">Copyright © Zarate 2024</div>
    </div>
  );
}
