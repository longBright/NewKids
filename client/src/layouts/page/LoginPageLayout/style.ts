import styled from 'styled-components';

export const LoginPageLayoutContainer = styled.div`
	height: calc(100vh - 76px);
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 4rem;

	.title {
		margin-top: 3rem;
	}

	.footer {
		position: absolute;
		bottom: 1rem;
		left: 0;
		right: 0;
		transform: translateX(0);
	}
`;
