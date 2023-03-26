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

export const ModalBackgroundSetCSS = css`
  ${FlexCenterCSS}
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100000;
`;

export const ModalCSS = css`
  ${FlexColumnCenterCSS}
  position: absolute;
  z-index: 99999;
  background-color: var(--color-dark-blue);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 10px;
  background-color: rgb(254, 254, 254);
`;
