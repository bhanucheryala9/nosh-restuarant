import { Flex } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#DD6B20",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#DD6B20" },
      "::placeholder": { color: "#DD6B20" },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

export default function PaymentForm(props: { setCardDetails: any }) {
  const { setCardDetails } = props;
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    const { error, paymentMethod } = (await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement) as any,
    })) as any;
    const { id } = paymentMethod;
    setCardDetails(id)
    // if (!error) {
    //   try {
    //     const response = await axios.post("http://localhost:4000/payment", {
    //       amount: props.finalAmount,
    //       id,
    //     });

    //     if (response.data.success) {
    //       console.log("Successful payment");
    //       setSuccess(true);
    //       localStorage.setItem("userInfo", JSON.stringify({}))
    //     }
    //   } catch (error) {
    //     console.log("Error", error);
    //   }
    // } else {
    //   console.log(error.message);
    // }
  };

  return (
    <>
      <div className="FormRow">
        <CardElement options={CARD_OPTIONS as any} onChange={handleSubmit} />
      </div>
    </>
  );
}
