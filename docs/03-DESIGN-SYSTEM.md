> Keputusan aktif (8 Oktober 2026): hanya Full Stack Developer dan Data Analyst. Bagian tutoring/mentoring dan CC Academy dihapus. Lima bahasa dan GitHub Pages tetap dipertahankan. Bagian dokumen yang membahas tutoring adalah riwayat rancangan awal, tidak termasuk scope aktif.

# Design System — Editorial / Practical / Personal

## Konsep

Portfolio seperti catatan kerja seorang developer yang juga mengajar: jelas, tenang, dan punya detail personal. Karakter berasal dari susunan tipografi, karya asli, penjelasan keputusan, dan foto nyata. Hindari gradient headline, floating tech badges, particle canvas, progress bar keahlian, serta card grid yang berulang di seluruh halaman.

## Tokens

| Token | Nilai | Fungsi |
|---|---|---|
| canvas | `#F7F6F2` | Latar hangat |
| surface | `#FFFFFF` | Bidang screenshot/preview |
| ink | `#202820` | Teks utama |
| muted | `#586158` | Teks pendukung |
| accent | `#2F5738` | CTA utama dan tautan |
| accent-soft | `#E5EBDD` | Panel teaching |
| line | `#D5D9CF` | Pemisah dekoratif |
| focus | `#855600` | Fokus 3px + offset 3px |

Ukur kontras pada pasangan final sebelum rilis; border dekoratif tidak dipakai sebagai satu-satunya petunjuk kontrol. Dark mode tidak wajib v1.

Body: system sans atau font sans lokal berlisensi; editorial accent memakai Georgia untuk satu frasa hero/headline. Mono hanya untuk indeks, tahun, dan kategori. Body 16–18px, line-height 1.6; label minimal 12px, bukan 8–9px. H1 `clamp(2.75rem, 6vw, 5.75rem)`, line-height 1.05; H2 `clamp(2rem, 4vw, 3.5rem)`; panjang teks 60–70 karakter.

Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Container maksimal 1200px; padding desktop 48px, tablet 32px, mobile 20px. Section gap desktop 112px, mobile 64px. Radius 4px untuk tombol, 12px untuk preview; tidak semua objek dijadikan pill. Shadows sangat ringan dan hanya jika membantu hierarki.

## Komposisi home

```text
NDR / Natalius                    Work  Teaching  About  Contact
─────────────────────────────────────────────────────────────
FULL STACK · MATHEMATICS · DATA
I build useful software.               [foto nyata atau
And make complex ideas                  cuplikan karya]
easier to understand.
Intro pendek.  [Explore work ↗] [Contact]
─────────────────────────────────────────────────────────────
Selected work                       01 / 02 / 03
[preview lebar]     Nama · masalah · kontribusi · case study
[preview lebar]     Nama · masalah · kontribusi · case study
─────────────────────────────────────────────────────────────
Teaching: pendekatan personal + contoh materi nyata
About / experience ringkas
Contact + email/LinkedIn/GitHub
```

Asimetri desktop 7:5 pada hero, project rows 6:6; mobile menjadi satu kolom dengan urutan informasi tetap. Selected work memiliki preview yang cukup besar untuk dibaca, bukan tiga thumbnail mungil. Foto tidak wajib untuk memulai; jangan menggantinya dengan potret sintetis. Gunakan artefak proyek sebagai visual sementara jika ada izin.

## Components dan states

Header: brand + 4 tujuan navigasi + pemilih bahasa EN / ID / 日本語 / DE / 中文. Pada mobile gunakan select berlabel atau menu yang bisa dioperasikan keyboard. Hindari bendera sebagai penanda bahasa. Uji fallback CJK dan teks Jerman yang lebih panjang. Mobile menu button berlabel, `aria-expanded`, Escape menutup, fokus kembali ke pemicu. Jika berupa dialog, focus trap dan background inert; jika disclosure biasa, gunakan urutan fokus alami.

Buttons/links: primary fill accent, secondary text + underline; tinggi target ≥44px. Hover memperjelas affordance; focus terlihat; disabled hanya ketika ada alasan nyata. Jangan menggunakan tombol untuk navigasi.

Project row: category/status, title, summary konkret, role, 3–5 teknologi relevan, case-study link. Live demo/repo link opsional; status “live” bukan jaminan sistem produksi. Hindari seluruh card nested di dalam link jika ada link lain.

Case study: problem → context/role → decisions → implementation → evidence/result → limitations → next project. Gambar punya caption dan alt. Tidak memaksakan angka hasil bila tidak tersedia.

Teaching: copy hangat dan contoh penjelasan, bukan janji peningkatan nilai. CC Academy muncul sebagai alat pendukung buatan sendiri.

## Motion dan aksesibilitas

Transitions 160–220ms pada warna/opacity dan transform kecil; tidak ada scroll hijacking atau animasi tanpa henti. `prefers-reduced-motion` mematikan animasi non-esensial. Skip link, landmark, satu H1, heading terurut, zoom 200%, keyboard, dan kontras menjadi bagian QA. Semua teks tetap terlihat bila JavaScript gagal.

## Editorial rules

Kalimat pendek, orang pertama, spesifik. “Built a dashboard to explore credit-risk segments” lebih berguna daripada “Transforming finance through innovative solutions.” Hindari mengulang tiga peran pada setiap section. Tampilkan detail yang dapat dibuktikan dan alasan keputusan; ini yang membuat website terasa personal.


## Revision — 8 Oktober 2026: referensi Haikal

Atas permintaan pemilik, arah visual prototipe bergeser ke portfolio berbasis profil, dengan referensi https://haikalfr04.github.io/portfolio/. Ciri yang diadaptasi: nama/peran lebih dominan pada hero, visual identitas melingkar, latar putih dengan aksen biru, panel fokus yang ringkas, dan kartu proyek yang lebih terstruktur. Warna aktif: canvas #FFFFFF, ink #17233B, muted #596477, accent #2756B3, soft #EDF3FF, line #E2E8F1. Tokens ini menggantikan palet hijau awal pada implementasi.

Konten, foto, logo, angka, pengalaman, dan proyek milik Haikal tidak digunakan. Visual NDR adalah monogram sementara hingga foto Natalius tersedia. Pengalaman, pendidikan terperinci, skills final, dan CV tetap menunggu bahan pemilik. Kelima bahasa, prioritas karier, dan hosting GitHub tetap berlaku.


## Revision: Systems / Motion

Desain putih-biru berbasis profil digantikan layout modern dengan visual sistem interaktif. Palet aktif: canvas #111513, surface #191F1B, ink #EDF0E9, muted #A3ADA3, accent #C0E78C; tema terang memakai #F4F5EF, #20291F, #466B2C. Hero menonjolkan product engineering dan data analysis; diagram node merupakan ilustrasi konseptual, bukan arsitektur proyek tertentu. Interaksi: build/data switch, node inspection, project filters, theme toggle, hover feedback, progress baca dan reveal saat section masuk viewport. Animasi sinyal berhenti di luar viewport atau tab tidak aktif; reduced motion mematikan gerakan. Foto tidak diperlukan untuk layout ini.


## Active revision: clean blue and softer shapes

Light default: canvas #F8F9FC, ink #202B3D, muted #5B697D, accent #3764AA, surface #FFFFFF, line #DBE3EF. Dark alternate: canvas #111722, ink #F0F4FB, accent #9DBFFF. These values replace the earlier green tokens. Panels use 20–48px radii, hero video has asymmetric rounded corners, and buttons/chips use pill shapes. Navigation order is About → Experience → Projects → Contact. Video is a locally authored 6-second silent conceptual animation, not a project demo; it can be paused and is not autoplayed when reduced motion is enabled.

## Active revision: dedicated pages
About, Experience, Projects (/work/), Education, Contact are separate locale-preserving pages. Root is a profile landing view. Projects use a native scroll-snap carousel with buttons, touch scrolling, keyboard support and no auto advance. About contains portrait/CV and a large conceptual animation, not experience/project lists. Education is explicitly sample until CV confirmation. Violet/cyan gradients add depth while preserving theme support and reduced motion.

## Active direction: scrolling portfolio
All primary routes render the full About → Experience → Projects → Education → Contact flow. Navigation is same-page anchor navigation with smooth scrolling and reduced-motion support. Case studies remain separate. Public email and Depok, West Java, Indonesia are sourced from the previous portfolio HTML. No phone number or availability is invented. A local silent blue/cyan background video spans the viewport; pause control and reduced-motion fallback are retained. Violet is removed.
