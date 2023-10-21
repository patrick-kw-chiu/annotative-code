import { Tooltip as ReactTooltip } from 'react-tooltip';

const Tooltip = ({ title = '', content = '', style = {} }) => {
  const randomId = new Date().getDate();
  return (
    <>
      <a
        data-tooltip-id={'tooltip-id-' + randomId}
        data-tooltip-content={content}
        style={{
          cursor: 'pointer',
          backgroundColor: 'rgba(161,98,7,.3)',
          border: '1px solid hsla(53,98%,77%,.3)',
          borderRadius: '0.75rem',
          padding: '0.25rem',
          ...style,
        }}
      >
        {title}
      </a>
      <ReactTooltip
        id={'tooltip-id-' + randomId}
        style={{
          maxWidth: '50%',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
        }}
      />
    </>
  );
};

export default Tooltip;
