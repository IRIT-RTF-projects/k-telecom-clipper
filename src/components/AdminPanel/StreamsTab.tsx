import React from 'react';
import styles from './StreamsTab.module.css';
import type { Stream, User } from '../../types/Admin';

interface Props {
  streams: Stream[];
  users: User[];
  onEdit: (s: Stream) => void;
  onDelete: (s: Stream) => void;
}

const StreamsTab: React.FC<Props> = ({ streams, users, onEdit, onDelete }) => {
  const findLogins = (ids: string[]) => {
    return ids.map(id => users.find(u => u.id === id)?.login ?? '—');
  };

  return (
    <div className={styles.container}>
      <div className={styles.streamsTableContainer}>
        <table className={styles.streamsTable}>
          <thead>
            <tr>
              <th>RTSP-адрес потока</th>
              <th>Адрес камеры</th>
              <th>Доступно пользователям</th>
            </tr>
          </thead>

          <tbody>
            {streams.map(s => {
              const logins = findLogins(s.assignedUsers ?? []);
              const showMore = logins.length > 3;
              const visible = logins.slice(0, 3);
              return (
                <tr
                  key={s.id}
                  className={styles.streamRow}
                >
                  <td className={styles.rtspCell}>
                    <div className={styles.rtspUrl}>{s.rtspUrl}</div>
                  </td>

                  <td className={styles.addressCell}>
                    <div className={styles.address}>{s.address}{s.entrance ? `, ${s.entrance}` : ''}</div>
                  </td>

                  <td className={styles.usersCell}>
                    <div className={styles.userLogins}>
                      {visible.map((l, i) => (
                        <div className={styles.userLogin} key={`${s.id}-u-${i}`}>{l}</div>
                      ))}

                      {showMore && (
                        <div className={styles.moreUsers}>{`${logins.length - visible.length}+`}</div>
                      )}
                    </div>

                    <div className={styles.rowActions}>
                      <button className={styles.editButton} onClick={() => onEdit(s)} aria-label="Изменить">✏️</button>
                      <button className={styles.deleteButton} onClick={() => onDelete(s)} aria-label="Удалить">🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {streams.length === 0 && (
              <tr>
                <td colSpan={3} className={styles.emptyCell}>Потоков нет</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StreamsTab;
