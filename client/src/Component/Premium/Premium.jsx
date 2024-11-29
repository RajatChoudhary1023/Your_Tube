import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserPremiumStatus } from '../../action/currentuser';
import './Premium.css';

function Premium() {
  const [isPopupOpen, setIsPopupOpen] = useState(true); 
  const dispatch = useDispatch();
  const currentuser=useSelector(state => state.currentuserreducer);
  const amount = 50000;
  const currency = "INR";
  const receiptId = "qwsaq1";


 
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const paymentHandler = async (e) => {
    e.preventDefault(); 

    const userId = currentuser.result._id;
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);


    const options = {
      key:process.env.RAZORPAY_KEY_ID, 
      amount, 
      currency,
      name: "Your-Tube", 
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, 
      handler: async function (response) {
        const body = JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId, 
        });

        const validateRes = await fetch("http://localhost:5000/order/validate", {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response status:", validateRes.status);

  if (!validateRes.ok) {
    const errorText = await validateRes.text();
    console.error("Error response from server:", errorText);
    throw new Error(`Server error: ${validateRes.status}`);
  }

        const jsonRes = await validateRes.json();
        console.log(jsonRes);

        if (jsonRes.msg === "success") {
            dispatch({ type: "UPDATE_USER_PREMIUM_STATUS", payload: true });
            localStorage.setItem(
              "currentuser",
              JSON.stringify({
                ...currentuser,
                result: { ...currentuser.result, ispremium: true },
              })
            );
    
            closePopup(); 
          }
      },
      prefill: {
        name: "Rajat Choudhary", 
        email: "c.rajat1006@gmail.com",
        contact: "9000000000", 
      },
      notes: {
        address: "Pune",
      },
      theme: {
        color: "rgb(255, 60, 60)",
      },
    };


    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);


      closePopup();
    });

    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {isPopupOpen && !currentuser?.result?.ispremium && (
        <div id="popup-overlay" className="overlay">
          <div className="popup">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            <h2>Upgrade to Premium</h2>
            <p>Upgrade to premium to download videos.</p>
            <button onClick={paymentHandler}>Get Premium</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Premium;
