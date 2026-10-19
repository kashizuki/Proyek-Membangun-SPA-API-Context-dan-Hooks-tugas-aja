import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useInput from '../hooks/useInput';
import useLocale from '../hooks/useLocale';
import { addNote } from '../utils/network-data';
import '../css/TambahCatatan.css';

// Halaman Tambah Catatan Baru
function TambahCatatan({ authedUser, onLogout }) {
  const navigate = useNavigate();
  const { t } = useLocale();

  // Controlled input untuk judul dan isi catatan
  const [title, handleTitleChange] = useInput('');
  const [body, handleBodyChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler simpan catatan ke server
  async function onSaveHandler() {
    // Validasi: judul dan isi wajib diisi
    if (!title.trim() || !body.trim()) {
      alert(t('titleBodyRequired'));
      return;
    }

    setLoading(true);
    const { error } = await addNote({ title, body });
    setLoading(false);

    if (error) {
      alert(t('failedSave'));
      return;
    }

    // Kembali ke halaman utama setelah berhasil menyimpan
    navigate('/');
  }

  return (
    <div>
      {/* Navbar bersama */}
      <Navbar authedUser={authedUser} onLogout={onLogout} />

      <main>
        {/* Input judul catatan */}
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder={t('titlePlaceholder')}
          value={title}
          onChange={handleTitleChange}
        />

        {/* Textarea isi catatan */}
        <textarea
          className="add-new-page__input__body"
          placeholder={t('bodyPlaceholder')}
          value={body}
          onChange={handleBodyChange}
        />

        {/* FAB: simpan catatan — disabled saat loading */}
        <button
          type="button"
          className="add-new-page__action"
          aria-label={t('saveNote')}
          title={t('saveNote')}
          onClick={onSaveHandler}
          disabled={loading}
        >
          ✓
        </button>
      </main>
    </div>
  );
}

export default TambahCatatan;
