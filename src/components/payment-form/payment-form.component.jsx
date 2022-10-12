import { useState } from "react";
import { toast } from "react-toastify";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../features/user/userSelector";
import { selectCartTotal } from "../../features/cart/cartSelector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
	FormContainer,
	PaymentFormContainer,
	PaymentButton,
} from "./payment-form.styles";

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return toast.error(
				"There is some issue with payment please try again later !!",
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
		} else if (!currentUser) {
			return toast.error("Please login before doing payment", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

		setIsProcessingPayment(true);

		const { data: response } = await axios.post(
			"/.netlify/functions/create-payment-intent",
			// "/.netlify/functions/hello",
			{
				amount: amount * 100,
			}
		);

		// console.log(response);

		const {
			paymentIntent: { client_secret },
		} = response;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser.displayName,
				},
			},
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) {
			console.log(paymentResult.error);
			return toast.error(
				"There is some issue with payment please try again later !!",
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
		} else {
			if (paymentResult.paymentIntent.status === "succeeded") {
				return toast.success("Payment successfully completed", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment : </h2>
				<CardElement />
				<PaymentButton
					// disabled={isProcessingPayment}
					isLoading={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Pay now
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
