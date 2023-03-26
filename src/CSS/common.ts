import { css } from 'styled-components';

export const FlexCenterCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FlexRowCenterCSS = css`
  display: flex;
  justify-content: center;
`;

export const FlexBetweenCSS = css`
  display: flex;
  justify-content: space-between;
`;

export const FlexColumnCenterCSS = css`
  ${FlexCenterCSS};
  flex-direction: column;
`;

export const FlexAlignCSS = css`
  display: flex;
  align-items: center;
`;

export const HoverCSS = css`
  :hover {
    cursor: pointer;
  }
`;
