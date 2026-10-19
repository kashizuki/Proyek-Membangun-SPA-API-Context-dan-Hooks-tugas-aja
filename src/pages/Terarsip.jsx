import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { formatDate } from '../utils/helpers';
import useInput from '../hooks/useInput';
import useLocale from '../hooks/useLocale';
import { getArchivedNotes } from '../utils/network-data';
import '../css/Terarsip.css';

/**
 * Terarsip — Halaman Catatan Arsip.
 *
 * Menampilkan daftar catatan yang telah diarsipkan, dengan:
 * - Navbar bersama (logo, ThemeToggle, ganti bahasa, profil, logout)
 * - Kolom pencarian catatan arsip (filter client-side, case-insensitive)
 * - Tiga status UI: memuat, kosong, dan daftar kartu catatan
 */
function Terarsip({ authedUser, onLogout }) {
  const { t } = useLocale();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, handleKeywordChange] = useInput('');

  // Ambil catatan terarsip dari server saat komponen pertama dimuat
  useEffect(() => {
    async function fetchArchivedNotes() {
      setLoading(true);
      const { error, data } = await getArchivedNotes();
      if (!error && data) {
        setNotes(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        setNotes([]);
      }
      setLoading(false);
    }
    fetchArchivedNotes();
  }, []);

  // Filter catatan terarsip berdasarkan judul (case-insensitive)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="archives-page">
      {/* Navbar bersama */}
      <Navbar authedUser={authedUser} onLogout={onLogout} />

      <main className="archives-page__main">
        {/* Judul halaman */}
        <h2 className="archives-page__title">{t('archivedNotes')}</h2>

        {/* Kolom pencarian */}
        <input
          type="text"
          className="archives-page__search-input"
          placeholder={t('searchPlaceholder')}
          value={keyword}
          onChange={handleKeywordChange}
        />

        {/* Status: loading, kosong, atau daftar kartu */}
        {loading ? (
          <p className="archives-page__status">{t('loading')}</p>
        ) : filteredNotes.length === 0 ? (
          <p className="archives-page__empty">{t('noNotes')}</p>
        ) : (
          <section className="archives-page__notes-list">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} formatDate={formatDate} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Terarsip;
