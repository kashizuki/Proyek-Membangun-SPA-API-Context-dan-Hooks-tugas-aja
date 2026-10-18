# Dokumentasi Proyek: Aplikasi Catatan (SPA)

Dokumentasi ini mencatat progres pengerjaan proyek Single Page Application (SPA) Aplikasi Catatan.

---

## 📌 Progres Pengerjaan Saat Ini
**Tahap: Implementasi Logic Login & Register + Proteksi Rute Autentikasi + Halaman Catatan**

Mengacu pada *PRD Sederhana: Logic Login dan Register*, pada tahap ini telah diimplementasikan fungsionalitas dan logika penuh pada aplikasi:
1. **Custom Hook `useInput`**: Menangani controlled component pada seluruh input form (Login & Register) agar logic tidak berulang.
2. **Logic Register (`RegisterPage.jsx`)**: Validasi client-side (kesesuaian Password dan Confirm Password), pemanggilan API `register`, pencegahan request ganda, serta navigasi otomatis ke halaman login setelah berhasil.
3. **Logic Login (`LoginPage.jsx`)**: Pemanggilan API `login`, penyimpanan `accessToken` ke localStorage via `putAccessToken`, pemanggilan `getUserLogged()`, dan pengalihan ke halaman utama.
4. **State Autentikasi & Proteksi Rute (`App.jsx`)**:
   - Pengecekan token saat aplikasi pertama kali dimuat via `useEffect` dan `getUserLogged()`.
   - Indikator `initializing` ("Memuat...") untuk mencegah tampilan berkedip.
   - Proteksi rute: pengguna belum login hanya dapat mengakses `/` (Login) dan `/register`. Pengguna yang sudah login langsung diarahkan ke halaman **Catatan**.
   - Fungsionalitas **Logout**: mengosongkan token dan mereset state autentikasi.
5. **Halaman Utama (`Catatan.jsx`)**: Menampilkan nama pengguna yang sedang aktif, tombol logout, dan teks `"hello world"`.

---

## 📁 Struktur Berkas Terkait
```text
src/
├── hooks/
│   └── useInput.js        # Custom hook untuk controlled input form
├── pages/
│   ├── LoginPage.jsx      # Halaman Login (controlled input, API login, navigasi)
│   ├── RegisterPage.jsx   # Halaman Register (validasi password, API register, redirect)
│   └── Catatan.jsx        # Halaman Catatan (halaman utama saat login: "hello world" & logout)
├── utils/
│   ├── network-data.js    # Utilitas API (login, register, getUserLogged, token)
│   └── local-data.js      # Utilitas data lokal
├── App.jsx                # Manajemen state autentikasi, handler login/logout, rute
└── main.jsx               # Entry point aplikasi (BrowserRouter & createRoot)
```

---

## 🛠️ Rincian Implementasi & Dokumentasi Kode

### 1. Custom Hook `useInput` (`src/hooks/useInput.js`)
Hook kustom untuk menyederhanakan pengelolaan state input teks pada komponen form.

```javascript
import { useState } from 'react';

// Custom hook useInput untuk menangani input form bertipe controlled component
function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  return [value, handleValueChange];
}

export default useInput;
```

---

### 2. Status Autentikasi & Rute Utama (`src/App.jsx`)
Mengelola state `authedUser` dan `initializing`, memverifikasi token pengguna, serta memisahkan rute publik dan terproteksi.

```jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Catatan from './pages/Catatan';
import { getUserLogged, putAccessToken } from './utils/network-data';

// Komponen utama aplikasi yang mengelola state autentikasi dan routing aplikasi
function App() {
  // A1: State authedUser (data pengguna terautentikasi) dan initializing (status inisialisasi awal)
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // A2: Pengecekan token saat aplikasi pertama kali dimuat
  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchUser();
  }, []);

  // Handler saat login berhasil: simpan accessToken dan set data pengguna
  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  // Handler logout: kosongkan token di localStorage dan reset state authedUser
  function onLogout() {
    putAccessToken('');
    setAuthedUser(null);
  }

  // A3: Tampilkan teks memuat saat masih dalam proses inisialisasi agar halaman tidak berkedip
  if (initializing) {
    return <p>Memuat...</p>;
  }

  // A4: Jika pengguna belum login (authedUser === null), hanya rute login dan register yang tersedia
  if (authedUser === null) {
    return (
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLoginSuccess={onLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        {/* Mengarahkan rute yang tidak dikenal kembali ke halaman login */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // A5: Jika pengguna sudah login, langsung diarahkan ke halaman Catatan
  return (
    <Routes>
      <Route
        path="/"
        element={<Catatan authedUser={authedUser} onLogout={onLogout} />}
      />
      {/* Pengguna yang sudah login diarahkan ke halaman utama jika membuka rute lain seperti /register */}
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
```

---

### 3. Halaman Login (`src/pages/LoginPage.jsx`)
Menggunakan `useInput` untuk mengontrol input email dan password, memanggil fungsi API `login()`, serta mencegah request ganda via state `loading`.

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';

// Komponen fungsional untuk Halaman Login Aplikasi Catatan
// Dilengkapi logic controlled input, submit handler, dan pemanggilan API login
function LoginPage({ onLoginSuccess }) {
  // Controlled input hooks menggunakan custom hook useInput
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler saat form login disubmit
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // Memanggil API login dari network-data.js
    const { error, data } = await login({ email, password });

    setLoading(false);

    // Jika berhasil (tidak error), teruskan data token ke handler onLoginSuccess di App
    if (!error) {
      onLoginSuccess(data);
    }
  }

  return (
    <div>
      {/* 1. Header: Judul aplikasi */}
      <header>
        <h1>Aplikasi Catatan</h1>
      </header>

      {/* Konten Utama */}
      <main>
        {/* 2. Pesan ajakan login */}
        <p>Yuk, login untuk menggunakan aplikasi.</p>

        {/* 3. Form Login */}
        <form onSubmit={handleSubmit}>
          {/* Kolom input Email */}
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              size="40"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* Kolom input Password */}
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              size="40"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* 4. Tombol submit Login (disabled saat proses loading untuk cegah request ganda) */}
          <button type="submit" disabled={loading}>
            {loading ? 'Memuat...' : 'Login'}
          </button>
        </form>

        {/* 5. Tautan navigasi SPA ke halaman registrasi */}
        <p>
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </main>
    </div>
  );
}

export default LoginPage;
```

---

### 4. Halaman Register (`src/pages/RegisterPage.jsx`)
Menggunakan `useInput` untuk 4 field (name, email, password, confirmPassword), melakukan validasi kesamaan kata sandi, dan memanggil API `register()`.

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';

// Komponen fungsional untuk Halaman Register Aplikasi Catatan
// Dilengkapi controlled input, validasi client, submit handler, dan redirect
function RegisterPage() {
  const navigate = useNavigate();

  // Controlled input hooks menggunakan useInput
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  // Handler saat form registrasi disubmit
  async function handleSubmit(event) {
    event.preventDefault();

    // R3: Validasi client side - password dan confirm password harus cocok
    if (password !== confirmPassword) {
      alert('Password dan Confirm Password tidak sama');
      return;
    }

    setLoading(true);

    // R4: Memanggil API register dari network-data.js (confirmPassword tidak dikirim)
    const { error } = await register({ name, email, password });

    setLoading(false);

    // R6: Jika sukses, arahkan pengguna ke halaman login ('/')
    if (!error) {
      navigate('/');
    }
  }

  return (
    <div>
      {/* 1. Header: Judul aplikasi (identik dengan Halaman Login) */}
      <header>
        <h1>Aplikasi Catatan</h1>
      </header>

      {/* 2. Bagian Utama / Form Registrasi */}
      <main>
        {/* Instruksi Form (Teks tebal di atas form) */}
        <p>
          <strong>Isi form untuk mendaftar akun.</strong>
        </p>

        {/* Formulir Pendaftaran */}
        <form onSubmit={handleSubmit}>
          {/* Kolom input Name */}
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              size="40"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

          {/* Kolom input Email */}
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              size="40"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* Kolom input Password */}
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              size="40"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* Kolom input Confirm Password */}
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              size="40"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {/* Tombol submit Register (disabled saat loading untuk cegah request ganda) */}
          <button type="submit" disabled={loading}>
            {loading ? 'Memuat...' : 'Register'}
          </button>
        </form>

        {/* 3. Tautan navigasi SPA kembali ke Halaman Login */}
        <p>
          Sudah punya akun? <Link to="/">Login di sini</Link>
        </p>

        {/* 4. Ikon Asisten / Floating Widget (elemen visual div, styling diterapkan pada tahap CSS) */}
        <div id="assistant-icon" aria-label="Ikon Asisten">
          {/* Ikon asisten visual */}
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
```

---

### 5. Halaman Catatan (`src/pages/Catatan.jsx`)
Komponen halaman utama yang tampil ketika pengguna telah login.

```jsx
// Komponen Halaman Catatan (Halaman Utama saat pengguna telah terautentikasi / login)
function Catatan({ authedUser, onLogout }) {
  return (
    <div>
      <header>
        <h1>Aplikasi Catatan</h1>
        {/* Menampilkan nama pengguna yang terautentikasi dan tombol logout sesuai spesifikasi */}
        <p>Halo, {authedUser?.name}!</p>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        {/* Tampilan halaman catatan sederhana sesuai instruksi */}
        <p>hello world</p>
      </main>
    </div>
  );
}

export default Catatan;
```

---

## ✅ Kriteria Penerimaan yang Terpenuhi
- [x] **Login Berhasil ➔ Halaman Utama**: Mengisi form login dengan data valid membawa pengguna langsung ke halaman `Catatan.jsx` dan nama pengguna ditampilkan.
- [x] **Login Gagal**: Data salah menampilkan alert dari server dan pengguna tetap di halaman login.
- [x] **Penyimpanan Token**: Token tersimpan di `localStorage` melalui fungsi `putAccessToken`.
- [x] **Persistensi Sesi**: Refresh halaman tidak mengembalikan pengguna ke halaman login (diverifikasi via `getUserLogged()` pada `useEffect`).
- [x] **Validasi Password Register**: Register dengan password dan confirm password tidak sama akan memunculkan alert dan tidak mengirim request.
- [x] **Register Berhasil**: Mengarahkan pengguna langsung ke halaman login (`/`).
- [x] **Proteksi Rute**: Pengguna yang belum login tidak dapat membuka halaman utama (`Catatan.jsx`).
- [x] **Logout**: Mengosongkan token di `localStorage`, mereset state pengguna, dan mengembalikan tampilan ke halaman login.
- [x] **Custom Hook `useInput`**: Seluruh input dikelola oleh hook kustom tanpa duplikasi logika event handler.
- [x] **Bebas CSS**: Tampilan murni menggunakan default HTML styling sesuai aturan spesifikasi.
