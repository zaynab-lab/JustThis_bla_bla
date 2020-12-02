import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "../components/TopBar";
import Products from "../components/ProductsList";
import { useRecoilValue } from "recoil";
import { items } from "../public/js/items";
import LoadData, { productsState } from "../components/LoadData";

export default function Page() {
  const [pageProducts, setPageProducts] = useState([]);
  const [title, setTitle] = useState("");
  const productList = useRecoilValue(productsState);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    setPageProducts(productList.filter((obj) => obj.catagory === page));
    const p = items.find((obj) => obj.name === page);
    setTitle(p && p.title);
  }, [productList, page, setTitle]);

  return (
    <>
      <TopBar title={title} page={true} cart={true} />
      <Products pageProducts={pageProducts} />
      <LoadData />
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

      <style jsx>
        {`
          .page {
            height: calc(100vh - 3rem);
            overflow: scroll;
          }
        `}
      </style>
    </>
  );
}
