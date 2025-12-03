# 🧮 Simulasi Perhitungan SPL - Analisis Biaya Grab

Aplikasi web modern untuk menghitung **Sistem Persamaan Linear (SPL)** menggunakan metode **Eliminasi Gauss** dan **Gauss-Jordan** untuk analisis biaya transportasi Grab.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌟 Fitur Utama

### 📊 Input Data Fleksibel
- ✅ Input manual data perjalanan (jarak, waktu, biaya)
- ✅ Tambah/hapus baris data secara dinamis
- ✅ Validasi real-time untuk memastikan data valid
- ✅ Opsi memuat data contoh (dapat dihapus)
- ✅ Minimal 3 baris data untuk perhitungan

### 🔢 Perhitungan SPL
- ✅ **Metode Eliminasi Gauss** - Mengubah matriks ke bentuk segitiga atas
- ✅ **Metode Gauss-Jordan** - Mengubah matriks ke bentuk identitas tereduksi
- ✅ Menampilkan proses transformasi matriks
- ✅ Solusi lengkap: Tarif Dasar, Tarif per Km, Tarif per Menit

### 📈 Visualisasi Data
- ✅ Grafik Jarak vs Biaya
- ✅ Grafik Waktu vs Biaya
- ✅ Perbandingan biaya aktual vs prediksi
- ✅ Tooltip interaktif dengan format mata uang

### 🎨 Desain Modern
- ✅ Tema warna hijau pastel yang lembut dan modern
- ✅ Animasi halus menggunakan Framer Motion
- ✅ Responsive design untuk semua ukuran layar
- ✅ Micro-interactions pada setiap interaksi

## 🎨 Palet Warna

Aplikasi ini menggunakan palet warna hijau pastel yang konsisten:

- **#A7E7BA** - Primary (Pastel Green)
- **#C9F2DD** - Secondary (Mint Muda)
- **#F5FFF9** - Background (Putih Kehijauan)
- **#7BC89A** - Accent (Secondary Green)
- **#3E6C54** - Dark Accent

## 🛠️ Teknologi yang Digunakan

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Animasi**: Framer Motion
- **Grafik**: Recharts
- **Routing**: React Router
- **Notifications**: Sonner

## 📦 Instalasi

### Prasyarat
- Node.js (versi 18 atau lebih tinggi)
- pnpm (package manager)

### Langkah Instalasi

1. **Clone atau download repository ini**

2. **Install dependencies**
```bash
pnpm install
```

3. **Jalankan development server**
```bash
pnpm run dev
```

4. **Buka browser dan akses**
```
http://localhost:5173
```

## 🚀 Cara Menggunakan

### 1. Landing Page
- Klik tombol **"Mulai Simulasi"** untuk memulai

### 2. Input Data
- **Tambah Baris**: Klik tombol "Tambah Baris" untuk menambah data baru
- **Hapus Baris**: Klik ikon trash pada baris yang ingin dihapus
- **Muat Contoh Data**: Klik "Muat Contoh Data" untuk mengisi dengan data dummy
- **Hapus Semua**: Klik "Hapus Semua" untuk menghapus seluruh data

**Format Input:**
- **Jarak**: Dalam kilometer (km)
- **Waktu**: Dalam menit
- **Biaya**: Dalam Rupiah (Rp)

**Contoh Data:**
| Jarak (km) | Waktu (menit) | Biaya (Rp) |
|------------|---------------|------------|
| 5          | 15            | 29,500     |
| 10         | 25            | 49,500     |
| 2          | 10            | 18,000     |

### 3. Hasil Perhitungan
Setelah klik **"Hitung SPL"**, aplikasi akan menampilkan:

#### Tab Metode Gauss
- Matriks augmented awal
- Matriks hasil eliminasi Gauss (bentuk segitiga atas)
- Solusi dengan interpretasi

#### Tab Metode Gauss-Jordan
- Matriks augmented awal
- Matriks hasil eliminasi Gauss-Jordan (bentuk identitas)
- Solusi dengan interpretasi

**Solusi yang ditampilkan:**
- 💰 **Tarif Dasar** - Biaya tetap untuk setiap perjalanan
- 📏 **Tarif per Kilometer** - Biaya tambahan per km
- ⏱️ **Tarif per Menit** - Biaya tambahan per menit

### 4. Visualisasi
Klik tombol **"Lihat Visualisasi"** untuk melihat:
- Grafik hubungan Jarak dengan Biaya
- Grafik hubungan Waktu dengan Biaya
- Perbandingan antara biaya aktual dan prediksi

## 📐 Metode Perhitungan

### Eliminasi Gauss
1. Membentuk matriks augmented dari data input
2. Forward elimination untuk mengubah ke bentuk segitiga atas
3. Back substitution untuk mendapatkan solusi

### Eliminasi Gauss-Jordan
1. Membentuk matriks augmented dari data input
2. Forward elimination dengan normalisasi pivot
3. Backward elimination untuk mengubah ke bentuk identitas
4. Solusi langsung terbaca dari kolom terakhir

### Formula Biaya Total
```
Biaya Total = Tarif Dasar + (Tarif per Km × Jarak) + (Tarif per Menit × Waktu)
```

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── Hero.tsx              # Landing page hero section
│   ├── DataInputTable.tsx    # Tabel input data dinamis
│   ├── MatrixDisplay.tsx     # Tampilan matriks
│   ├── SolutionSummary.tsx   # Ringkasan solusi
│   └── GraphSection.tsx      # Komponen grafik
├── lib/
│   ├── gauss.ts              # Implementasi Gauss
│   ├── gaussJordan.ts        # Implementasi Gauss-Jordan
│   ├── matrixUtils.ts        # Utility functions matriks
│   └── validateData.ts       # Validasi data input
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── Input.tsx             # Halaman input data
│   ├── Result.tsx            # Halaman hasil perhitungan
│   ├── Visual.tsx            # Halaman visualisasi
│   └── NotFound.tsx          # Halaman 404
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 🎯 Validasi Data

Aplikasi melakukan validasi otomatis:
- ✅ Minimal 3 baris data
- ✅ Semua field harus diisi
- ✅ Nilai harus berupa angka positif
- ✅ Tidak boleh ada data duplikat
- ✅ Notifikasi toast untuk setiap error

## 🔧 Build untuk Production

```bash
# Build aplikasi
pnpm run build

# Preview build
pnpm run preview
```

File hasil build akan tersimpan di folder `dist/`

## 🐛 Troubleshooting

### Error: "Sistem tidak memiliki solusi unik"
- Pastikan data input tidak linear dependent
- Coba gunakan data yang berbeda-beda

### Grafik tidak muncul
- Pastikan sudah ada minimal 3 baris data
- Refresh halaman dan coba lagi

### Animasi tersendat
- Tutup tab browser yang tidak digunakan
- Pastikan hardware acceleration aktif di browser

## 📝 Lisensi

Proyek ini dibuat untuk tujuan edukatif.

## 👨‍💻 Pengembang

Dikembangkan dengan ❤️ menggunakan MGX Platform

## 🙏 Acknowledgments

- shadcn/ui untuk komponen UI yang indah
- Recharts untuk library grafik
- Framer Motion untuk animasi yang smooth
- TailwindCSS untuk styling yang powerful

---

**Selamat menggunakan Kalkulator SPL! 🎉**

Jika ada pertanyaan atau masukan, jangan ragu untuk menghubungi kami.