const inputPermintaan = document.getElementById('permintaan');
const inputKonversi = document.getElementById('konversi');
const inputKelipatan = document.getElementById('kelipatan');

const hasilAtasEl = document.getElementById('hasil-atas');
const kgAtasEl = document.getElementById('kg-atas');

const hasilBawahEl = document.getElementById('hasil-bawah');
const kgBawahEl = document.getElementById('kg-bawah');

const btnReset = document.getElementById('btn-reset');

function formatAngka(num) {
  return Number(num.toFixed(4)).toLocaleString('id-ID');
}

function setKosong() {
  hasilAtasEl.textContent = '0';
  kgAtasEl.textContent = '0 KG';

  hasilBawahEl.textContent = '0';
  kgBawahEl.textContent = '0 KG';
}

function hitungKonversi() {
  const P = parseFloat(inputPermintaan.value) || 0;
  const C = parseFloat(inputKonversi.value) || 0;
  const K = parseFloat(inputKelipatan.value) || 1;

  if (P <= 0 || C <= 0 || K <= 0) {
    setKosong();
    return;
  }

  const bagMentah = Number((P / C).toFixed(6));

  // KG Lebih Besar (Bulat ke Atas)
  const bagAtas = Math.ceil(bagMentah);
  const paketAtas = Math.ceil(Number((bagAtas / K).toFixed(6)));
  const hasilAtas = paketAtas * K;
  const kgAtas = hasilAtas * C;

  hasilAtasEl.textContent = formatAngka(hasilAtas);
  kgAtasEl.textContent = `${formatAngka(kgAtas)} KG`;

  // KG Lebih Kecil (Bulat ke Bawah)
  const bagBawah = Math.floor(bagMentah);
  const paketBawah = Math.floor(Number((bagBawah / K).toFixed(6)));
  const hasilBawah = paketBawah * K;
  const kgBawah = hasilBawah * C;

  hasilBawahEl.textContent = formatAngka(hasilBawah);
  kgBawahEl.textContent = `${formatAngka(kgBawah)} KG`;
}

function resetForm() {
  inputPermintaan.value = '';
  inputKonversi.value = '';
  inputKelipatan.value = '1';
  hitungKonversi();
  inputPermintaan.focus();
}

[inputPermintaan, inputKonversi, inputKelipatan].forEach((input) => {
  input.addEventListener('input', hitungKonversi);
});

btnReset.addEventListener('click', resetForm);
hitungKonversi();
