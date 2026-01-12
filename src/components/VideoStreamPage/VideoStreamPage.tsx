import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './VideoStreamPage.module.css';
import type { Point, Polygon, Domofon } from '../../types/VideoStream';
import undoIcon from '../../assets/undo.svg';
import redoIcon from '../../assets/redo.svg';
import { streamsApi } from '../../api/streams.api';
import { selectionsApi } from '../../api/selections.api';

const VideoStreamPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedDomofon = (location.state as { domofon: Domofon })?.domofon;

  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  const [redoStack, setRedoStack] = useState<Point[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // защита от прямого захода
  useEffect(() => {
    if (!selectedDomofon) {
      navigate('/domofons', { replace: true });
    }
  }, [selectedDomofon, navigate]);

  // загрузка стрима
  useEffect(() => {
    if (!selectedDomofon) return;

    const loadStream = async () => {
      try {
        const res = await streamsApi.getById(selectedDomofon.id);
        setStreamUrl(res.streamUrl);
      } catch (e) {
        console.error('Ошибка загрузки видеопотока', e);
      }
    };

    loadStream();
  }, [selectedDomofon]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      if (videoRef.current && canvas) {
        const rect = videoRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = `${Math.round(rect.width)}px`;
        canvas.style.height = `${Math.round(rect.height)}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentPolygon.length > 0) {
      ctx.save();
      ctx.strokeStyle = '#ff6b6b';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 107, 107, 0.12)';
      ctx.beginPath();
      ctx.moveTo(currentPolygon[0].x, currentPolygon[0].y);
      for (let i = 1; i < currentPolygon.length; i++) {
        ctx.lineTo(currentPolygon[i].x, currentPolygon[i].y);
      }
      if (currentPolygon.length >= 3) {
        ctx.closePath();
        ctx.fill();
      }
      ctx.stroke();

      currentPolygon.forEach(point => {
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
      ctx.restore();
    }
  }, [polygons, currentPolygon]);

  const handleVideoClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCurrentPolygon(prev => {
      setRedoStack([]);
      return [...prev, { x, y }];
    });

    setIsSaved(false);
  };

  const handleUndo = () => {
    if (currentPolygon.length === 0) return;
    setCurrentPolygon(prev => {
      const newArr = prev.slice(0, -1);
      const removed = prev[prev.length - 1];
      setRedoStack(rs => [...rs, removed]);
      return newArr;
    });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    setRedoStack(prev => {
      const copy = [...prev];
      const point = copy.pop()!;
      setCurrentPolygon(curr => [...curr, point]);
      return copy;
    });
  };

  const saveClick = async () => {
    if (!selectedDomofon || currentPolygon.length < 3) return;

    try {
      await selectionsApi.create(selectedDomofon.id, currentPolygon);
      setConfirmModalOpen(true);
      setIsSaved(true);
    } catch (e) {
      console.error('Ошибка сохранения области', e);
    }
  };

  const confirmStay = () => {
    setConfirmModalOpen(false);
  };

  const confirmExit = () => {
    navigate('/domofons');
  };

  const undoEnabled = currentPolygon.length > 0;
  const redoEnabled = redoStack.length > 0;
  const saveEnabled = currentPolygon.length > 0 || polygons.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{selectedDomofon?.address}, {selectedDomofon?.entrance}</h1>
        </div>
      </div>

      <div className={styles.instructions}>
        <div className={styles.instructionsText}>
          <p className={styles.instructionPrimary}>Выделите нужную область</p>
          <p className={styles.instructionSecondary}>Создайте многоугольник из трёх или более точек</p>
        </div>

        <div className={styles.instrButtons}>
          <button className={styles.iconButton} onClick={handleUndo} disabled={!undoEnabled}>
            <img src={undoIcon} alt="undo" className={styles.iconImage} />
          </button>

          <button className={styles.iconButton} onClick={handleRedo} disabled={!redoEnabled}>
            <img src={redoIcon} alt="redo" className={styles.iconImage} />
          </button>
        </div>
      </div>

      <div className={styles.videoContainer}>
        <div
          ref={videoRef}
          className={styles.videoPlaceholder}
          onClick={handleVideoClick}
        >
          {streamUrl ? (
            <iframe src={streamUrl} title="video" className={styles.videoIframe} />
          ) : (
            <div className={styles.videoPlaceholderContent}>
              <div className={styles.videoIcon}>...</div>
              <p className={styles.videoResolution}>1920×1080</p>
            </div>
          )}

          <canvas ref={canvasRef} className={styles.drawingCanvas} />
        </div>
      </div>

      <div className={styles.footer}>
        <button onClick={confirmExit} className={`${styles.footerButton} ${styles.backButton}`}>
          Назад
        </button>

        <button
          onClick={saveClick}
          className={`${styles.footerButton} ${styles.saveButton}`}
          disabled={!saveEnabled}
        >
          Сохранить
        </button>
      </div>

      {confirmModalOpen && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <h2>Подтвердите действие</h2>
            <p>Выделенная область будет сохранена</p>
            <button onClick={confirmStay}>Остаться</button>
            <button onClick={confirmExit}>Выйти</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoStreamPage;
