// URL CSV dari Google Sheets temanmu
const urlData = "https://docs.google.com/spreadsheets/d/1JY9rSflNl021ZUK9no6YgCEAMm4Fc8bRYr_lDza1GiQ/gviz/tq?tqx=out:csv";

      let teksBersih = barisPesan[0].replace(/^"|"$/g, '');
      
      // Tambahkan baris ini:
      console.log("TEKS DARI SHEETS ADALAH:", teksBersih); 
      
      param.textContent = teksBersih; 


async function ambilTeks() {
  try {
    const respon = await fetch(urlData);
    
    if (!respon.ok) {
      throw new Error("Gagal mengambil data dari Google Sheets");
    }

    // Mengambil data sebagai teks
    const teksCsv = await respon.text(); 
    
    // Memecah teks berdasarkan enter menjadi Array
    const barisPesan = teksCsv.split('\n').filter(pesan => pesan.trim() !== "");

    const param = document.getElementById("param");
    if (param && barisPesan.length > 0) {
      // Mengambil baris pertama (index 0) dan membersihkan sisa tanda kutip bawaan CSV
      let teksBersih = barisPesan[0].replace(/^"|"$/g, '');
      
      // Menampilkan ke HTML
      param.textContent = teksBersih; 
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Jalankan fungsi setelah halaman selesai dimuat
window.addEventListener("DOMContentLoaded", ambilTeks);
