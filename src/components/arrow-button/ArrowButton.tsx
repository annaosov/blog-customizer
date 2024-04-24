import arrow from 'src/images/arrow.svg';
import { clsx } from 'clsx';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type IButtonProps = {
	onClick?: OnClick;
	isModalOpen?: boolean;
};

export const ArrowButton = ({ onClick, isModalOpen }: IButtonProps) => {
	console.log()
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={clsx(styles.container, {
				[styles.container_open]: isModalOpen,
			})}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, {
					[styles.arrow_open]: isModalOpen,
				})} />
		</div>
	);
};
