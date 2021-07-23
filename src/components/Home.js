import React, { useEffect, useState } from "react";
import db, { auth } from "../firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((snapshot) => {
        const products = {};
        snapshot.forEach(async (producDoc) => {
          console.log(`Productos` , producDoc);
        });
      });
  }, []);
  return (
    <div>
      <h1>Welcome Home</h1>
      <button className="waves-effect red btn" onClick={() => auth.signOut()}>
        Sing out
      </button>
    </div>
  );
};

export default Home;
