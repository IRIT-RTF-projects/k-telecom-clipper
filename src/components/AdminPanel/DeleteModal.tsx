import React from 'react';
import styles from './DeleteModal.module.css';

interface Props {
  type: 'stream' | 'user';
  itemLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<Props> = ({ type, itemLabel, onCancel, onConfirm }) => {
  const title = 'Подтвердите действие';
  const subject = type === 'stream' ? 'видеопоток' : 'пользователя';
  const message = itemLabel
    ? `Вы уверены, что хотите удалить ${subject} «${itemLabel}»?`
    : `Вы уверены, что хотите удалить ${subject}?`;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.message}>{message}</p>

          <div className={styles.actions}>
            <button className={styles.cancel} onClick={onCancel}>Отмена</button>
            <button className={styles.confirm} onClick={onConfirm}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
