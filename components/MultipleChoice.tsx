import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import CommentSection from '../components/CommentSection';
import clipboard from '../public/clipboard.svg'
import { iEvent, iMCQ } from '../interface';

const MultipleChoice:React.FC<iMCQ> = ({
  Comments,
  CorrectOption,
  IncorrectOptions,
  Question,
}) => {
  const selectedValue:{ current: string } = useRef('');
  const [radioOptions, setRadioOptions] = useState<Array<string>>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);

  useEffect(() => {
    const randomInt = Math.floor(Math.random() * IncorrectOptions.length);
    const radioOptions = [...IncorrectOptions];
    radioOptions.splice(randomInt, 0, CorrectOption);
    setRadioOptions(radioOptions);
  }, [IncorrectOptions, CorrectOption]);

  const handleChange = ({ target: { value } }) => {
    if (isCorrect || isIncorrect) {
      setIsCorrect(false);
      setIsIncorrect(false);
    }
    selectedValue.current=value;
  };

  const handleSubmit = (e: iEvent) => {
    e.preventDefault();
    if (selectedValue.current === CorrectOption) {
      setIsIncorrect(false);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setIsIncorrect(true);
    }
  };

  return (
    <div>
      <h3 style={{ fontSize: '14px' }}>Quick Quiz</h3>
      <form name='multiple-choice' id='multiple-choice' onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }} >
          <Image alt='clipboard icon' src={clipboard} height='40'/>
          <p style={{ fontWeight: 'bold', margin: '0 0 0 5px' }}>{Question}</p>
        </div>
        {isCorrect && <p style={{ color: 'rgb(34 197 94)', margin: '0 0 10px' }}>Great job! You have answered the question correctly.</p>}
        {isIncorrect && <p style={{ color: 'rgb(220 38 38)', margin: '0 0 10px' }}>Not quite, try again.</p>}
        {radioOptions.map((value, idx) => (
          <div key={`radio-button-${idx}`} className='radio' style={{ marginBottom: '3px' }}>
            <input
              style={{ marginRight: '12px'}}
              name='multiple-choice'
              onChange={handleChange}
              type='radio'
              value={value}
            />
            <label>{value}</label>
          </div>
        ))}
        <button
          style={{ backgroundColor: 'transparent', border: '1px solid gray', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', marginTop: '20px', padding: '8px' }}
          type='submit'
        >
          Submit
        </button>
      </form>
      { isCorrect  && <CommentSection Comments={Comments} />}
    </div>
  );
};

export default MultipleChoice;
