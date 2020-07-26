import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Sort from "./components/Sort";
import { AddProduct } from "./components/AddProduct";
import { Product } from "./components/Product";

function App() {
  const [proTitle, setProTitle] = useState("");
  const [proPrice, setProPrice] = useState("");
  const [productList, setProductList] = useState(JSON.parse(localStorage.getItem("ReShoppingData")) ?? []);
  const autoFocusAddInput = useRef();
  const [inCartData, setInCartData] = useState([]);
  const [sortValue, setSortValue] = useState(null);

  //LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("ReShoppingData", JSON.stringify(productList));
  }, [productList]);

  // AUTO FOCUS
  useEffect(() => {
    autoFocusAddInput.current.focus();
  }, []);

  // PRODUCT TITLE
  const onChangeTitle = (title) => {
    setProTitle(title);
  };

  // PRODUCT PRICE
  const onChangePrice = (price) => {
    setProPrice(price);
  };

  // SUBMIT PRODUCT
  const submitProduct = (e) => {
    e.preventDefault();
    console.log(proTitle, " submitProduct");
    if (proTitle.trim()) {
      const product = { id: Date.now(), title: proTitle, price: proPrice, incart: false, fav: false };
      setProductList([...productList, product]);
      setProTitle("");
      setProPrice("");
      autoFocusAddInput.current.focus();
    } else {
      alert("Please type product title in the input field.");
    }
  };

  //DELETE PRODUCT
  const deleteProduct = (proId) => {
    console.log(proId, " in deleteProduct");
    const afterDeleteProList = productList.filter((p) => p.id !== proId);
    setProductList(afterDeleteProList);
  };

  // FILTER LIST CLICK
  const flListClick = (id) => {
    console.log(id, "FILTER LIST CLICK");
    setProductList(productList.filter((p) => p.id === id));
  };

  // MARK AS FAVOURITE
  const favHandler = (id) => {
    console.log(id, " in favHandler");
    const proListWithFav = [...productList];
    proListWithFav.map((p, index) => {
      if (p.id === id) p.fav = !p.fav;
      return proListWithFav;
    });
    setProductList(proListWithFav);
  };

  // ADD TO CART
  const inCartHandler = (id) => {
    console.log(id, " in inCartHandler");
    const proListWithCart = [...productList];
    proListWithCart.map((p, index) => {
      if (p.id === id) p.incart = !p.incart;
      return proListWithCart;
    });
    setProductList(proListWithCart);
  };

  // SET IN-CART DATA
  useEffect(() => {
    const cartItems = productList.filter((p) => p.incart === true);
    setInCartData(cartItems);
  }, [productList]);

  // REMOVE INCART ITEM
  const removeInCartHandler = (id) => {
    console.log(id, " in removeInCartHandler");
    const proList = [...productList];
    proList.map((p) => {
      if (p.id === id) p.incart = false;
      return proList;
    });
    setProductList(proList);
    const removedCartItem = inCartData.filter((c) => c.id !== id);
    setInCartData(removedCartItem);
  };

  // REMOVE ALL ITEMS FROM CART
  const removeAllCartItems = () => {
    console.log("removeAllCartItems fires...");
    setInCartData([]);
    const proList = [...productList];
    proList.map((p) => {
      p.incart = false;
      return proList;
    });
    setProductList(proList);
  };

  // ONCHANGE SORT VALUE
  const sortOnchangeHandler = (value) => {
    setSortValue(value);
  };

  useEffect(() => {
    if (sortValue === "title") {
      const d1 = [...productList].sort((a, b) => {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      });
      setProductList(d1);
    }
    if (sortValue === "price") {
      const d1 = [...productList].sort((a, b) => {
        let x = a.price;
        let y = b.price;
        return x - y;
      });
      setProductList(d1);
    }
    if (sortValue === "favourite") {
      const d1 = [...productList].sort((a, b) => {
        let x = a.fav;
        let y = b.fav;
        if (x > y) return -1;
        if (x < y) return 1;
        return 0;
      });
      setProductList(d1);
    }
  }, [sortValue]);

  return (
    <div className="wrapper">
      <Header inCartData={inCartData} removeInCartHandler={removeInCartHandler} removeAllCartItems={removeAllCartItems} />

      <div className="product_wrapper">
        <div className="container-fluid">
          <div className="row">
            <AddProduct
              autoFocusAddInput={autoFocusAddInput}
              proTitle={proTitle}
              onChangeTitle={onChangeTitle}
              proPrice={proPrice}
              onChangePrice={onChangePrice}
              submitProduct={submitProduct}
            />

            <Search productList={productList} flListClick={flListClick} />

            <Sort sortOnchangeHandler={sortOnchangeHandler} />
          </div>
          <div className="row" id="prods_row">
            {productList.length ? (
              productList.map((pro) => (
                <Product key={pro.id} pro={pro} deleteProduct={deleteProduct} favHandler={favHandler} inCartHandler={inCartHandler} removeAllCartItems={removeAllCartItems} />
              ))
            ) : (
              <div className="d-block mx-auto my-5"> Not a single product found here, add some product. </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
