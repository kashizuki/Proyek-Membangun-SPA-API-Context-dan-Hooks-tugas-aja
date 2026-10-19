/**
 * helpers.js — Fungsi utilitas bersama
 *
 * Hanya ada SATU fungsi formatDate di seluruh aplikasi.
 * Diimpor oleh NoteCard.jsx dan BacaCatatan.jsx.
 */

/**
 * Memformat string tanggal ISO ke format lengkap bahasa Indonesia.
 * Contoh output: "Minggu, 19 Oktober 2026"
 *
 * @param {string} isoString - Tanggal dalam format ISO 8601
 * @returns {string} Tanggal terformat dalam bahasa Indonesia
 */
export function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
