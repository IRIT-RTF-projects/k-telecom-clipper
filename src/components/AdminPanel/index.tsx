import React, { useEffect, useMemo, useState } from 'react';
import styles from './AdminPanel.module.css';
import type { Stream } from '../../types/Admin';
import type { User } from '../../types/User';
import StreamsTab from './StreamsTab';
import UsersTab from './UsersTab';
import StreamModal from './StreamModal';
import UserModal from './UserModal';
import DeleteModal from './DeleteModal';
import SearchBar from './SearchBar';
import { adminApi } from '../../api/admin.api';

const ITEMS_PER_PAGE = 10;

type DeleteTarget = {
  type: 'stream' | 'user';
  id: number;
  label?: string;
};

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'streams' | 'users'>('streams');

  const [streams, setStreams] = useState<Stream[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [isStreamModalOpen, setStreamModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [editingStream, setEditingStream] = useState<Stream | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [query, setQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const [streamsRes, usersRes] = await Promise.all([
          adminApi.getStreams(),
          adminApi.getUsers(),
        ]);

        setStreams(streamsRes);
        setUsers(usersRes);
      } catch (e) {
        console.error('ADMIN LOAD ERROR', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ---------- FILTER & PAGINATION ---------- */
  const filteredStreams = useMemo(() => {
    if (!query.trim()) return streams;
    return streams.filter(s =>
      `${s.url} ${s.description}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [streams, query]);

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredStreams.length / ITEMS_PER_PAGE)));
    setCurrentPage(1);
  }, [filteredStreams]);

  const paginatedStreams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStreams.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStreams, currentPage]);

  /* ---------- STREAM CRUD ---------- */
  const handleCreateStream = async (payload: { url: string; description: string }) => {
    const created = await adminApi.createStream(payload);
    setStreams(prev => [created, ...prev]);
    setStreamModalOpen(false);
  };

  const handleUpdateStream = async (
    id: number,
    payload: { url: string; description: string }
  ) => {
    const updated = await adminApi.updateStream(id, payload);
    setStreams(prev => prev.map(s => (s.id === id ? updated : s)));
    setEditingStream(null);
    setStreamModalOpen(false);
  };

  const handleDeleteStreamConfirmed = async (id: number) => {
    await adminApi.deleteStream(id);
    setStreams(prev => prev.filter(s => s.id !== id));
    setDeleteTarget(null);
  };

  /* ---------- RENDER ---------- */
  if (loading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'streams' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('streams')}
        >
          Потоки
        </button>

        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Пользователи
        </button>
      </div>

      {activeTab === 'streams' && (
        <>
          <div className={styles.controls}>
            <button
              className={styles.createButton}
              onClick={() => {
                setEditingStream(null);
                setStreamModalOpen(true);
              }}
            >
              Создать поток +
            </button>

            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Поиск потоков"
            />
          </div>

          <StreamsTab
            streams={paginatedStreams}
            onEdit={s => {
              setEditingStream(s);
              setStreamModalOpen(true);
            }}
            onDelete={s =>
              setDeleteTarget({
                type: 'stream',
                id: s.id,
                label: s.description,
              })
            }
          />
        </>
      )}

      {isStreamModalOpen && (
        <StreamModal
          stream={editingStream}
          onClose={() => {
            setStreamModalOpen(false);
            setEditingStream(null);
          }}
          onSubmit={payload =>
            editingStream
              ? handleUpdateStream(editingStream.id, payload)
              : handleCreateStream(payload)
          }
        />
      )}

      {deleteTarget && (
        <DeleteModal
          type={deleteTarget.type}
          itemLabel={deleteTarget.label}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={() => handleDeleteStreamConfirmed(deleteTarget.id)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
