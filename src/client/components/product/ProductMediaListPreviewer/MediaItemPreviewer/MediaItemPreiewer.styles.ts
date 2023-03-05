import { css } from '@emotion/css';

export const container = () => css`
  display: flex;
`;

export const video = () => css`
  height: auto;
  object-fit: cover;
  width: 100%;
`;

export const video__mobile = () => css`
  @media (min-width: 1024px) {
    max-width: 100vw;
  }
`;

export const video__desktop = () => css`
  @media (max-width: 1024px) {
    max-width: 1024px;
  }
`;
