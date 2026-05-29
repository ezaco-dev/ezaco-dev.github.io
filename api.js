// URL diganti bagian ujungnya dari out:csv menjadi out:json
const urlData = "https://docs.google.com/spreadsheets/d/1JY9rSflNl021ZUK9no6YgCEAMm4Fc8bRYr_lDza1GiQ/gviz/tq?tqx=out:json";

let daftarPesan = [];
let indeksPesan = 0;

let isTyping = false;
let indeksKetik = 0;
let teksSedangDiketik = "";
let timerKetik;
const kecepatanKetik = 50; 

// Menggunakan daftar GIF yang kamu tentukan
const daftarGif = [
  "https://htmlku.com/0/panda/pusn2.gif",
  "https://htmlku.com/0/panda/hiya.gif",
  "https://htmlku.com/0/panda/pusn2.gif",
  "https://htmlku.com/0/panda/hiya.gif",
  "https://htmlku.com/0/panda/pusn2.gif",
  "https://htmlku.com/0/panda/hiya.gif",
  "https://htmlku.com/0/panda/pusn2.gif",
  "https://htmlku.com/0/panda/hiya.gif",
  "https://htmlku.com/0/panda/pusn2.gif",
  "https://htmlku.com/0/panda/hiya.gif",
  "https://htmlku.com/0/panda/pusn2.gif",
  "https://htmlku.com/0/panda/hiya.gif"
];

// 1. Mengambil data sebagai JSON (Mendukung Multi-Baris/Enter di dalam 1 Sel)
async function muatDataPesan() {
  try {
    const respon = await fetch(urlData);
    if (!respon.ok) throw new Error("Koneksi gagal");

    const teksRespon = await respon.text();
    
    // Mengekstrak bagian JSON murni dari respon Google Sheets
    const jsonString = teksRespon.substring(teksRespon.indexOf('{'), teksRespon.lastIndexOf('}') + 1);
    const dataBersih = JSON.parse(jsonString);

    // Mengambil data khusus di kolom pertama (c[0]) 
    daftarPesan = dataBersih.table.rows.map(baris => {
        return baris.c[0] ? baris.c[0].v : "";
    }).filter(pesan => pesan !== null && pesan.trim() !== "");

    console.log("Data siap (Mendukung enter per paragraf):", daftarPesan);
  } catch (error) {
    console.error("Gagal, pakai data cadangan:", error);
    daftarPesan = ["Halo Sayang! 🩷", "Aku cuma mau bilang...\nWalau banyak rintangan", "Aku sayang banget sama kamu! 🥰"];
  }
}

// 2. Membuka surat
function mulaiWeb() {
  const cover = document.getElementById("cover");
  const konten = document.getElementById("konten");
  const bgm = document.getElementById("bgm");
  
  bgm.currentTime = 48

  cover.style.opacity = "0";
  cover.style.visibility = "hidden";
  konten.classList.remove("hidden");

  if (bgm) {
    bgm.play().catch(err => console.log("Auto-play diblokir:", err));
  }

  tampilkanPesanSekarang();
}

// 3. Menyiapkan gambar dan tombol
function tampilkanPesanSekarang() {
  const gif = document.getElementById("gif-bucin");
  const btn = document.getElementById("btn-lanjut");

  if (daftarPesan.length > 0 && indeksPesan < daftarPesan.length) {
    const indeksGifSekarang = indeksPesan % daftarGif.length;
    gif.src = daftarGif[indeksGifSekarang];

    if (indeksPesan === daftarPesan.length - 1) {
      btn.style.display = "none";
    } else {
      btn.textContent = "Lanjut 🩷";
    }

    jalankanAnimasiKetik(daftarPesan[indeksPesan]);
  }
}

// 4. Animasi Ketik dengan dukungan Enter dan Auto-Scroll
function jalankanAnimasiKetik(teks) {
  const param = document.getElementById("param");
  
  // MENGAKTIFKAN RENDER ENTER: Memaksa HTML untuk menghormati Enter dari Google Sheets
  param.style.whiteSpace = "pre-line";

  clearTimeout(timerKetik);
  param.textContent = ""; 
  
  isTyping = true;
  indeksKetik = 0;
  teksSedangDiketik = teks;

  function ketikHuruf() {
    if (indeksKetik < teksSedangDiketik.length) {
      param.textContent += teksSedangDiketik.charAt(indeksKetik);
      indeksKetik++;
      
      // Auto-scroll mengikuti teks ke bawah
      param.scrollTop = param.scrollHeight;
      
      timerKetik = setTimeout(ketikHuruf, kecepatanKetik);
    } else {
      isTyping = false; 
    }
  }

  ketikHuruf();
}

// 5. Interaksi saat tombol ditekan
function pesanSelanjutnya() {
  const param = document.getElementById("param");
  
  // Jika masih ngetik, langsung munculkan semua (Skip)
  if (isTyping) {
    clearTimeout(timerKetik);
    param.textContent = teksSedangDiketik;
    
    // Auto-scroll ke bawah saat teks di-skip agar tidak tertinggal di atas
    param.scrollTop = param.scrollHeight;
    
    isTyping = false;
    return; 
  }

  indeksPesan++;

  if (indeksPesan < daftarPesan.length) {
    tampilkanPesanSekarang();
  } 
}

window.addEventListener("DOMContentLoaded", muatDataPesan);
