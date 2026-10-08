# Delivery Plan dan Production Gates

## Tahapan

| Tahap | Hasil yang dapat ditinjau | Syarat lanjut |
|---|---|---|
| 1. Foundation | PRD, architecture, AGENTS, design system, inventory | Paket ini tersedia; preferensi terbuka dicatat |
| 2. Content + visual prototype | Home desktop/mobile dan satu studi kasus lengkap | Prioritas, bahan karya, dan arah copy jelas |
| 3. Implementation | Routes, assets, localization lima bahasa, metadata, CV | Konten utama dan tujuan kontak tersedia |
| 4. QA | Laporan browser, keyboard, links, performance, build | Gate wajib lulus atau masalah diperbaiki |
| 5. Release | URL publik, smoke test, rollback record | Target repo/domain dan konten publik dikonfirmasi |

Tidak menetapkan estimasi waktu sebelum bahan dan scope final. Prototype dapat memakai konten draft berlabel di lingkungan review; produksi hanya memakai konten yang layak publik.

## Release checklist

- [ ] CV/jabatan/tanggal/availability diperiksa pemilik; tidak ada placeholder atau klaim tanpa bukti.
- [ ] Tiga karya terkurasi punya peran, hasil/bukti, dan batasan jelas, atau scope jumlah karya direvisi secara sadar.
- [ ] Foto, screenshot, materi teaching, dan logo aman untuk publikasi.
- [ ] Kontak, demo/repo, CV, menu, language switch lima bahasa, 404, dan semua internal links berfungsi.
- [ ] Responsive pada ukuran dalam PRD, zoom 200%, keyboard, focus, reduced motion, dan screen-reader smoke test.
- [ ] Build/typecheck/content checks lulus; tidak ada error browser yang mengganggu.
- [ ] Lighthouse sesuai target pada lingkungan tercatat; gambar tidak menyebabkan layout shift.
- [ ] Kesetaraan konten lima bahasa, lang/hreflang, layout CJK/Jerman, dan kualitas terjemahan ditinjau.
- [ ] Base path, canonical, sitemap, robots, OG image, dan title/description sesuai URL sebenarnya.
- [ ] HTTPS, asset load, deep link studi kasus, dan mobile navigation diuji setelah deployment.
- [ ] Tidak ada secret, informasi siswa, atau detail klien yang belum diizinkan.
- [ ] Commit/artifact rilis dan langkah rollback dicatat.

## Release record template

Tanggal (Asia/Jakarta), target repository, commit, build command, deployment URL, base path, hasil uji lokal, hasil smoke test live, masalah tersisa, dan rollback target.

Rollback: redeploy artifact/commit rilis sebelumnya melalui hosting yang dipilih; lakukan smoke test ulang. Untuk migrasi website lama, pertahankan salinan rilis sebelumnya dan periksa anchor lama seperti `#about` agar pengunjung lama tetap mendapat tujuan yang masuk akal.

## Batasan saat ini

Paket ini sudah berisi implementasi prototipe dan pengujian browser awal; belum ada deployment. Produksi belum selesai. Bahan dan target publikasi yang belum diketahui dicatat dalam inventory; jangan menganggap dokumen selesai berarti seluruh proyek selesai.
