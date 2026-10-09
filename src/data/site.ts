import translations from './translations.json';
export const locales = ['en','id','ja','de','zh'] as const;
export type Locale = typeof locales[number];
export const labels = {en:'EN',id:'ID',ja:'日本語',de:'DE',zh:'中文'};
export const htmlLang = {en:'en',id:'id',ja:'ja',de:'de',zh:'zh-Hans'};
export const t = (locale: Locale) => translations[locale];
export function href(locale: Locale, path='') { return `${import.meta.env.BASE_URL}${locale==='en'?'':locale+'/'}${path}`; }
export const projects = [
 {slug:'sakuara',title:'Sakuara',category:'software',copy:'sakuara',stack:['React','TypeScript','Supabase','PostgreSQL','Vercel'],repoUrl:null,image:'media/sakuara-collage-v2.jpg',url:'https://sakuara.vercel.app/',index:'01',sample:false},
 {slug:'credit-risk-analytics',title:'Credit Risk Analytics',category:'analytics',copy:'risk',stack:['Python','pandas','Next.js','Statistics','Data Ethics'],repoUrl:'https://github.com/Desta-data-analytics/credit-risk-analytics',image:'media/risk-collage-v2.jpg',url:'https://desta-data-analytics.github.io/credit-risk-analytics/',index:'02',sample:false},
 {slug:'stockwise',title:'Stockwise',category:'analytics',copy:'stockwise',stack:['JavaScript','Node.js','Python','Time-series validation','GitHub Pages'],image:'media/stockwise-collage-v2.jpg',url:'https://desta-data-analytics.github.io/stockwise/',repoUrl:'https://github.com/Desta-data-analytics/stockwise',index:'03',sample:false}
] as const;
