import { useState } from 'react';

const Accordion = ({ label = '', children, defaultOpened = false }) => {
  const [open, setOpen] = useState(defaultOpened);

  return (
    <div
      style={{
        border: open ? '1px solid rgba(151, 151, 151, 0.5)' : '',
        padding: '0.5rem',
      }}
    >
      <div
        className="nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-text-xl"
        style={{ cursor: 'pointer', paddingBottom: '0.5rem' }}
        onClick={() => setOpen(!open)}
      >
        ► {label}
      </div>
      {open && <div style={{ padding: '0.5rem 0' }}>{children}</div>}
    </div>
  );
};

export default Accordion;
