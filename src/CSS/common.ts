import { css } from 'styled-components';

export const FlexCenterCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexColumnCenterCSS = css`
  ${FlexCenterCSS};
  flex-direction: column;
`;

export const FlexAlignCSS = css`
  display: flex;
  align-items: center;
`;
