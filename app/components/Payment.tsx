import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { message } from "antd";
import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { GeneralCoreService } from "../config/GeneralCoreService";
import { getUser } from "../utility";

const stripePromise: any = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ amount }: any) {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState<any>(false)

  const handleEnrollment = () => {

    const userInfo = getUser()
    if (userInfo) {
      setLoading(true)
      const coursId = params?.id
      let payload = {
        user_id: userInfo?.id,
        course_id: coursId,
        status:'Pending'
      }
      GeneralCoreService('enrollment').Save(payload)
        .then((res) => {
          router.push('/dashboard/client')
        }).catch((err) => console.log(err)).finally(() => setLoading(false))
    } else {
      message.error('You need to sign in first to enroll in this course!')
    }
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }), // $50
    });

    const { clientSecret } = await res.json();

   
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setLoading(false)
      message.error(result.error.message);
    } else {
      setLoading(false)
      if (result.paymentIntent.status === "succeeded") {
        setLoading(false)
        message.success("Payment Successful 🎉");
        handleEnrollment()
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-1 max-w-4xl mx-auto">
      <CardElement className="border p-4 rounded" />
      <button
        type="submit"
        className="mt-4 bg-black w-full text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-900"
      >
        {loading ? 'Loading...' : `Pay ${amount}`}
      </button>
    </form>
  );
}

export default function Payment({ amount }: any) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
