import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { formatDate } from '../utils/helpers';
import useLocale from '../hooks/useLocale';
import { getNote, archiveNote, unarchiveNote, deleteNote } from '../utils/network-data';
import '../css/BacaCatatan.css';

// Halaman Detail Catatan (BacaCatatan)
function BacaCatatan({ authedUser, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLocale();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  // State loading per-aksi FAB untuk mencegah double request (F8)
  const [archiving, setArchiving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Ambil data catatan berdasarkan id dari URL
  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      const { error, data } = await getNote(id);
      setNote(!error && data ? data : null);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  // Handler arsip / aktifkan catatan — dinonaktifkan selama request berjalan (F8)
  async function onArchiveHandler() {
    setArchiving(true);
    if (note?.archived) {
      const { error } = await unarchiveNote(id);
      if (!error) {
        navigate('/archives');
      } else {
        alert(t('failedActivate'));
      }
    } else {
      const { error } = await archiveNote(id);
      if (!error) {
        navigate('/');
      } else {
        alert(t('failedArchive'));
      }
    }
    setArchiving(false);
  }

  // Handler hapus catatan — dinonaktifkan selama request berjalan (F8)
  async function onDeleteHandler() {
    const isConfirmed = window.confirm(t('confirmDelete'));
    if (!isConfirmed) return;

    setDeleting(true);
    const { error } = await deleteNote(id);
    if (!error) {
      navigate('/');
    } else {
      alert(t('failedDelete'));
    }
    setDeleting(false);
  }

  return (
    <div className="note-detail-page">
      {/* Navbar bersama */}
      <Navbar authedUser={authedUser} onLogout={onLogout} />

      <main className="note-detail-page__main">
        {loading ? (
          <p className="note-detail-page__status">{t('loading')}</p>
        ) : !note ? (
          <div className="note-detail-page__status">
            <p>{t('noteNotFound')}</p>
            <Link to="/" className="note-detail-page__back-link">
              {t('backToHome')}
            </Link>
          </div>
        ) : (
          <>
            {/* Judul catatan */}
            <h1 className="note-detail-page__title">{note.title}</h1>

            {/* Tanggal catatan dalam format lengkap */}
            <p className="note-detail-page__date">{formatDate(note.createdAt)}</p>

            {/* Isi catatan */}
            <p className="note-detail-page__body">{note.body}</p>

            {/* FAB: arsip/aktifkan dan hapus — dinonaktifkan saat request berlangsung (F8) */}
            <div className="note-detail-page__fab-container">
              <button
                type="button"
                className="note-detail-page__fab note-detail-page__fab--archive"
                aria-label={note.archived ? t('activateNote') : t('archiveNote')}
                title={note.archived ? t('activateNote') : t('archiveNote')}
                onClick={onArchiveHandler}
                disabled={archiving || deleting}
              >
                {note.archived ? '📤' : '📥'}
              </button>

              <button
                type="button"
                className="note-detail-page__fab note-detail-page__fab--delete"
                aria-label={t('deleteNote')}
                title={t('deleteNote')}
                onClick={onDeleteHandler}
                disabled={archiving || deleting}
              >
                🗑️
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default BacaCatatan;
