import { useState } from 'react';

const INITIAL_STATE = {
	email: {
		value: '',
		validate: false,
		error: null,
	},
	password: {
		value: '',
		validate: false,
		error: null,
	},
	passwordConfirm: {
		value: '',
		validate: false,
		error: null,
	},
};

export const useStore = () => {
	const [state, setState] = useState(INITIAL_STATE);
	return {
		getState: () => state,
		updateStateByName: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		updateFullState: (newState) => {
			setState(newState);
		},
	};
};
