> Keputusan aktif (8 Oktober 2026): hanya Full Stack Developer dan Data Analyst. Bagian tutoring/mentoring dan CC Academy dihapus. Lima bahasa dan GitHub Pages tetap dipertahankan. Bagian dokumen yang membahas tutoring adalah riwayat rancangan awal, tidak termasuk scope aktif.

# Product Requirements Document

## Masalah dan tujuan

Natalius memiliki tiga area kerja: full stack development, mathematics tutoring, dan eksplorasi data analytics. Website perlu menjelaskan hubungan ketiganya tanpa terasa seperti tiga profil yang ditempel menjadi satu. Benang merahnya adalah kemampuan mengurai masalah, menyusun logika, dan menghasilkan sesuatu yang berguna.

Tujuan utama: membantu recruiter dan calon klien memahami kemampuan, menemukan bukti kerja, dan menghubungi Natalius. Tujuan kedua: membantu calon murid memahami cara mengajar serta menghubungi tutor. Pengunjung analytics harus dapat membedakan analisis, demonstrasi, dan hasil yang sudah divalidasi.

## Audiens dan alur

| Audiens | Pertanyaan utama | Alur |
|---|---|---|
| Recruiter engineering | Apa yang dia bangun dan tanggung jawabnya? | Hero → selected work → case study → experience → CV/contact |
| Calon klien | Apakah dia bisa membantu masalah saya? | Work → proses kerja → bukti implementasi → contact |
| Calon murid/orang tua | Apa yang dia ajarkan dan bagaimana caranya? | Teaching → pendekatan → pengalaman → contact |
| Tim analytics | Bagaimana kualitas analisisnya? | Analytics case study → metode → batasan → repository |

## Positioning dan gaya bahasa

Nama personal adalah identitas utama. Urutan prioritas yang dikonfirmasi: Full Stack Developer, Data Analytics Enthusiast, Mathematics Tutor. Mathematics Tutor dan Data Analytics Enthusiast tetap disebut jelas. Jangan menaikkan enthusiast menjadi data scientist profesional tanpa bukti.

Draft hero: “I build useful software. And make complex ideas easier to understand.” Supporting copy: “I’m Natalius, a full stack developer and mathematics tutor with a growing interest in data analytics.” Sesuaikan dengan suara pemilik sebelum publikasi. Hindari jargon seperti visionary, cutting-edge, seamless, atau klaim dampak tanpa bukti.

## Information architecture

- Home: hero; 3 selected projects; cara berpikir/kerja; teaching teaser; experience singkat; contact.
- `/work/`: daftar karya dan filter Software / Analytics / Education, hanya jika jumlah proyek membuat filter berguna.
- `/work/[slug]/`: studi kasus dengan masalah, peran, keputusan, implementasi, hasil yang terbukti, batasan, dan tautan.
- `/teaching/`: topik dan jenjang, cara mengajar, contoh materi yang aman dipublikasikan, CTA kontak.
- `/about/`: cerita personal, pengalaman, pendidikan, dan CV.
- `/id/…`, `/ja/…`, `/de/…`, `/zh/…`: Indonesia, Jepang, Jerman, Mandarin; English pada root. Struktur halaman setara di semua bahasa.

Contact tersedia di footer seluruh halaman. Tidak perlu halaman kosong untuk kategori yang belum memiliki konten.

## Lingkup rilis pertama

Wajib: responsive navigation; 3 studi kasus terkurasi bila bahan tersedia; pengalaman; tutoring; kontak nyata; metadata SEO; sitemap; 404; CV jika file final tersedia; keyboard navigation; reduced motion. English, Indonesia, Jepang, Jerman, dan Mandarin termasuk scope rilis; language switch mempertahankan konteks halaman. Semua konten inti dapat dibaca tanpa JavaScript.

Opsional setelah kebutuhan terbukti: dark mode, blog, analytics agregat, formulir kontak. Di luar rilis pertama: chatbot, dashboard admin, akun pengguna, booking/payment, CMS, animasi 3D.

## Acceptance criteria

1. Dalam satu layar desktop, pengunjung dapat menemukan nama, peran, selected work, dan kontak.
2. Setiap karya menjelaskan kontribusi Natalius dan menyertakan minimal satu bukti yang dapat ditinjau. Status demo/live diberi label tepat.
3. Tidak ada klaim hasil, tanggal pekerjaan, testimonial, atau logo klien tanpa sumber yang layak.
4. CTA menuju tujuan nyata. CV yang belum tersedia tidak menghasilkan tombol mati.
5. Halaman berfungsi pada lebar 360, 390, 768, 1280, dan 1440 px, tanpa overflow horizontal.
6. Semua interaksi dapat digunakan dengan keyboard; fokus terlihat; WCAG 2.2 AA menjadi target; tidak mengandalkan warna saja.
7. Target lab mobile: Lighthouse performance ≥90, accessibility ≥95, SEO ≥95 pada halaman utama dan satu studi kasus. Catat lingkungan uji; skor lab bukan bukti Core Web Vitals pengguna nyata.
8. Target produksi setelah cukup traffic: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 pada persentil ke-75. Belum dapat dibuktikan saat rilis awal.

## Ukuran keberhasilan

Awalnya ukur secara manual: kontak yang relevan, karya yang disebut oleh recruiter/klien, dan kemudahan menemukan informasi. Jika analytics dipasang, ukur kunjungan studi kasus dan klik kontak secara agregat; jangan merekam isi pesan. Tidak menjanjikan target konversi tanpa baseline.

## Active revision: dedicated pages
About, Experience, Projects (/work/), Education, Contact are separate locale-preserving pages. Root is a profile landing view. Projects use a native scroll-snap carousel with buttons, touch scrolling, keyboard support and no auto advance. About contains portrait/CV and a large conceptual animation, not experience/project lists. Education is explicitly sample until CV confirmation. Violet/cyan gradients add depth while preserving theme support and reduced motion.

## Active direction: scrolling portfolio
All primary routes render the full About → Experience → Projects → Education → Contact flow. Navigation is same-page anchor navigation with smooth scrolling and reduced-motion support. Case studies remain separate. Public email and Depok, West Java, Indonesia are sourced from the previous portfolio HTML. No phone number or availability is invented. A local silent blue/cyan background video spans the viewport; pause control and reduced-motion fallback are retained. Violet is removed.
