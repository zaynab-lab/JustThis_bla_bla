import { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";
import axios from "axios";
import Loader from "../../components/Loader";
import GeneralMPage from "../../components/Management/GeneralMPage";
import ProductsPage from "../../components/Management/ProductsPage";

export default function Conditions() {
  const [current, setCurrent] = useState("");
  const [loadpage, setLoadpage] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios
      .get("/authentication")
      .then((res) => {
        const { data } = res;
        if (data !== "noToken" && data !== "invalid") {
          setRoles(data.roles);
        }
      })
      .then(() => setLoadpage(true));
  }, [setRoles]);

  return (
    <>
      <TopBar title="الصفحة الإدارية" page={true} />
      {!loadpage && <Loader />}
      {loadpage && (
        <div className="container">
          <div className="topBar">
            {roles.includes("GM") && (
              <div
                className={`topBar-item ${current === "GM" && "current"}`}
                onClick={() => setCurrent("GM")}
              >
                العامة
              </div>
            )}

            {roles.includes("productsManager") && (
              <div
                className={`topBar-item ${current === "products" && "current"}`}
                onClick={() => setCurrent("products")}
              >
                المنتجات
              </div>
            )}
            {roles.includes("customersManager") && (
              <div
                className={`topBar-item ${
                  current === "customers" && "current"
                }`}
                onClick={() => setCurrent("customers")}
              >
                الزبائن
              </div>
            )}
            {roles.includes("ordersManager") && (
              <div
                className={`topBar-item ${current === "orders" && "current"}`}
                onClick={() => setCurrent("orders")}
              >
                الطلبيات
              </div>
            )}
          </div>
          {roles.includes("GM") && current === "GM" && <GeneralMPage />}

          {roles.includes("productsManager") && current === "products" && (
            <ProductsPage />
          )}
          {roles.includes("customersManager") && current === "customers" && (
            <div>customers menu</div>
          )}
          {roles.includes("ordersManager") && current === "orders" && (
            <div>orders menu</div>
          )}
        </div>
      )}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          font-weight: 800;
          box-sizing: border-box;
          text-decoration: unset;
          outline: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          direction: rtl;
          overscroll-behavior: contain;
        }
      `}</style>
      <style jsx>{`
        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
        }

        .topBar {
          display: flex;
          width: 100%;
          border-bottom: 1px solid ${styles.primaryColor};
          overflow: auto;
        }

        .topBar-item {
          text-align: center;
          padding: 0.2rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .current {
          color: ${styles.secondaryColor};
          font-size: 1.4rem;
          flex: 1 1 100%;
        }
      `}</style>
    </>
  );
}
