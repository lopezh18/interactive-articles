import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { iComment, iCommentsObject, iCommentForm, iEvent } from '../interface';
import edit from '../public/edit.svg'
import close from '../public/close.svg'

const CommentSection:React.FC<iCommentsObject> = ({ Comments }) => {
  const router = useRouter();
  const { articleSlug } = router.query;

  const [displayTextEditor, setDisplayTextEditor] = useState<boolean>(false);
  const [articleComments, setArticleComments] = useState<iCommentsObject['Comments']>(Comments);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const commentForm: { current: iCommentForm } = useRef({
    comment: '',
    name: '',
  });

  const handleClick = ():void => {
    setDisplayTextEditor(!displayTextEditor);
  };

  const handleChange = ({ target: { name, value }}):void => {
    if (errorMessage) setErrorMessage('');
    commentForm.current[name] = value;
  }

  const handleSubmit = async (e:iEvent) => {
    e.preventDefault();
    const { comment, name }: { comment: string; name: string; } = commentForm.current;
    if (!comment || !name) {
      setErrorMessage('Please complete all form fields.');
    } else {
      const body = { articleSlug, ...commentForm.current };
      const res = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const newComment:iComment = await res.json();
      setArticleComments([...articleComments, newComment]);
    }
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 5px' }}>
        <h3 style={{ fontSize: '14px', margin: '0' }}>Comments/Questions</h3>
        <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={handleClick} title={displayTextEditor ? 'close comment form' : 'add comment'}>
          {!displayTextEditor && <Image alt='add comment icon' src={edit} height='40'/>}
          {displayTextEditor && <Image alt='add comment icon' src={close} height='40'/>}
        </button>
      </div>
      {displayTextEditor && (
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          id='comment-form'
          name='comment-form'
          onSubmit={handleSubmit}
        >
          {errorMessage && <p style={{ color: 'rgb(220 38 38)', margin: '0 0 10px' }}>{errorMessage}</p>}
          <textarea
            style={{ border: '1px solid gray', borderRadius: '4px', padding: '3px' }}
            defaultValue={commentForm.current.comment}
            name='comment'
            onChange={handleChange}
          />
          <div style={{ margin: '15px 0'}}>
            <label style={{ marginRight: '8px' }}>Your name: </label>
            <input
              style={{ border: '1px solid gray', borderRadius: '4px', padding: '3px' }}
              defaultValue={commentForm.current.name}
              name='name'
              onChange={handleChange}
              type="text"
            />
          </div>
          <button
            style={{ borderRadius: '4px', border:'none', backgroundColor: 'rgb(13 148 136)', color: 'white', fontSize: '14px', fontWeight: 'bold', padding: '12px 0' }}
            type='submit'
          >
            Save Comment
          </button>
        </form>
      )}
      {articleComments.map(({ Author, Text }:{ Author: string; Text: string; }, idx) => (
        <div key={`${Author}-${idx}`}>
          <p style={{ color: 'rgb(107 114 128)', fontSize: '16px' }}>{Text}</p>
          <p style={{ color: 'rgb(107 114 128)', fontSize: '14px' }}>{`comment by: ${Author}`}</p>
        </div>
      ))}
    </>
  );
};

export default CommentSection;
