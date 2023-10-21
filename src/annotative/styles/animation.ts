import { css } from 'lit';

export const backgroundAnimation = css`
  @keyframes background-animation {
    0% {
      background-color: rgba(0, 0, 0, 0.1);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const underlineAnimation = css`
  @keyframes underline-animation {
    0% {
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
    100% {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
`;
