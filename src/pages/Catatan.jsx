import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { formatDate } from '../utils/helpers';
import useInput from '../hooks/useInput';
import useLocale from '../hooks/useLocale';
import { getActiveNotes } from '../utils/network-data';
import '../css/Catatan.css';

// Halaman Catatan Aktif (Halaman Utama setelah login)
function Catatan({ authedUser, onLogout }) {
  const { t } = useLocale();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  // Controlled input untuk pencarian judul catatan
  const [keyword, handleKeywordChange] = useInput('');

  // Ambil daftar catatan aktif dari server saat komponen pertama dimuat
  useEffect(() => {
    async function fetchNotes() {
      const { error, data } = await getActiveNotes();
      if (!error && data) {
        // Urutkan dari terbaru ke terlama
        setNotes(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        setNotes([]);
      }
      setLoading(false);
    }
    fetchNotes();
  }, []);

  // Filter catatan berdasarkan kata kunci judul (case-insensitive)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      {/* Navbar bersama */}
      <Navbar authedUser={authedUser} onLogout={onLogout} />

      <main>
        {/* Judul bagian */}
        <h2>{t('activeNotes')}</h2>

        {/* Kolom pencarian */}
        <input
          type="text"
          className="search-bar"
          placeholder={t('searchPlaceholder')}
          value={keyword}
          onChange={handleKeywordChange}
        />

        {/* Status: loading, kosong, atau daftar kartu */}
        {loading ? (
          <p className="loading-message">{t('loading')}</p>
        ) : filteredNotes.length === 0 ? (
          <p className="empty-message">{t('noNotes')}</p>
        ) : (
          <section className="notes-list">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} formatDate={formatDate} />
            ))}
          </section>
        )}

        {/* FAB: tambah catatan baru */}
        <Link
          to="/notes/new"
          className="fab-button"
          aria-label={t('addNote')}
          title={t('addNote')}
        >
          +
        </Link>
      </main>
    </div>
  );
}

export default Catatan;
