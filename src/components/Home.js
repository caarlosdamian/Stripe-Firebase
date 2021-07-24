import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import db, { auth } from "../firebase";
import "../styles/Home.css";
import { UserContext } from "../UserContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [subscription, setSubcription] = useState(null);
  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((snapshot) => {
        snapshot.forEach((susbcriptions) => {
          console.log("subs" + susbcriptions.data());
          setSubcription({
            role:susbcriptions.data().role,
            current_period_start:susbcriptions.data().current_period_start,
            current_period_end:susbcriptions.data().current_period_end,
          })
        });
      });
  }, []);
  const { user } = useContext(UserContext);
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((snapshot) => {
        const products = {};
        snapshot.forEach(async (productDoc) => {
          // products[productDoc.id]
          products[productDoc.id] = productDoc.data();
          const priceSnapshot = await productDoc.ref.collection("prices").get();
          priceSnapshot.forEach((priceDoc) => {
            products[productDoc.id].prices = {
              priceId: priceDoc.id,
              priceData: priceDoc.data(),
            };
          });
        });
        console.log("products", products);
        console.log("Object.entries", Object.entries(products));
        setProducts(products);
      });
  }, []);
  const checkOut = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(error.message);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51JGBXmIrHzLzs1mzQ9ICeQsXucPOGzCJtSbDkpDt8oV0qKBmOaKR8qYYYzOGuruCkSrcAzSt3I6Y2w6ysOhE6EWw00rfcEHkXK"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div>
      <div>
        <h1>Welcome Home</h1>
        <button className="waves-effect red btn" onClick={() => auth.signOut()}>
          Sing out
        </button>
      </div>
      {Object.entries(products).map(([productId, productdata]) => {
        const isCurrentPlan = productdata?.name?.toLowerCase().includes(subscription?.role)
        return (
          <div className="plan-card">
            <div className="row">
              <div className="col s12 m7">
                <div className="card">
                  <span className="card-title">{productdata.name}</span>

                  <div className="card-content">
                    <p>{productdata.description}</p>
                  </div>
                  <div className="card-action">
                    <button
                    disabled={isCurrentPlan}
                      className="waves-effect green btn"
                      onClick={() => checkOut(productdata.prices.priceId)}
                    >
                      Suscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
