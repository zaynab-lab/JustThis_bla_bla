import { useState } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";

export default function OrdersPage() {
  const [current, setCurrent] = useState(true);
  return (
    <>
      <TopBar title="الطلبيات" page={true} />
      <div className="topBar">
        <div
          className={`topBar-item ${current && "current"}`}
          onClick={() => setCurrent(true)}
        >
          الحالية
        </div>
        <div
          className={`topBar-item ${!current && "current"}`}
          onClick={() => setCurrent(false)}
        >
          السابقة
        </div>
      </div>
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
        .topBar {
          display: flex;
          width: 100%;
          border-bottom: 1px solid ${styles.primaryColor};
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
