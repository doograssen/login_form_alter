import eye from '../../images/eye.svg';
import eyeClosed from '../../images/eye-closed.svg';

export const ShowPass = ({state, setState}) => {
	const clickHandler = () => state === 'text' ? setState('password') : setState('text');
	return (
		<button className="form-pass" type="button" aria-label="Показать пароль" onClick={clickHandler}>
			{ state === 'text' && <img src={eye} alt="Глаз"/>}
			{ state === 'password' && <img src={eyeClosed} alt="Глаз"/>}
		</button>
	);
};
