import { useEffect, useState } from "react";
import styles from "./StreamModal.module.css";
import type { Stream, AdminUser } from "../../types/Admin";
import UsersAccessModal from "./UsersAccessModal";

type Props = {
  stream: Stream | null;
  users: AdminUser[];
  onClose: () => void;
  onSubmit: (payload: {
    url: string;
    description: string;
    userIds: number[];
  }) => void;
};

const StreamModal = ({ stream, users, onClose, onSubmit }: Props) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [isUsersModalOpen, setUsersModalOpen] = useState(false);

  useEffect(() => {
    if (stream) {
      setUrl(stream.url);
      setDescription(stream.description);

      // 🔥 ВАЖНО
      setSelectedUserIds(stream.users?.map((u) => Number(u.id)) ?? []);
    }
  }, [stream]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      url,
      description,
      userIds: selectedUserIds,
    });
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2 style={{paddingBottom: '10px'}}>{stream ? "Редактировать поток" : "Создать поток"}</h2>

          <form onSubmit={handleSubmit}>
            <label >
              <div style={{paddingBottom: '10px'}}>URL потока</div>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </label>

            <label>
              <div style={{paddingBottom: '10px'}}>Адрес камеры</div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <button
              style={{width: '100%'}}
              type="button"
              className={styles.accessButton}
              onClick={() => setUsersModalOpen(true)}
            >
              Пользователи с доступом ({selectedUserIds.length})
            </button>

            <div className={styles.actions}>
              <button type="button" onClick={onClose}>
                Отмена
              </button>
              <button type="submit" className={styles.submitButton}>
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>

      {isUsersModalOpen && (
        <UsersAccessModal
          title="Пользователи с доступом"
          allUsers={users}
          userIds={selectedUserIds.map(String)}
          onClose={() => setUsersModalOpen(false)}
          onApply={(ids: string[]) => {
            setSelectedUserIds(ids.map(Number));
            setUsersModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default StreamModal;
