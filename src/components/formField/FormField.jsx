import { useState } from "react";
import { ShowPass } from "../showPass/ShowPass";

export const FormField = ({name, label, type, changeHandler, blurHandler, state}) => {
	const [fieldType, setFieldType] = useState(type);

	return (
		<div className="form-block">
			<label htmlFor={name}>{label}*</label>
			<input
				id={name}
				className="form-input"
				name={name}
				type={ type === 'text' ? type : fieldType }
				placeholder={label}
				value={state[name].value}
				onChange={changeHandler}
				onBlur={blurHandler}
			/>
			{ type === 'password' &&  <ShowPass state={fieldType} setState={setFieldType}/>}
			{state[name].error && <div className="form-error">{state[name].error}</div>}
		</div>
	);
}
