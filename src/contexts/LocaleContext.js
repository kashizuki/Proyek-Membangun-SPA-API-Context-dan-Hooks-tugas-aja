import { createContext } from 'react';

// Kamus terjemahan aplikasi: Indonesia ('id') dan Inggris ('en')
export const translations = {
  id: {
    // Navbar
    appName: 'Aplikasi Catatan',
    navArchived: 'Terarsip',
    navLogout: 'Keluar',
    langToggle: 'Switch to English',
    themeToLight: 'Ganti ke mode terang',
    themeToDark: 'Ganti ke mode gelap',

    // Halaman Utama (Catatan)
    activeNotes: 'Catatan Aktif',
    searchPlaceholder: 'Cari berdasarkan judul ...',
    noNotes: 'Tidak ada catatan',
    loading: 'Memuat...',

    // Halaman Arsip (Terarsip)
    archivedNotes: 'Catatan Arsip',

    // Halaman Tambah Catatan
    titlePlaceholder: 'Catatan rahasia',
    bodyPlaceholder: 'Sebenarnya saya adalah ....',
    saveNote: 'Simpan catatan',
    addNote: 'Tambah catatan',
    titleBodyRequired: 'Judul dan isi catatan wajib diisi',
    failedSave: 'Gagal menyimpan catatan',

    // Halaman Detail (BacaCatatan)
    archiveNote: 'Arsipkan catatan',
    activateNote: 'Aktifkan catatan',
    deleteNote: 'Hapus catatan',
    noteNotFound: 'Catatan tidak ditemukan.',
    backToHome: '← Kembali ke Beranda',
    confirmDelete: 'Apakah Anda yakin ingin menghapus catatan ini?',
    failedArchive: 'Gagal mengarsipkan catatan',
    failedActivate: 'Gagal mengaktifkan catatan',
    failedDelete: 'Gagal menghapus catatan',

    // Login
    loginPrompt: 'Yuk, login untuk menggunakan aplikasi.',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    noAccount: 'Belum punya akun?',
    registerHere: 'Daftar di sini',

    // Register
    registerPrompt: 'Isi form untuk mendaftar akun.',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    register: 'Register',
    hasAccount: 'Sudah punya akun?',
    loginHere: 'Login di sini',
    passwordMismatch: 'Password dan Confirm Password tidak sama',
  },
  en: {
    // Navbar
    appName: 'Notes App',
    navArchived: 'Archived',
    navLogout: 'Logout',
    langToggle: 'Ganti ke Bahasa Indonesia',
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',

    // Halaman Utama (Catatan)
    activeNotes: 'Active Notes',
    searchPlaceholder: 'Search by title ...',
    noNotes: 'No notes found',
    loading: 'Loading...',

    // Halaman Arsip (Terarsip)
    archivedNotes: 'Archived Notes',

    // Halaman Tambah Catatan
    titlePlaceholder: 'Secret note',
    bodyPlaceholder: 'Actually I am ....',
    saveNote: 'Save note',
    addNote: 'Add note',
    titleBodyRequired: 'Title and note content are required',
    failedSave: 'Failed to save note',

    // Halaman Detail (BacaCatatan)
    archiveNote: 'Archive note',
    activateNote: 'Activate note',
    deleteNote: 'Delete note',
    noteNotFound: 'Note not found.',
    backToHome: '← Back to Home',
    confirmDelete: 'Are you sure you want to delete this note?',
    failedArchive: 'Failed to archive note',
    failedActivate: 'Failed to activate note',
    failedDelete: 'Failed to delete note',

    // Login
    loginPrompt: 'Log in to use the app.',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    noAccount: "Don't have an account?",
    registerHere: 'Register here',

    // Register
    registerPrompt: 'Fill in the form to create an account.',
    name: 'Name',
    confirmPassword: 'Confirm Password',
    register: 'Register',
    hasAccount: 'Already have an account?',
    loginHere: 'Login here',
    passwordMismatch: 'Password and Confirm Password do not match',
  },
};

// LocaleContext: context untuk state bahasa global ('id' | 'en')
const LocaleContext = createContext({
  locale: 'id',
  toggleLocale: () => {},
  t: () => '',
});

export default LocaleContext;
