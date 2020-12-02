import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { products } from "../public/js/products";
import { cartListState } from "../pages/cart";

export const productsState = atom({
  key: "productsList",
  default: []
});

export default function LoadData() {
  const setCartList = useSetRecoilState(cartListState);
  const setProducts = useSetRecoilState(productsState);

  useEffect(() => {
    setProducts(products);
    localStorage.getItem("cartList") &&
      setCartList(JSON.parse(localStorage.getItem("cartList")));
  }, [setCartList, setProducts]);
  return <></>;
}
