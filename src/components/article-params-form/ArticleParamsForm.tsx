import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import { clsx } from 'clsx';
import { ArticleStateType, defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormType = {
	setArticleStyles: ({}: ArticleStateType) => void;
};
 
export const ArticleParamsForm = ({	setArticleStyles }: ArticleParamsFormType) => {
	const [selectedStyles, setSelectedStyles] = useState(defaultArticleState);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	function handleReset (e: React.FormEvent) {
		e.preventDefault();
		setArticleStyles(defaultArticleState);
		setSelectedStyles(defaultArticleState);
	};

	function handleSubmit (e: React.FormEvent) {
		e.preventDefault();
		setArticleStyles(selectedStyles);
	};

	useOutsideClickClose({
		isOpen: isModalOpen,
		rootRef: ref,
		onClose: () => setIsModalOpen(false),
	});

	return (
		<>
			<ArrowButton onClick={() => setIsModalOpen(!isModalOpen)} isModalOpen={isModalOpen} />
			<aside ref={ref} className={clsx(styles.container, {
					[styles.container_open]: isModalOpen,
				})}>
				<form className={styles.form} onReset={handleReset} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedStyles.fontFamilyOption}
						title='Шрифт'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedStyles.fontSizeOption}
						title='Размер шрифта'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontSizeOption: option })
						}
					/>
					<Select
						options={fontColors}
						selected={selectedStyles.fontColor}
						title='Цвет шрифта'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontColor: option })
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedStyles.backgroundColor}
						title='Цвет фона'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, backgroundColor: option })
						}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedStyles.contentWidth}
						title='Ширина контента'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};