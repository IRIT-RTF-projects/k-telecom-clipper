import React, { useEffect, useState } from 'react';
import styles from './StreamsTab.module.css';
import type { AdminUser, Stream } from '../../types/Admin';
import { getPermissionsForStream } from '../../api/admin.api';

interface Props {
  streams: Stream[];
  onEdit: (s: Stream) => void;
  onDelete: (s: Stream) => void;
}

const MAX_VISIBLE_USERS = 2;

const StreamsTab: React.FC<Props> = ({ streams, onEdit, onDelete }) => {
  const [usersByStream, setUsersByStream] = useState<
    Record<number, AdminUser[]>
  >({});

  useEffect(() => {
    if (!streams.length) return;

    const loadPermissions = async () => {
      const result: Record<number, AdminUser[]> = {};

      for (const stream of streams) {
        try {
          const { data } = await getPermissionsForStream(stream.id);

          // backend возвращает permissions с user внутри
          result[stream.id] =
            data?.map((p: any) => p.user).filter(Boolean) ?? [];
        } catch {
          result[stream.id] = [];
        }
      }

      setUsersByStream(result);
    };

    loadPermissions();
  }, [streams]);

  return (
    <div className={styles.container}>
      <div className={styles.streamsTableContainer}>
        <table className={styles.streamsTable}>
          <thead>
            <tr>
              <th>URL потока</th>
              <th>Описание</th>
              <th>Пользователи</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {streams.map((s) => {
              const users = usersByStream[s.id] || [];
              const visibleUsers = users.slice(0, MAX_VISIBLE_USERS);
              const hiddenCount = users.length - visibleUsers.length;

              return (
                <tr key={s.id} className={styles.streamRow}>
                  <td>
                    <div className={styles.rtspUrl}>{s.url}</div>
                  </td>

                  <td>
                    <div className={styles.address}>{s.description}</div>
                  </td>

                  {/* 👇 КОЛОНКА ПОЛЬЗОВАТЕЛЕЙ */}
                  <td className={styles.usersCell}>
                    <div className={styles.userLogins}>
                      {visibleUsers.map((u) => (
                        <span key={u.id} className={styles.userLogin}>
                          {u.login}
                        </span>
                      ))}

                      {hiddenCount > 0 && (
                        <span className={styles.moreUsers}>
                          +{hiddenCount}
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className={styles.rowActions}>
                      <button onClick={() => onEdit(s)}>✏️</button>
                      <button onClick={() => onDelete(s)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {streams.length === 0 && (
              <tr>
                <td colSpan={4} className={styles.emptyCell}>
                  Потоков нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StreamsTab;
