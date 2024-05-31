import { css } from 'lit';

export const popupStyle = css`
  #popup {
    cursor: default;
    position: absolute;
    width: 50vw;
    max-width: 500px;

    height: fit-content;
    opacity: 0;

    transform: translateX(-9999px);

    transition: width 0s 0.2s, padding 0s 0.2s, transform 0s 0.2s, opacity 0.2s;
  }
  #popup.fade-in {
    padding: 6px 0;
    width: 50vw;
    max-width: 500px;
    opacity: 1;

    transform: translateX(0);

    transition: width 0s, transform 0s, opacity 0.2s;
  }
  #popup-inner {
    position: relative;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    padding: 6px;
    overflow-wrap: break-word;
    overflow-y: scroll;
  }
  #popup-inner::-webkit-scrollbar {
    display: none;
  }
  .popup-line-break {
    opacity: 0.2;
    border-right: none;
    border-bottom: none;
    border-left: none;
    border-top: 1px solid;
  }
  .popup-description {
    white-space: pre-wrap;
    padding-top: 0.5em;
  }
`;
