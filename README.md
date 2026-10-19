# Aplikasi Catatan (SPA)

Single Page Application (SPA) manajemen catatan berbasis **React**, **Vite**, dan **React Router**, terintegrasi dengan REST API Dicoding Notes API. Aplikasi ini mendukung autentikasi pengguna, manajemen catatan aktif & arsip, tema Dark/Light Mode, alih bahasa (Indonesia/Inggris), serta indikasi loading interaktif.

---

## 🚀 Fitur Utama

1. **Autentikasi Pengguna**:
   - Pendaftaran akun baru (*Register*) dengan validasi kecocokan kata sandi.
   - Masuk akun (*Login*) dan penyimpanan access token secara persisten di `localStorage`.
   - Proteksi rute navigasi (hanya halaman Login dan Register yang dapat diakses pengguna belum login; halaman catatan terproteksi penuh).
   - Keluar akun (*Logout*) dengan pembersihan token dan reset sesi aplikasi.
   - *Catatan*: Penanganan respons dan pesan error autentikasi berasal langsung dari berkas `src/utils/network-data.js` (berkas bawaan Dicoding).

2. **Manajemen Catatan (CRUD)**:
   - **Catatan Aktif**: Menampilkan seluruh catatan aktif yang diurutkan dari yang terbaru, dilengkapi pencarian judul secara *real-time* (*client-side filter*).
   - **Catatan Arsip**: Halaman khusus untuk menampilkan catatan yang telah diarsipkan, dilengkapi kolom pencarian judul.
   - **Tambah Catatan**: Membuat catatan baru dengan judul dan isi melalui fungsi API `addNote`.
   - **Detail Catatan**: Membaca catatan lengkap dengan format tanggal terstandarisasi.
   - **Arsipkan & Aktifkan Kembali**: Memindahkan catatan antara daftar aktif dan arsip.
   - **Hapus Catatan**: Menghapus catatan permanen dengan konfirmasi pengguna (*window.confirm*).

3. **Tema Dark Mode & Light Mode**:
   - Dikelola melalui React Context (`ThemeContext`) dan custom hook (`useTheme`).
   - Tombol toggle tema (`ThemeToggle`) tersedia pada `Navbar` di seluruh halaman aplikasi.
   - Persistensi tema di `localStorage` dan pencegahan kedipan tema (*anti-flicker*) saat halaman di-refresh via inline script di `index.html`.
   - Atribut `data-theme` otomatis diterapkan pada elemen root `<html>`.

4. **Fitur Ubah Bahasa (Multibahasa ID / EN)**:
   - Dikelola melalui React Context (`LocaleContext`) dan custom hook (`useLocale`).
   - Mendukung dua bahasa: **Indonesia (ID)** dan **Inggris (EN)**.
   - Seluruh teks antarmuka (UI), tombol, placeholder, pesan status, tooltip, aria-label, konfirmasi, dan alert mengambil nilai dari kamus terjemahan via fungsi `t()`.
   - Persistensi bahasa pilihan pengguna di `localStorage` serta sinkronisasi atribut `lang` pada `<html>`.

5. **Indikasi Loading Interaktif**:
   - Indikator memuat saat inisialisasi sesi aplikasi, memuat daftar catatan, memuat detail catatan, serta saat submit form login, register, dan tambah catatan.
   - Tombol aksi mengambang (FAB) arsip dan hapus pada halaman detail dinonaktifkan (*disabled*) selama proses request berlangsung untuk mencegah *double submit*.

---

## 🛠️ Tech Stack & Versi

- **React**: `^19.2.8`
- **React DOM**: `^19.2.8`
- **React Router DOM**: `^7.18.4`
- **Vite**: `^8.3.0`
- **ESLint**: `^10.10.0`
- **Styling**: Vanilla CSS & CSS Variables (Global Theme)

---

## 🌐 REST API Endpoints

Aplikasi terhubung ke backend Dicoding Notes API:
- **Base URL**: `https://notes-api.dicoding.dev/v1`
- **Interaksi Jaringan**: Ditangani oleh berkas bawaan Dicoding `src/utils/network-data.js`.

---

## 💻 Cara Menjalankan Proyek

Pastikan Node.js telah terpasang di komputer Anda.

1. **Instalasi Dependensi**:
   ```bash
   npm install
   ```

2. **Menjalankan Server Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Buka peramban di alamat yang tertera (biasanya `http://localhost:5173`).

3. **Menjalankan Pengecekan Kualitas Kode (Linting)**:
   ```bash
   npm run lint
   ```

4. **Membangun Bundle Produksi**:
   ```bash
   npm run build
   ```

---

## 📂 Struktur Direktori Proyek

```text
├── index.html                  # Template HTML dengan script anti-flicker tema & bahasa
├── package.json                # Konfigurasi dependensi dan skrip proyek
├── src/
│   ├── App.jsx                 # Komponen root: autentikasi, proteksi rute, dan navigasi SPA
│   ├── index.css               # Styling global, impor theme.css, dan styling terpadu Navbar
│   ├── main.jsx                # Entry point: BrowserRouter, ThemeProvider, LocaleProvider
│   ├── components/
│   │   ├── Navbar.jsx          # Komponen navigasi bersama untuk semua halaman (logo, link, toggle, user, logout)
│   │   ├── NoteCard.jsx        # Komponen kartu catatan bersama untuk Catatan dan Terarsip
│   │   └── ThemeToggle.jsx     # Tombol interaktif pengalih mode terang/gelap
│   ├── contexts/
│   │   ├── LocaleContext.js    # Konteks bahasa dan kamus terjemahan (id & en)
│   │   ├── LocaleProvider.jsx  # Provider bahasa dengan persistensi localStorage & sinkronisasi html lang
│   │   ├── ThemeContext.js     # Konteks tema global ('light' | 'dark')
│   │   └── ThemeProvider.jsx   # Provider tema dengan validasi nilai & sinkronisasi html data-theme
│   ├── css/
│   │   ├── BacaCatatan.css     # Styling khusus halaman detail catatan dan FAB aksi
│   │   ├── Catatan.css         # Styling halaman catatan aktif, search bar, dan FAB tambah
│   │   ├── LoginRegister.css   # Styling form autentikasi halaman login dan register
│   │   ├── TambahCatatan.css   # Styling formulir pembuatan catatan baru dan tombol simpan
│   │   ├── Terarsip.css        # Styling halaman catatan arsip dan grid kartu
│   │   └── theme.css           # Variabel warna CSS dan aturan penataan mode gelap global
│   ├── hooks/
│   │   ├── useInput.js         # Custom hook untuk controlled input pada formulir & pencarian
│   │   ├── useLocale.js        # Custom hook untuk mengakses state bahasa, fungsi toggle, dan helper t()
│   │   └── useTheme.js         # Custom hook untuk mengakses state tema dan fungsi pengalih tema
│   ├── pages/
│   │   ├── BacaCatatan.jsx     # Halaman detail catatan (baca, arsipkan/aktifkan kembali, hapus)
│   │   ├── Catatan.jsx         # Halaman utama catatan aktif (pencarian, daftar NoteCard, navigasi tambah)
│   │   ├── LoginPage.jsx       # Halaman login pengguna
│   │   ├── RegisterPage.jsx    # Halaman pendaftaran akun pengguna baru
│   │   ├── TambahCatatan.jsx   # Halaman tambah catatan baru (addNote)
│   │   └── Terarsip.jsx        # Halaman catatan terarsip (pencarian, daftar NoteCard)
│   └── utils/
│       ├── helpers.js          # Fungsi utilitas formatDate tunggal untuk format tanggal Indonesia
│       └── network-data.js     # Modul jaringan bawaan Dicoding untuk interaksi API
```

---

## ✅ Checklist Kriteria Penerimaan

- [x] **Konsistensi Penamaan**: Berkas dan komponen menggunakan nama baku `Terarsip.jsx`, `Terarsip.css`, dan `LoginRegister.css`. Tidak ada lagi penamaan "Terasip" di seluruh kode.
- [x] **Komponen Navbar Bersama**: Seluruh 6 halaman menggunakan komponen `Navbar.jsx` bersama yang konsisten.
- [x] **Aksesibilitas & Struktur Elemen**: Tidak ada elemen `<button>` bersarang di dalam `<Link>` (atau sebaliknya) di seluruh aplikasi.
- [x] **Visibilitas ThemeToggle**: Tombol tema tampil dan berfungsi di semua halaman, termasuk halaman publik (Login & Register).
- [x] **Pencegahan Kedipan Tema (Anti-Flicker)**: Skrip inline di `index.html` membaca tema dari `localStorage` sebelum React render.
- [x] **Komponen Kartu Bersama (`NoteCard`)**: Halaman Catatan Aktif dan Catatan Arsip menggunakan komponen `NoteCard.jsx` yang sama.
- [x] **Standarisasi Format Tanggal**: Menggunakan satu fungsi terpusat `formatDate` di `src/utils/helpers.js` yang dipakai oleh `NoteCard` dan `BacaCatatan`.
- [x] **Pembersihan Elemen Obsolete**: Elemen pembantu `#assistant-icon` pada `RegisterPage` yang tidak memiliki style telah dihapus.
- [x] **Fitur Multibahasa (Opsional 2)**: Beralih bahasa (ID / EN) secara dinamis, seluruh teks UI memakai kamus bahasa terpusat, dan preferensi tersimpan di `localStorage`.
- [x] **Indikasi Loading (Opsional 1)**: Indikator loading pada saat memuat data, submit formulir, dan tombol FAB aksi dinonaktifkan selama pemrosesan request.
- [x] **Kualitas Kode**: Lolos validasi `npm run lint` dengan 0 error dan 0 warning, serta lolos `npm run build` produksi.

---

## 📝 Catatan Progres & Pembaruan

- **Refaktorisasi Komponen & Desain Bersih**: Menyatukan header dari keenam halaman ke dalam komponen tunggal `Navbar.jsx` dan menyatukan representasi kartu ke `NoteCard.jsx`.
- **Eliminasi Gaya CSS Duplikat**: Gaya header pada masing-masing CSS halaman dibersihkan dan dipusatkan pada `index.css`.
- **Dukungan Penuh Multibahasa**: Mengimplementasikan `LocaleContext`, `LocaleProvider`, dan hook `useLocale` yang mencakup seluruh string antarmuka pengguna tanpa teks statis hard-coded.
- **Peningkatan UX & Keamanan Aksi**: Penambahan status disable pada FAB halaman detail guna mencegah duplikasi pengiriman aksi arsip atau hapus.
