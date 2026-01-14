import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './VideoStreamPage.module.css';
import type { Point } from '../../types/VideoStream';
import type { Domofon } from '../../types/Domofon';
import undoIcon from '../../assets/undo.svg';
import redoIcon from '../../assets/redo.svg';
import { api } from '../../api/axios';

/* ---------- TYPES ---------- */
interface Backend {
  id: number;
  url: string;
  description: string;
}

/* ---------- COMPONENT ---------- */
const VideoStreamPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const videoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedDomofon = (location.state as { domofon: Domofon })?.domofon;

  /* ---------- STATE ---------- */
  const [polygon, setPolygon] = useState<Point[]>([]);
  const [redoStack, setRedoStack] = useState<Point[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [backends, setBackends] = useState<Backend[]>([]);
  const [selectedBackendId, setSelectedBackendId] = useState<number | null>(null);

  /* ---------- LOAD BACKENDS ---------- */
  useEffect(() => {
    const loadBackends = async () => {
      try {
        const res = await api.get<Backend[]>('/api/v1/backends');
        setBackends(res.data);
        if (res.data.length > 0) {
          setSelectedBackendId(res.data[0].id);
        }
      } catch (e) {
        console.error('Ошибка загрузки бекендов', e);
      }
    };

    loadBackends();
  }, []);

  /* ---------- CANVAS RESIZE ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = videoRef.current!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  /* ---------- DRAW POLYGON ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (polygon.length === 0) return;

    ctx.save();
    ctx.strokeStyle = '#C8235A';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(200, 35, 90, 0.15)';

    ctx.beginPath();
    ctx.moveTo(polygon[0].x, polygon[0].y);
    polygon.slice(1).forEach(p => ctx.lineTo(p.x, p.y));

    if (polygon.length >= 3) {
      ctx.closePath();
      ctx.fill();
    }

    ctx.stroke();

    polygon.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#C8235A';
      ctx.fill();
    });

    ctx.restore();
  }, [polygon]);

  /* ---------- HANDLERS ---------- */
  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPolygon(prev => {
      setRedoStack([]);
      return [...prev, { x, y }];
    });
  };

  const handleUndo = () => {
    if (polygon.length === 0) return;

    setPolygon(prev => {
      const copy = [...prev];
      const removed = copy.pop()!;
      setRedoStack(rs => [...rs, removed]);
      return copy;
    });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    setRedoStack(prev => {
      const copy = [...prev];
      const point = copy.pop()!;
      setPolygon(p => [...p, point]);
      return copy;
    });
  };

  const handleSave = async () => {
    if (!selectedBackendId || polygon.length < 3 || !selectedDomofon) return;

    try {
      await api.post('/api/v1/selections', {
        backend_id: selectedBackendId,
        stream_id: selectedDomofon.stream.id,
        points: polygon,
      });

      alert('Область успешно сохранена');
    } catch (e) {
      console.error('Ошибка сохранения области', e);
      alert('Ошибка при сохранении');
    }
  };

  const confirmExit = () => {
    setPolygon([]);
    setRedoStack([]);
    setConfirmModalOpen(false);
    navigate('/domofons');
  };

  /* ---------- FLAGS ---------- */
  const undoEnabled = polygon.length > 0;
  const redoEnabled = redoStack.length > 0;
  const saveEnabled = polygon.length >= 3 && selectedBackendId !== null;

  /* ---------- RENDER ---------- */
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{selectedDomofon?.title ?? 'Видеопоток'}</h1>
        </div>
      </div>

      <div className={styles.instructions}>
        <div className={styles.instructionsText}>
          <p className={styles.instructionPrimary}>Выделите нужную область</p>
          <p className={styles.instructionSecondary}>
            Создайте многоугольник из трёх или более точек
          </p>
        </div>

        <div className={styles.instrButtons}>
          <button className={styles.iconButton} onClick={handleUndo} disabled={!undoEnabled}>
            <img src={undoIcon} alt="undo" className={styles.iconImage} />
          </button>

          <button
            className={styles.iconButton}
            onClick={handleRedo}
            disabled={!redoEnabled}
            style={!redoEnabled ? { opacity: 0.35 } : undefined}
          >
            <img src={redoIcon} alt="redo" className={styles.iconImage} />
          </button>
        </div>
      </div>

      <div className={styles.videoContainer}>
        <div ref={videoRef} className={styles.videoPlaceholder} onClick={handleVideoClick}>
          <div className={styles.videoPlaceholderContent}>
            <div className={styles.videoIcon}>🎥</div>
            <p className={styles.videoResolution}>{selectedDomofon?.subtitle}</p>
          </div>
          <canvas ref={canvasRef} className={styles.drawingCanvas} />
        </div>
      </div>

      <div className={styles.footer}>
        <button
          onClick={() => setConfirmModalOpen(true)}
          className={`${styles.footerButton} ${styles.backButton}`}
        >
          Назад
        </button>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            value={selectedBackendId ?? ''}
            onChange={e => setSelectedBackendId(Number(e.target.value))}
            className={styles.backendSelect}
          >
            <option value="" disabled>
              Выберите бекенд
            </option>
            {backends.map(b => (
              <option key={b.id} value={b.id}>
                {b.description}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className={`${styles.footerButton} ${styles.saveButton}`}
            disabled={!saveEnabled}
          >
            Сохранить
          </button>
        </div>
      </div>

      {confirmModalOpen && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <div className={styles.confirmHeader}>
              <h2 className={styles.confirmTitle}>Подтвердите действие</h2>
              <button className={styles.closeConfirm} onClick={() => setConfirmModalOpen(false)}>
                ×
              </button>
            </div>

            <div className={styles.confirmBody}>
              <p className={styles.confirmText}>
                Выделенная область будет удалена. Уверены, что хотите выйти?
              </p>

              <div className={styles.confirmActions}>
                <button className={styles.stayButton} onClick={() => setConfirmModalOpen(false)}>
                  Остаться
                </button>
                <button className={styles.exitButton} onClick={confirmExit}>
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoStreamPage;
