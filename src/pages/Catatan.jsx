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
