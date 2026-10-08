# Natalius Desta Riyanto — Portfolio Website

Paket fondasi produk, konten, desain, pengembangan, dan rilis. Disusun 8 Oktober 2026.

## Status

Dokumentasi dan prototipe website sudah tersedia. Website belum dipublikasikan. Konten proyek, CV, foto, dan kontak final masih menunggu bahan pemilik.

Urutan baca:
1. [PRD](docs/01-PRD.md)
2. [Architecture](docs/02-ARCHITECTURE.md)
3. [AI agents / pedoman pengembangan](AGENTS.md)
4. [Design system](docs/03-DESIGN-SYSTEM.md)
5. [Content inventory](docs/04-CONTENT-INVENTORY.md)
6. [Roadmap dan production checklist](docs/05-DELIVERY-PLAN.md)
7. [Audit portfolio lama](docs/06-PREVIOUS-SITE-AUDIT.md)

Keputusan pemilik: prioritas full stack developer → data analytics → math tutor. English menjadi default, dengan Bahasa Indonesia, Jepang, Jerman, dan Mandarin. Hosting menggunakan GitHub Pages. CV, foto, kontak publik, dan pilihan proyek akan menyusul. Arah desain editorial berpusat pada karya dan bukti.

Folder utama: `/Users/calculus/Documents/Me-Project/CV/Portfolio-Website/`. Lanjutkan pengembangan di folder ini.


## Menjalankan website

Gunakan Node >=22.19 (disarankan Node 24).

```sh
npm ci
npm run dev
npm run check
npm run build
npm test
npm run preview
```

Preview berjalan di `http://127.0.0.1:4321/`. Build menghasilkan 51 halaman: tujuh halaman per bahasa dan 404 global. Konten UI di `src/data/translations.json`, proyek di `src/data/site.ts`, layout di `src/components/Page.astro`, styling di `src/styles/global.css`.

## GitHub Pages

Workflow manual tersedia di `.github/workflows/pages.yml`; belum dijalankan atau terhubung ke repository. Set repository variables `SITE_URL` ke origin GitHub Pages dan `BASE_PATH` ke `/nama-repository/` (atau `/` untuk user site/custom domain), lalu pilih GitHub Actions sebagai source Pages. Build lokal dengan env yang sama dan jalankan `npm test` dengan `BASE_PATH` yang sama sebelum rilis. Draft masih memakai noindex; hapus hanya setelah konten final dan target URL diperiksa. Pedoman resmi: https://docs.astro.build/en/guides/deploy/github/.

## Batasan prototipe

Visual proyek adalah ilustrasi konsep, bukan screenshot asli. Studi kasus berupa ringkasan draft; belum memuat kontribusi/detail hasil final. Tidak ada CV download atau form simulasi. Kontak menggunakan GitHub/LinkedIn dari portfolio lama. Terjemahan lima bahasa masih memerlukan review editorial. Sitemap dan OG image final diselesaikan setelah URL publik ditentukan. Lighthouse dan screen-reader check belum dilakukan.


## Arah terbaru — 8 Oktober 2026

Atas koreksi pemilik, fokus website kini hanya Full Stack Developer dan Data Analyst. Seluruh bagian tutoring/mentoring, tautan Teaching, dan CC Academy telah dihapus dari implementasi. Referensi Haikal tetap merupakan bahan inspirasi, bukan pola desain akhir. Desain aktif memakai latar gelap, aksen hijau terang, visual sistem interaktif, filter karya, tema terang/gelap, sticky navigation, progress baca, dan animasi ringan dengan dukungan reduced motion. Semua konten inti tetap terbaca tanpa JavaScript. URL `/teaching/` dan proyek CC Academy tidak lagi dihasilkan build.


## Mock data

Pemilik meminta mock data untuk bahan yang belum dikirim. Relay Desk dan Atlas Retail adalah proyek fiktif. Example Studio dan Example Analytics Lab adalah contoh pengalaman; tanggal dan toolkit di bagian itu hanya contoh. Isi studi kasus semua proyek merupakan contoh pendekatan dan berlabel sample, bukan hasil/peran terverifikasi. Sakuara dan Credit Risk Analytics tetap berasal dari portfolio lama; detail studi kasusnya belum final. Tidak ada metrik hasil yang dibuat-buat, CV palsu, atau tautan demo palsu. Semua mock data harus diganti/dihapus sebelum publikasi final.


## Menu, palette, and motion video — latest revision

Menu: About → Experience (homepage section) → Projects → Contact. Homepage follows hero → profile → sample experience → projects → approach/system explorer → contact. Palette uses clean off-white/navy with blue accents and optional dark mode; rounded and asymmetric shapes soften panels. A custom six-second silent WebM animation is stored in public/media, with a WebP poster, translated pause/play control, visibility-based loading/playback, and reduced-motion support. Poster remains visible without JavaScript or video playback. No external video service is used.

### Profile photo and CV
Set `photo` and `cv` in `src/data/profile.ts` to paths relative to `public/`. The portrait appears on Home and About. CV is a real download link once configured; until then the button is disabled with a localized pending label. No fictional CV is provided.

### Dedicated pages and carousel
Navigation: About → Experience → Projects → Education → Contact, each on its own page. Projects show one project per horizontal slide with previous/next buttons, touch scrolling and arrow keys when the track is focused. About retains the portrait/CV placeholder and enlarged conceptual video. Education remains labeled sample pending the real CV.

### Current navigation
The full portfolio is now scrollable on each primary route. Header links jump smoothly to About, Experience, Projects, Education and Contact. Blue/cyan background video remains visible across sections, with a global pause control. Email and Depok location use the public details from the previous portfolio.
