import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFormClick = (props: ArticleStateType) => {
		setArticleState(props);
	};

	const handleResetClick = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColorOption.value,
					'--container-width': articleState.contentWidthOption.value,
					'--bg-color': articleState.backgroundColorOption.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onResetClick={handleResetClick}
				onSubmitClick={handleFormClick}
			/>
			<Article />
		</main>
	);
};
