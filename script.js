// Ambil elemen input
const inputPermintaan = document.getElementById('permintaan');
const inputKonversi = document.getElementById('konversi');
const inputKelipatan = document.getElementById('kelipatan');

// Ambil elemen output
const hasilBagEl = document.getElementById('hasil-bag');
const totalKgEl = document.getElementById('total-kg');
const detailHitunganEl = document.getElementById('detail-hitungan');
const btnReset = document.getElementById('btn-reset');

// Fungsi format angka agar rapi
function formatAngka(num) {
  return Number(num.toFixed(4)).toLocaleString('id-ID');
}

// Fungsi utama perhitungan (Cara Pertama sesuai catatan)
function hitungKonversi() {
  const P = parseFloat(inputPermintaan.value) || 0;
  const C = parseFloat(inputKonversi.value) || 0;
  const K = parseFloat(inputKelipatan.value) || 1;

  // Validasi agar tidak membagi dengan 0 atau angka negatif
  if (P <= 0 || C <= 0 || K <= 0) {
    hasilBagEl.innerHTML = `0 <span>Bag</span>`;
    totalKgEl.innerHTML = `0 <span>KG</span>`;
    detailHitunganEl.textContent = 'Masukkan nilai Permintaan dan Konversi lebih dari 0.';
    return;
  }

  // Langkah 1: Hitung BAG mentah = P / C
  const bagMentah = Number((P / C).toFixed(6));

  // Langkah 2: Bulatkan ke atas -> [BAG]
  const bagBulat = Math.ceil(bagMentah);

  // Langkah 3: Hitung total paket kelipatan -> [ [BAG] / K ]
  const kelipatanRatio = Number((bagBulat / K).toFixed(6));
  const totalKelipatan = Math.ceil(kelipatanRatio);

  // Langkah 4: Hasil = Total Kelipatan * K
  const hasilBag = totalKelipatan * K;

  // Langkah 5: Total KG = Hasil * C
  const totalKg = hasilBag * C;
  const selisihKg = totalKg - P;

  // Tampilkan hasil ke layar
  hasilBagEl.innerHTML = `${formatAngka(hasilBag)} <span>Bag</span>`;
  totalKgEl.innerHTML = `${formatAngka(totalKg)} <span>KG</span>`;

  detailHitunganEl.textContent =
    `Awal: ${formatAngka(bagMentah)} bag → Bulat: ${bagBulat} bag → ${totalKelipatan}× kelipatan ${K} (+${formatAngka(selisihKg)} KG)`;
}

// Fungsi Reset ke 0
function resetForm() {
  inputPermintaan.value = '';
  inputKonversi.value = '';
  inputKelipatan.value = '1';
  hitungKonversi();
  inputPermintaan.focus();
}

// Jalankan hitung otomatis setiap kali user mengetik/mengubah nilai
[inputPermintaan, inputKonversi, inputKelipatan].forEach((input) => {
  input.addEventListener('input', hitungKonversi);
});

// Jalankan reset saat tombol diklik
btnReset.addEventListener('click', resetForm);