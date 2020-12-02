import CategoryItems from "../components/CategoryItems";
import TopBar from "../components/TopBar";
import LoadData from "../components/LoadData";
import Orders from "../components/Orders";

export default function IndexPage() {
  return (
    <div>
      <div className="container">
        <div className="page">
          <TopBar title="الفئات" cart={true} main={true} />
          <div className="content">
            <Orders />
            <CategoryItems />
          </div>
          <LoadData />
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
          font-family: sans-serif;
          overscroll-behavior: contain;
        }
      `}</style>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: hidden;
        }

        .content {
          overflow: auto;
          height: calc(100vh - 3rem);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
