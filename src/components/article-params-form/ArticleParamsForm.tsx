import { clsx } from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColorOptions,
	backgroundColorOptions,
	contentWidthArrOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from 'components/separator';
import { Text } from '../text';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onSubmitClick: (props: ArticleStateType) => void;
	onResetClick: () => void;
};

export const ArticleParamsForm = ({
	onSubmitClick,
	onResetClick,
}: ArticleParamsFormProps) => {
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmitClick(state);
		setIsMenuOpen(false);
	};

	const handleFormReset = () => {
		onResetClick();
		setState(defaultArticleState);
		setIsMenuOpen(false);
	};

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement | null>(null);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const containerStyles = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});

	const handleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: rootRef,
		onChange: () => setIsMenuOpen(false),
	});

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={handleForm} state={isMenuOpen} />
			<aside className={containerStyles}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						onChange={handleOnChange('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						selected={state.fontColorOption}
						options={fontColorOptions}
						placeholder='Чёрный'
						onChange={handleOnChange('fontColorOption')}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColorOption}
						options={backgroundColorOptions}
						placeholder='Белый'
						onChange={handleOnChange('backgroundColorOption')}
						title='цвет фона'
					/>
					<Select
						selected={state.contentWidthOption}
						options={contentWidthArrOptions}
						placeholder='Широкий'
						onChange={handleOnChange('contentWidthOption')}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleFormReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
