import React from 'react';

export const Success = ({ count, onClickSendInvites }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button onClick={() => onClickSendInvites(false)} className="send-invite-btn" type='button'>Назад</button>
    </div>
  );
};
