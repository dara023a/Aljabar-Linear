# SPL Calculator - Analisis Biaya Grab
## Todo List untuk Pengembangan Proyek

### 1. Setup & Dependencies
- [x] Template shadcn-ui sudah tersedia
- [ ] Install framer-motion untuk animasi
- [ ] Install recharts untuk visualisasi grafik
- [ ] Update tailwind.config.ts dengan warna pastel hijau

### 2. Struktur File & Komponen

#### Core Logic (src/lib/)
- [ ] gauss.ts - Implementasi eliminasi Gauss
- [ ] gaussJordan.ts - Implementasi eliminasi Gauss-Jordan
- [ ] validateData.ts - Validasi input data
- [ ] matrixUtils.ts - Utility functions untuk matriks

#### Components (src/components/)
- [ ] DataInputTable.tsx - Tabel input data dengan add/remove rows
- [ ] MatrixDisplay.tsx - Tampilan matriks dengan animasi
- [ ] SolutionSummary.tsx - Ringkasan hasil perhitungan
- [ ] GraphSection.tsx - Komponen grafik Recharts
- [ ] Hero.tsx - Hero section untuk landing page

#### Pages (src/pages/)
- [ ] Index.tsx - Landing page dengan hero dan animasi floating
- [ ] Input.tsx - Halaman input data manual
- [ ] Result.tsx - Halaman hasil perhitungan SPL
- [ ] Visual.tsx - Halaman visualisasi grafik

### 3. Fitur Utama

#### Landing Page
- [ ] Hero section dengan animasi floating
- [ ] Tombol "Mulai Simulasi" dengan hover effect
- [ ] Background pattern dengan warna pastel hijau
- [ ] Animasi fade-in saat load

#### Input Data Page
- [ ] Tabel dinamis dengan kolom: Jarak (km), Waktu (menit), Biaya (Rp)
- [ ] Tombol "Tambah Baris" untuk menambah data
- [ ] Tombol "Hapus" per baris
- [ ] Tombol "Muat Contoh Data" (opsional, bisa dihapus)
- [ ] Validasi: minimal 3 baris, semua field harus angka
- [ ] Toast notification untuk error
- [ ] Tombol "Hitung SPL" untuk proses

#### Result Page
- [ ] Tampilan matriks augmented awal
- [ ] Tampilan matriks hasil Gauss
- [ ] Tampilan matriks hasil Gauss-Jordan
- [ ] Solusi: Tarif Dasar, Tarif per Km, Tarif per Menit
- [ ] Animasi transisi antar matriks
- [ ] Tombol navigasi ke halaman visualisasi

#### Visualization Page
- [ ] Grafik Jarak vs Biaya (line chart)
- [ ] Grafik Waktu vs Biaya (line chart)
- [ ] Legend dan tooltip interaktif
- [ ] Tombol kembali ke input

### 4. Styling & Animasi
- [ ] Implementasi palet warna: #A7E7BA, #C9F2DD, #F5FFF9, #7BC89A, #3E6C54
- [ ] Animasi floating untuk hero icon
- [ ] Fade-in animations untuk semua halaman
- [ ] Micro-interactions pada button hover
- [ ] Smooth transitions antar halaman
- [ ] Responsive design untuk mobile

### 5. Documentation
- [ ] README.md lengkap dalam Bahasa Indonesia
- [ ] Penjelasan cara menjalankan proyek
- [ ] Penjelasan fitur dan cara penggunaan
- [ ] Screenshot/demo (opsional)

### Web Design Style
- **Layout Style**: Clean, modern, card-based layout dengan spacing yang luas
- **Visual Elements**: Soft shadows, rounded corners, floating animations, gradient backgrounds
- **Color Scheme**: 
  - Primary: #A7E7BA (pastel green)
  - Secondary: #C9F2DD (mint muda)
  - Background: #F5FFF9 (putih kehijauan)
  - Accent: #7BC89A (secondary green)
  - Dark: #3E6C54 (dark accent)
- **Typography**: Clean sans-serif fonts, hierarchical headings, readable body text

### Catatan Penting
- User HARUS bisa input manual tanpa dummy data
- Minimal 3 baris data untuk perhitungan valid
- Semua animasi harus smooth dan tidak mengganggu UX
- Validasi real-time pada input
- Error handling yang jelas dengan toast notifications