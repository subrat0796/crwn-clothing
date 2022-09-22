import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const navigateOnSuccessHandler = () => navigate("/shop");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Please check passwords");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });
			navigateOnSuccessHandler();
			resetFormFields();

			return toast.success("Account created successfully", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			if (err.code === "auth/email-already-in-use") {
				// alert("Cannot create user , email already exist");
				return toast.error("Cannot create user, email already exist", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				// console.log(`Error in creating user account :${err}`);
				return toast.error("There was an error while creating the account", {
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
		<SignUpContainer>
			<h2>Don't have and account?</h2>
			<span>Sign up with your email and password</span>

			<form
				onSubmit={() => {
					handleFormSubmit();
				}}
			>
				<FormInput
					label={"Display Name"}
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>

				<FormInput
					label="Email"
					type={"email"}
					name="email"
					value={email}
					required
					onChange={handleChange}
				/>

				<FormInput
					label="Password"
					type={"password"}
					name="password"
					value={password}
					required
					onChange={handleChange}
				/>

				<FormInput
					label="Confirm Password"
					type={"password"}
					name="confirmPassword"
					value={confirmPassword}
					required
					onChange={handleChange}
				/>

				<Button type="submit" onClick={handleFormSubmit}>
					Sign Up
				</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
