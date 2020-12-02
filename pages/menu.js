import { useEffect, useState } from "react";
import Link from "next/link";
import TopBar from "../components/TopBar";
import axios from "axios";
import { styles } from "../public/js/styles";
import { useRecoilState } from "recoil";
import { userNameState } from "../components/Name";
import Loader from "../components/Loader";

export default function Menu() {
  const [userName, setUserName] = useRecoilState(userNameState);
  const [amount, setAmount] = useState("-");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://localhost:3000/authentication`)
      .then((res) => {
        const { data } = res;
        if (data !== "noToken" && data !== "invalid") {
          setUserName(data.name);
          setAmount(data.amount);
        }
      })
      .then(() => setLoading(false));
  }, [setUserName]);

  return (
    <>
      <TopBar title="الإعدادات" page={true} />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="menuContainer">
            <div className="menu-header">
              <div className="menu-userImg">
                <img className="menu-Img" src="/img/png/Profile.png" alt="" />
              </div>
              {userName !== "" ? (
                <div className="userName">{userName}</div>
              ) : (
                <Link href="/Login">تسجيل الدخول</Link>
              )}
            </div>

            <ul>
              {userName !== "" && (
                <>
                  <Link href="/details/profile">
                    <li>الملف الشخصي</li>
                  </Link>
                  <li className="amount-container">
                    الرصيد <span className="amount">{amount}</span>
                    <button
                      className="chargebtn"
                      onClick={() => alert("هذه الخدمة ليست متوفرة حالياً")}
                    >
                      شحن
                    </button>
                  </li>
                  <li>كد خصم</li>
                  <Link href="/details/orders">
                    <li>الطلبيات السابقة</li>
                  </Link>
                </>
              )}
              <Link href="/details/customers">
                <li>حقوق الزبون</li>
              </Link>
              <Link href="/details/conditions">
                <li>شرائط الاستخدام</li>
              </Link>
              <Link href="https://wa.me/+96181026095?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C+%D8%A8%D8%AF%D9%8A+%D8%AA%D8%B3%D8%A7%D8%B9%D8%AF%D9%86%D9%8A+%D8%A8%D9%80">
                <li>اتصل بنا</li>
              </Link>
            </ul>
          </div>
        </>
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
          font-family: sans-serif;
          overscroll-behavior: contain;
        }
      `}</style>
      <style jsx>{`
        .menu-header {
          height: 10rem;
          color: ${styles.primaryColorLight};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .menu-userImg {
          margin: 0.5rem;
          width: 7rem;
          height: 7rem;
          background: white;
          border-radius: 8rem;
        }

        .menu-Img {
          width: 100%;
          height: 100%;
          padding: 0.1rem;
          fill: grey;
          opacity: 60%;
        }

        .userName {
          font-size: 1.2rem;
        }

        li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .amount-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .amount:after {
          margin: auto 0.5rem;
          content: "ل.ل";
        }

        .menuContainer {
          flex: 1 1 40%;
          width: 100vw;
          height: calc(100vh - 3rem);
          border-right: 1px solid ${styles.primaryColorLight};
        }

        .chargebtn {
          background: white;
          border: 1px solid ${styles.primaryColor};
          padding: 0.2rem 0.8rem;
          border-radius: 0.2rem;
        }
      `}</style>
    </>
  );
}
