import React, { useEffect, useState } from 'react';
import PageLayout from 'layouts/common/PageLayout';
import QuizPageLayout from 'layouts/page/QuizPageLayout';
import QuizMain from 'components/organisms/quiz/QuizMain';
import QuizHowToUse from 'components/organisms/quiz/QuizHowToUse';
import QuizQuestion from 'components/organisms/quiz/QuizQuestion';
import QuizResult from 'components/organisms/quiz/QuizResult';
import QuizWords from 'components/organisms/quiz/QuizWords';
import Footer from 'components/organisms/common/Footer';

function QuizPage() {
	const [step, setStep] = useState(0);
	const [score, setScore] = useState(0);
	const [stepView, setStepView] = useState(<div />);

	useEffect(() => {
		switch (step) {
			case 0: {
				setStepView(<QuizMain setStep={setStep} />);
				break;
			}
			case 1: {
				setStepView(<QuizHowToUse setStep={setStep} />);
				break;
			}
			case 2: {
				setStepView(<QuizQuestion setStep={setStep} setScore={setScore} />);
				break;
			}
			case 3: {
				setStepView(<QuizResult score={score} setStep={setStep} />);
				break;
			}
			case 4: {
				setStepView(<QuizWords setStep={setStep} />);
				break;
			}
			default: {
				setStepView(<div>에러페이지입니다.</div>);
				break;
			}
		}
	}, [step]);

	return (
		<PageLayout>
			<QuizPageLayout StepView={stepView} Footer={<Footer />} />
		</PageLayout>
	);
}

export default QuizPage;
