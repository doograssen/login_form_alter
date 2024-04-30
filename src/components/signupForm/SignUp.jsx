import { useState } from 'react';
import { FormField } from '../formField/FormField';
import { useStore } from '../hooks/useStore';
import { useForm } from 'react-hook-form';
import './signup.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const sendFormData = (formData) => {
	console.log(formData);
};

const ERRORS = {
	WRONG_EMAIL: 'неверный формат почты',
	EMPTY: 'Поле обязательно для заполнения',
	SHORT_PASSWORD: 'слишком короткий пароль',
	FORMAT_PASSWORD: 'пароль должен содержать латтинские буквы, цифры и символы',
	MATCHING_PASSWORDS: 'пароли не совпадают',
};

const emailChangeScheme = yup.string()
	.matches(
		/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
		ERRORS.WRONG_EMAIL
	);

const passwordChangeScheme = yup.string()
	.matches(
		/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
		ERRORS.FORMAT_PASSWORD
	)
	.min(8, ERRORS.SHORT_PASSWORD);

const passwordConfirmScheme = yup.object().shape({
  password: yup
    .string(),
  passwordConfirmation: yup
    .string()
    .test('match',
      ERRORS.MATCHING_PASSWORDS,
       function(passwordConfirmation) {
         return passwordConfirmation === this.parent.password;
       }),
});

const emptyBlurScheme = yup.string()
	.min(1, ERRORS.EMPTY);

const validateAndGetErrorMessage = (scheme, value) => {
	let errorMessage = null;
	try {
		scheme.validateSync(value);
	} catch ({errors}) {
		errorMessage = errors[0];
	}
	return errorMessage;
};

export const SignUp = () => {
	const {getState, updateStateByName, updateFullState} = useStore();
	const currentState = getState();
	const {password, passwordConfirm} = currentState;
	const [formStatus, setFormStatus] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();
		sendFormData(getState());
	};

	const validateInput = (field) => {
		let error = null;
		let validate = false;
		switch (field.name) {
			case 'email':
				error = validateAndGetErrorMessage(emailChangeScheme, field.value);
				break;

			case 'password':
				error = validateAndGetErrorMessage(passwordChangeScheme, field.value);
				break;
			case 'passwordConfirm':
				error = validateAndGetErrorMessage(passwordConfirmScheme, {password: password.value, passwordConfirmation: field.value});
				break;

			default:
				break;
		}
		if (!error) {
			validate = true;
		}
		return {
			value: field.value,
			validate: validate,
			error: error,
		};
	};

	const validateInputBlur = (field) => {
		let initError = currentState[field.name].error;
		console.log(initError);
		let error = null;
		let validate = false;
		error = validateAndGetErrorMessage(emptyBlurScheme, field.value);
		if (!error && !initError && field.value) {
			validate = true;
		}
		return {
			value: field.value,
			validate: validate,
			error: initError && field.value ? initError : error,
		};
	};

	const onChange = ({ target }) => {
		let state	= validateInput(target);
		let fullState = currentState;
		if (target.name !== 'password' || passwordConfirm.value === '') {
			updateStateByName(target.name, state);
			fullState = { ...currentState, [target.name]: state};

		}
		else {
			const confirmValidate =
			validateAndGetErrorMessage(passwordConfirmScheme, {password: target.value, passwordConfirmation: passwordConfirm.value});
			fullState = { ...currentState, 'password': state, 'passwordConfirm': {...passwordConfirm, error: confirmValidate, validate: !confirmValidate}};
			updateFullState(fullState);
		}
		setFormStatus(() => !Object.values(fullState).some((element) => !element.validate));
	};

	const onBlur = ({ target }) => {
		if (!['email', 'password'].includes(target.name)) return false;
		let state	= validateInputBlur(target);
		let fullState = currentState;
		updateStateByName(target.name, state);
		fullState = { ...currentState, [target.name]: state};
		setFormStatus(() => !Object.values(fullState).some((element) => !element.validate));
	};

	return (
		<form className="form" onSubmit={submitHandler}>
			<FormField
				name="email"
				label="Email"
				type="text"
				changeHandler={onChange}
				blurHandler={onBlur}
				state={currentState} />
			<FormField
				name="password"
				label="Пароль"
				type="password"
				changeHandler={onChange}
				blurHandler={onBlur}
				state={currentState} />
			<FormField
				name="passwordConfirm"
				label="Повторить пароль"
				type="password"
				changeHandler={onChange}
				state={currentState} />
			<button className="form-submit" type="submit" disabled={formStatus === false}>Зарегистрироваться</button>
		</form>
	);
}

