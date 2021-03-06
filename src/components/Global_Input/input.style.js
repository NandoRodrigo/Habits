import { motion } from "framer-motion"
import styled, { css } from "styled-components"

export const StyledInput = styled(motion.div)`
	color: var(--medium-gray);
	display: flex;
	flex-direction: column;
	text-align: center;
	margin: 0 10px;

	div {
		border-bottom: 1px solid var(--medium-gray);
		align-items: center;
		display: flex;
		padding-bottom: 0.35rem;
	}

	input,
	select {
		flex: 1;
		background: transparent;
		border: 0;
		min-width: 100px;
		color: #7b7b7b;
	}

	svg {
		margin-right: 10px;
	}

	div:hover {
		border-bottom: 1px solid var(--light-green);
		color: var(--light-green);
	}

	${(props) =>
		props.isDenied &&
		css`
			color: var(--red);
			div {
				border-color: var(--red);
			}
		`}
`

export const ErrorMessage = styled.p`
	color: var(--red);
	font-size: 0.8rem;
	height: 1rem;
	padding: 0.2rem;
	text-align: right;
`
