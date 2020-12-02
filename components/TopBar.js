import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { useRecoilValue } from "recoil";
import { cartListState } from "../pages/cart";
import { styles } from "../public/js/styles";

export default function TopBar({ title, page, cart, main }) {
  const cartList = useRecoilValue(cartListState);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    cartList.length
      ? setQuantity(cartList.map((obj) => obj.quantity).length)
      : setQuantity(0);
  }, [cartList]);

  return (
    <>
      <div className="topBar">
        {!main ? (
          page ? (
            <div
              className="arrow"
              onClick={() => Router.back() || Router.push("/")}
            >
              &#8735;
            </div>
          ) : (
            <div
              className="home"
              onClick={() => Router.push("/") || Router.back()}
            >
              &#8962;
            </div>
          )
        ) : (
          <div className="burger" onClick={() => Router.push("/menu")}>
            |||
          </div>
        )}
        {title}
        {cart ? (
          <Link href="/cart">
            <div className="cart">
              <span className="point">{quantity}</span>
              <span role="img" aria-label="cart">
                &#128722;
              </span>
            </div>
          </Link>
        ) : (
          <div className="empty"></div>
        )}
      </div>
      <style jsx>{`
        .topBar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: ${styles.primaryColorLight};
          color: white;
          height: 3rem;
          width: 100%;
          font-size: 1.3rem;
          padding: 0.6rem;
        }
        .burger {
          color: white;
          transform: rotate(90deg);
          font-size: 1.6rem;
        }
        .arrow {
          transform: translateX(-0.5rem) rotate(-135deg);
        }
        .home {
          font-size: 1.5rem;
          transform: translateX(-0.5rem);
        }
        .cart {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.8rem;
          background: white;
          border-radius: 0.2rem;
          padding: 0.2rem;
          font-size: 1.2rem;
        }
        .point {
          width: 1.4rem;
          height: 1.4rem;
          background: white;
          border: 1px solid ${styles.primaryColorLight};
          position: absolute;
          transform: translate(1.2rem, -0.85rem);
          border-radius: 1rem;
          font-size: 0.9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${styles.primaryColor};
        }
        .empty {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
