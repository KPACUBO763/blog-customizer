import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	state: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ onClick, state }: ArrowButtonProps) => {
	const containerStyles = clsx(styles.container, {
		[styles.container_open]: state,
	});

	const arrowStyles = clsx(styles.arrow, {
		[styles.arrow_open]: state,
	});

	return (
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerStyles}>
			<img src={arrow} alt='иконка стрелочки' className={arrowStyles} />
		</div>
	);
};
