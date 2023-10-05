import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getAllVocabularyApi, getCheckVocabularyApi } from 'utils/apis/vocabulary';
import { VocabularyHeaderContainer } from './style';

interface IVocabularyHeaderProps {
	setIsChecked: Dispatch<SetStateAction<boolean>>;
}

function VocabularyHeader(props: IVocabularyHeaderProps) {
	const { setIsChecked } = props;
	const [vocaCheckCnt, setVocaCheckCnt] = useState(0);
	const memberkey = localStorage.getItem('memberkey');
	const [allVoca, setAllVoca] = useState(0);
	const handleKnowClick = () => {
		setIsChecked(true);
	};
	const handleAllClick = () => {
		setIsChecked(false);
	};

	const getCheckVocabulary = async () => {
		try {
			if (memberkey) {
				const response = await getCheckVocabularyApi(memberkey);
				if (response.status === 200) {
					setVocaCheckCnt(response.data.data.checkedCount);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getAllVocabulary = async () => {
		try {
			if (memberkey) {
				const response = await getAllVocabularyApi(memberkey, 1, false);
				if (response.status === 200) {
					setAllVoca(response.data.data.totalElements);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getCheckVocabulary();
		getAllVocabulary();
		window.addEventListener('checkVocabulary', getCheckVocabulary);
		window.addEventListener('allVocabulary', getAllVocabulary);
		return () => {
			window.removeEventListener('checkVocabulary', getCheckVocabulary);
			window.removeEventListener('allVocabulary', getAllVocabulary);
		};
	}, []);

	return (
		<VocabularyHeaderContainer>
			<div className="voca-menu">
				<button type="button" className="voca-total-button" onClick={handleAllClick}>
					<p className="total-button-title">전체 단어 개수</p>
					<p className="total-count">{allVoca}</p>
				</button>
				<button type="button" className="voca-know-button" onClick={handleKnowClick}>
					<p className="know-button-title">아는 단어 개수</p>
					<p className="know-count">{vocaCheckCnt}</p>
				</button>
			</div>
		</VocabularyHeaderContainer>
	);
}

export default VocabularyHeader;
