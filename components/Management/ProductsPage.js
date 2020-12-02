import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import EditProduct from "./components/EditProduct";
import ProductCart from "./components/ProductCart";
import CategoryList from "./components/CategoryList";

export default function ProductsPage() {
  const [roles, setRoles] = useState("");
  const [productList, setProductsList] = useState([]);
  useEffect(() => {
    axios.get(`https://localhost:3000/authentication`).then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get(`https://localhost:3000/getProductList`).then((res) => {
      const { data } = res;
      setProductsList(data);
    });
  }, [setRoles]);

  return (
    <>
      {roles.includes("productsManager") && (
        <div className="container">
          <CategoryList />
          <>
            {productList.map((obj, index) => (
              <ProductCart key={index} product={obj} />
            ))}
          </>
          <Modal>
            <EditProduct add={true} />
          </Modal>
        </div>
      )}
      <style jsx>{`
        .container {
          height: calc(100vh - 6.1rem);
          overflow: auto;
        }
      `}</style>
    </>
  );
}
