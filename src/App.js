import { useState } from 'react';
import './App.css';
import { LoginBtn } from './components/loginBtn/LoginBtn';
import { Modal } from './components/modal/Modal';

export const App = () => {
	const [modalState, setModalState] = useState(false);
	return (
		<div className="app">
			<header className="app-header">
				<div className="container">
					<LoginBtn clickHandler={() => setModalState(true)} />
				</div>
			</header>
			<main className="app-main"></main>
			<Modal state={modalState} clickHandler={() => setModalState(false)} />
		</div>
	);
};
