# Audit Awal Portfolio Lama

Sumber: https://natalius-desta-riyanto.github.io/portfolio/#about, diambil sebagai HTML pada 8 Oktober 2026. Audit ini berdasarkan konten dan CSS/JavaScript yang dibaca; belum merupakan inspeksi screenshot atau pengujian browser.

## Fondasi yang layak dipertahankan

Nama personal jelas, kontak tersedia, pengalaman dan pendidikan tersusun, serta karya memiliki tautan nyata. Hubungan antara mathematics, software engineering, dan data sudah muncul. Terdapat dukungan mobile menu serta reduced motion di kode.

## Temuan yang memandu redesign

1. Banyak selector menggunakan label/link 8–9px dan copy 13px. Naikkan ukuran teks dan batasi density agar pengalaman mobile lebih nyaman; tampilan final perlu diuji pada browser.
2. Kode memuat gradient text, blur blobs, orbit, scanning effect, reveal animations, dan canvas particles. Kurangi jumlah bahasa visual agar karya menjadi perhatian utama. Tidak semua efek ini pasti tampil bersamaan; kesimpulan visual membutuhkan browser check.
3. Selected work hanya memperkenalkan Credit Risk Analytics dan Sakuara secara singkat. Tambahkan studi kasus untuk memperlihatkan peran, keputusan, dan bukti.
4. Teaching muncul di riwayat pengalaman, tetapi belum mendapat penjelasan pendekatan mengajar dan contoh materi.
5. Lima opsi bahasa memperbesar beban pemeliharaan. Pemilik telah memilih kelima bahasa untuk website baru. Pertahankan cakupan itu dengan content schema, layout CJK/Jerman, dan proses review terjemahan yang jelas.
6. “Available for meaningful work” dan tanggal pekerjaan adalah data yang dapat berubah. Konfirmasi sebelum reuse.

## Prinsip migrasi

Reuse fakta yang telah dikonfirmasi dan tautan yang masih relevan. Bangun struktur konten terpisah dari layout. Jangan menyalin monolith HTML/CSS/translation menjadi fondasi baru. Jaga akses ke portfolio lama sampai rilis pengganti terverifikasi.
