const param = document.getElementById("param")

// Menggunakan async/await agar lebih rapi
async function ambilTeks() {
  try {
    const respon = await fetch("https://rentry.co/hpgcbrmt/raw", {
      method: "GET",
      headers: {
        // Ganti 'KODE_AKSES_ANDA' dengan kode dari Rentry
        "rentry-auth": "123" 
      }
    });

    // Mengubah hasil respon menjadi teks biasa
    const teksTersimpan = await respon.text(); 

    // Memasukkan teks tersebut ke dalam elemen HTML ber-id 'param'
    const param = document.getElementById("param");
    if (param) {
      param.textContent = teksTersimpan;
    }
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
}

// Jalankan fungsi setelah halaman selesai dimuat
window.addEventListener("DOMContentLoaded", ambilTeks);

