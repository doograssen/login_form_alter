
import loginImg from '../../images/login.svg';
import './login.css';

export const LoginBtn = ({clickHandler}) => {
	return (
		<button className="login" aria-label="login" onClick={clickHandler}>
			<img src={loginImg} alt="login"/>
		</button>
	);
};
