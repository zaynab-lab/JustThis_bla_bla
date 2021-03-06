import { styles } from "../public/js/styles";
import Cloud from "./Loaders/Cloud";
export default function Loader() {
  return (
    <>
      <div className="loading">
        <div className="loading-title">جاري تحميل البيانات</div>
        <div className="svg">
          <Cloud />
        </div>
      </div>
      <style jsx>{`
        .loading {
          height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loading-title {
          font-size: 1.3rem;
          color: ${styles.primaryColorLight};
        }

        .svg {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </>
  );
}
