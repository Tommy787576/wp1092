const Message = ({ me, author, text, classText }) => {
  return (
    me === author ? 
    <div className={'my-message '+classText}>
      <p className='message-text'>{text}</p>
      <p className='message-author'>{author}</p>
    </div>:
    <div className={'others-message '+classText}>
      <p className='message-author'>{author}</p>
      <p className='message-text'>{text}</p>
    </div>
  );
}

export default Message;
