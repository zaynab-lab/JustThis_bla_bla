import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";

export default function Customer() {
  return (
    <>
      <TopBar title="حقوق الزبون" page={true} />
      <div className="container">
        <div className="title">شروط إرجاع المنتجات</div>
        <ul>
          <li>
            يمكن إرجاع المنتج في حال عدم تطابقه مع المواصفات المطلوبة، بشرط
            سلامته.
          </li>
          <li>
            يمكن إرجاع المنتجات غير الاستهلاكية في حال الإنصراف عن شرائها قبل
            مدة اقصاها 48 ساعة، ويشترط في ذلك سلامة المنتج .
          </li>
        </ul>
        <div className="title">سياسة الخصوصية</div>
        <ul>
          <li></li>
          <li></li>
        </ul>
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
        .container {
          padding: 0.5rem;
          font-size: 1.1rem;
        }
        li {
          padding: 0.5rem;
          border-bottom: 1px solid #eee;
        }
        li:before {
          content: " - ";
        }
        .title {
          padding-top: 2rem;
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
