import ReactMarkdown from 'react-markdown';

import { iMarkdown } from '../interface';

const Markdown: React.FC<iMarkdown> = ({ Text }) => {
  return (
    <div style={{ maxWidth: '90vw', overflowWrap: 'break-word' }}>
      <ReactMarkdown>{Text}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
