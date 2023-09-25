import React, { useState, useEffect } from 'react';
import KeywordListItem from 'components/atoms/common/KeywordListItem';
import { getPopularKeywordApi } from 'utils/apis/keyword';
import { IKeyword } from 'types/keyword';
import { DUMMY_KEYWORDS } from 'constants/dummy';
import { TrendingKeywordListContainer } from './style';

function TrendingKeywordList() {
	const [keywords, setKeywords] = useState<IKeyword[]>([]);

	const fetchData = async () => {
		try {
			const response = await getPopularKeywordApi();
			setKeywords(response.data);
			console.log('::getPopularKeywordApi', response);
			setKeywords(DUMMY_KEYWORDS);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<TrendingKeywordListContainer>
			{keywords.length ? (
				keywords.map((el) => <KeywordListItem key={el.keywordId} text={el.word} />)
			) : (
				<div>키워드가 없습니다</div>
			)}
		</TrendingKeywordListContainer>
	);
}

export default TrendingKeywordList;