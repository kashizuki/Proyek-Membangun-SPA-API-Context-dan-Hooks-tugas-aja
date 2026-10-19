import { Link } from 'react-router-dom';
import { formatDate as defaultFormatDate } from '../utils/helpers';

/**
 * NoteCard — Komponen kartu catatan yang dipakai bersama
 * oleh Catatan.jsx (catatan aktif) dan Terarsip.jsx (catatan arsip).
 *
 * Props:
 * - note: objek catatan { id, title, body, createdAt }
 * - formatDate: (opsional) fungsi pemformat tanggal, default memakai formatDate dari helpers.js
 */
function NoteCard({ note, formatDate = defaultFormatDate }) {
  return (
    <article className="note-card note-item">
      {/* Judul catatan dengan tautan ke halaman detail */}
      <h3 className="note-card__title">
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h3>

      {/* Tanggal catatan dalam format lengkap bahasa Indonesia */}
      <p className="note-card__date date">{formatDate(note.createdAt)}</p>

      {/* Isi / ringkasan catatan */}
      <p className="note-card__body body">{note.body}</p>
    </article>
  );
}

export default NoteCard;
