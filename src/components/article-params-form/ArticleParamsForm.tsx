import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useState, useRef, useEffect } from 'react';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	setParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	params,
	setParams,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentParams, setCurrentParams] = useState<ArticleStateType>(params);

	const form = useRef<HTMLFormElement>(null);

	const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setParams(currentParams);
		setIsOpen(false);
	};

	const formResetHandler = () => {
		setCurrentParams(defaultArticleState);
		setParams(defaultArticleState);
	};

	useEffect(() => {
		const closeEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};
		document.addEventListener('keydown', closeEsc);

		const handleClickOutside = (event: MouseEvent) => {
			if (form.current && !form.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', closeEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (item: OptionType) => {
		setCurrentParams({ ...currentParams, fontFamilyOption: item });
	};

	const handlerFontColorChange = (item: OptionType) => {
		setCurrentParams({ ...currentParams, fontColor: item });
	};

	const handlerBackgroundChange = (item: OptionType) => {
		setCurrentParams({ ...currentParams, backgroundColor: item });
	};

	const handlerContentWidthChange = (item: OptionType) => {
		setCurrentParams({ ...currentParams, contentWidth: item });
	};

	const handlerFontSizeChange = (item: OptionType) => {
		setCurrentParams({ ...currentParams, fontSizeOption: item });
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					ref={form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					className={styles.form}>
					<Text
						as='h2'
						size={31}
						weight={800}
						family={'open-sans'}
						uppercase
						dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={currentParams.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='font size'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={currentParams.fontSizeOption}
						onChange={handlerFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentParams.fontColor}
						onChange={handlerFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentParams.backgroundColor}
						onChange={handlerBackgroundChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentParams.contentWidth}
						onChange={handlerContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
