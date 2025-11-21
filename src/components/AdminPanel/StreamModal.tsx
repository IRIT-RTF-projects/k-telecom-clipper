import React, { useEffect, useRef, useState } from 'react';
import styles from './StreamModal.module.css';
import UsersAccessModal from './UsersAccessModal';
import type { NewStreamForm, Stream, User } from '../../types/Admin';

interface Props {
  allUsers: User[];
  stream?: Stream | null;
  onClose: () => void;
  onSubmit: (payload: NewStreamForm) => void;
}

const StreamModal: React.FC<Props> = ({ allUsers, stream = null, onClose, onSubmit }) => {
  const [rtspUrl, setRtspUrl] = useState(stream?.rtspUrl ?? '');
  const [cameraAddress, setCameraAddress] = useState(stream?.address ?? '');
  const [selectedUsers, setSelectedUsers] = useState<string[]>(stream?.assignedUsers ?? []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usersViewOpen, setUsersViewOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const removeUser = (id: string) => setSelectedUsers(prev => prev.filter(x => x !== id));

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    const payload: NewStreamForm = {
      rtspUrl: rtspUrl.trim(),
      cameraAddress: cameraAddress.trim(),
      selectedUsers: selectedUsers
    };
    await new Promise(resolve => setTimeout(resolve, 200));
    onSubmit(payload);
    setIsSubmitting(false);
  };

  const visibleChips = selectedUsers.map(id => allUsers.find(u => u.id === id)?.login ?? '—');

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Изменение данных видеопотока">
          <div className={styles.modalHeader}>
            <h2 className={styles.title}>{stream ? 'Изменение данных видеопотока' : 'Создать видеопоток'}</h2>
            <button className={styles.closeButton} onClick={onClose}>✕</button>
          </div>

          <form className={styles.modalForm} onSubmit={handleSubmit}>
            <label className={styles.label}>RTSP-адрес</label>
            <input ref={inputRef} className={styles.input} value={rtspUrl} onChange={e => setRtspUrl(e.target.value)} placeholder="rtsp://..." required />

            <label className={styles.label}>Адрес камеры</label>
            <input className={styles.input} value={cameraAddress} onChange={e => setCameraAddress(e.target.value)} placeholder="г. Екатеринбург, ул. Пушкина, д. 36, под. 5" required />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label className={styles.label} style={{ marginBottom: 0 }}>Пользователи с доступом</label>
              <div style={{ color: '#64748B', fontSize: 13 }}>{selectedUsers.length}</div>
            </div>

            <div className={styles.selectWrap}>
              <div className={styles.chipsRow}>
                {selectedUsers.length === 0 && <div className={styles.noSelection}>Users</div>}

                {visibleChips.map((login, idx) => (
                  <div className={styles.chip} key={`${login}-${idx}`}>
                    <span className={styles.chipText}>{login}</span>
                    <button type="button" className={styles.chipRemove} onClick={(e) => { e.stopPropagation(); removeUser(selectedUsers[idx]); }}>×</button>
                  </div>
                ))}

                <button
                  type="button"
                  className={styles.dropdownToggle}
                  onClick={(e) => { e.stopPropagation(); setUsersViewOpen(true); }}
                  title="Открыть список пользователей"
                >
                  ▾
                </button>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose} disabled={isSubmitting}>Отмена</button>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : (stream ? 'Сохранить изменения' : 'Создать и сохранить')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {usersViewOpen && (
        <UsersAccessModal
          title={`Пользователи с доступом — ${selectedUsers.length}`}
          address={cameraAddress}
          userIds={selectedUsers}
          allUsers={allUsers}
          onClose={() => setUsersViewOpen(false)}
          onApply={(newSelected) => { setSelectedUsers(newSelected); setUsersViewOpen(false); }}
        />
      )}
    </>
  );
};

export default StreamModal;
