import axios from "axios";
import { useEffect, useState } from "react";
import { styles } from "../../../public/js/styles";

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    axios.get(`/getCategory`).then((res) => {
      const { data } = res;
      setCategoryList(data);
    });
  }, []);
  return (
    <>
      <div className="categoryList-container">
        {categoryList.map((obj) => (
          <div className="categoryList-content">
            <div className="categoryList-content-item">{obj.title}</div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .categoryList-container {
          display: flex;
          align-items: center;
          height: 3rem;
          overflow-y: hidden;
        }
        .categoryList-content {
          display: flex;
          align-items: center;
          padding: 0.2rem 0.8rem;
          margin: 0.2rem;
          border: 1px solid ${styles.primaryColor};
          border-radius: 10rem;
        }
        .categoryList-content-item {
          width: fit-content;
          word-wrap: unset;
          overflow-wrap: unset;
        }
      `}</style>
    </>
  );
}
