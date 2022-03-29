import ReactMarkdown from 'react-markdown';

import { iMarkdown } from '../interface';

const Markdown: React.FC<iMarkdown> = ({ Text }) => {
  return (
    <>
      <ReactMarkdown>{Text}</ReactMarkdown>
    </>
  );
};

export default Markdown;
