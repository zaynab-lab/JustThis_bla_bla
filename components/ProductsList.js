import ProductCard from "./ProductCard";

export default function ProductsList({ pageProducts }) {
  return (
    <>
      <div>
        <div className="productsList">
          {pageProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .productsList {
          overflow: auto;
          display: flex;
          flex-wrap: wrap;
          height: calc(100vh - 3rem);
        }
      `}</style>
    </>
  );
}
