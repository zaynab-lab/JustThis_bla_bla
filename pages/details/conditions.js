import TopBar from "../../components/TopBar";

export default function Conditions() {
  return (
    <>
      <TopBar title="شرائط الاستخدام" page={true} />
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
    </>
  );
}
