> Keputusan aktif (8 Oktober 2026): hanya Full Stack Developer dan Data Analyst. Bagian tutoring/mentoring dan CC Academy dihapus. Lima bahasa dan GitHub Pages tetap dipertahankan. Bagian dokumen yang membahas tutoring adalah riwayat rancangan awal, tidak termasuk scope aktif.

# Architecture

## Keputusan awal

Gunakan Astro + TypeScript dengan output statis. Portfolio terutama berupa konten; HTML statis mengurangi JavaScript dan beban operasional. CSS native dengan design tokens cukup untuk v1. Tambahkan komponen interaktif hanya ketika dibutuhkan. Versi dependencies dikunci saat implementasi, setelah memeriksa dokumentasi resmi terkini.

Hosting yang dikonfirmasi: GitHub Pages, seluruh website berupa static export. Konfirmasi apakah rilis menggantikan `/portfolio/` atau memakai repository/domain baru. Jangan mengubah repository lama sebelum target rilis jelas. Preview dapat diterbitkan ke repository/path GitHub Pages terpisah jika diperlukan; tidak memerlukan backend untuk v1.

## Aliran sistem

Markdown content + typed profile data + assets → content validation → Astro build → static HTML/CSS + minimal JS → hosting CDN → browser.

Contact menggunakan email/LinkedIn publik. Formulir hanya ditambahkan jika ada endpoint nyata, anti-spam, privacy notice, error states, dan uji pengiriman. Jangan menampilkan pesan sukses dari simulasi.

## Struktur yang dituju

```text
src/
  components/   Header, Footer, ProjectRow, ContactLinks
  layouts/      BaseLayout, CaseStudyLayout
  pages/        index, about, teaching, work, 404, id/*
  content/work/ studi kasus Markdown
  data/         profile, navigation, translations
  styles/       tokens.css, global.css
  assets/       foto dan screenshot untuk optimasi build
public/         favicon, robots.txt, cv final jika tersedia
docs/           dokumen produk dan rilis
```

## Data contract

Profile: name, headline, bio, publicEmail, socialLinks, education, experience, optional cvPath. Jangan menaruh data privat atau secret dalam frontend.

Project: slug, title, category, summary, role, status (`demo`, `live`, `archived`), stack, problem, decisions, implementation, evidence, limitations, cover + alt, optional demoUrl/repoUrl, featuredOrder. Evidence menyimpan jenis bukti dan sumber; hasil numerik wajib punya sumber. Konten belum lengkap tidak dipublikasikan sebagai featured.

Experience: organization, role, start, optional end, location, description, source, verificationStatus. Field verification hanya untuk proses editorial; draft yang belum disetujui tidak ikut build produksi.

## Routing dan localization

English pada root, Indonesia `/id/`, Jepang `/ja/`, Jerman `/de/`, Mandarin `/zh/`. Kelima bahasa dikonfirmasi pemilik. Gunakan locale codes en, id, ja, de, zh-Hans (URL zh). Terjemahkan navigation, CTA, metadata, alt text, error states, dan konten studi kasus; proper nouns tetap. Font harus mendukung aksara Jepang/Mandarin dengan fallback system CJK agar bundle tidak besar. Uji line wrapping dan panjang teks Jerman. Translation key eksplisit; language switch mengarah ke halaman yang setara. Jika terjemahan belum ada, jangan menautkan ke halaman yang menyesatkan. `lang`, canonical, hreflang, dan metadata dibuat per halaman. Untuk Pages project site, base path `/portfolio/` harus diterapkan ke navigation, assets, sitemap, dan CV. Uji deploy preview dengan base yang sama.

## SEO, media, performance

Judul dan description spesifik per halaman; Person structured data hanya memuat fakta; canonical berasal dari URL rilis yang dikonfirmasi. OG image dibuat dari identitas visual, bukan screenshot dashboard berisi informasi pribadi. Foto/screenshot disimpan dengan ukuran intrinsik, format modern, responsive sizes, serta alt bermakna. Hero image tidak lazy-load; media di bawah fold lazy-load. Font lokal berlisensi atau system fonts. Konten tidak disembunyikan sampai animasi berjalan.

## Security dan operasional

Tidak ada database/auth untuk v1. Tautan eksternal diperiksa, file CV ditinjau untuk informasi pribadi, screenshot menggunakan data aman, tidak ada kunci API di bundle. Bila hosting mendukung response headers, tambahkan kebijakan keamanan yang sesuai setelah audit kebutuhan font/script; jangan menganggap semua header bisa disetel lewat GitHub Pages.

CI: install dari lockfile → content/schema checks → typecheck → build → smoke/browser tests → deployment. Untuk rilis Pages, gunakan workflow resmi dan permissions minimal; branch/URL dipastikan sebelum publikasi. Simpan commit rilis dan prosedur rollback ke artifact/commit sebelumnya. Analytics bersifat opsional dan menjadi keputusan tersendiri.

## Tradeoffs

Static export cocok untuk konten dan kontak sederhana; konten berubah lewat repository. Next.js lebih masuk akal jika nanti ada aplikasi dinamis/auth, tetapi belum ada kebutuhan itu. CMS baru dipertimbangkan jika pemilik perlu mengedit tanpa Git secara rutin. Jangan membangun backend untuk kebutuhan yang belum ada.

## Active revision: dedicated pages
About, Experience, Projects (/work/), Education, Contact are separate locale-preserving pages. Root is a profile landing view. Projects use a native scroll-snap carousel with buttons, touch scrolling, keyboard support and no auto advance. About contains portrait/CV and a large conceptual animation, not experience/project lists. Education is explicitly sample until CV confirmation. Violet/cyan gradients add depth while preserving theme support and reduced motion.
