import Tooltip from './Tooltip';

const WarnNotReactTooltip = () => {
  return (
    <Tooltip
      title={'❔'}
      content={
        'Since this doc is written in Nextra (Next.js), below demo is actually a React component, but they are rendering the same <annotative-code /> web component.'
      }
      style={{ marginLeft: '8px' }}
    />
  );
};
export default WarnNotReactTooltip;
