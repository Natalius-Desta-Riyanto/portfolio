import translations from './translations.json';
export const locales = ['en','id','ja','de','zh'] as const;
export type Locale = typeof locales[number];
export const labels = {en:'EN',id:'ID',ja:'日本語',de:'DE',zh:'中文'};
export const htmlLang = {en:'en',id:'id',ja:'ja',de:'de',zh:'zh-Hans'};
export const t = (locale: Locale) => translations[locale];
export function href(locale: Locale, path='') { return `${import.meta.env.BASE_URL}${locale==='en'?'':locale+'/'}${path}`; }
export const projects = [
 {slug:'padun',title:'Padun',category:'software',copy:'padun',stack:['Next.js','TypeScript','PostgreSQL','Better Auth'],repoUrl:'https://github.com/Desta-Platform/padun',sourcePublic:false,image:'media/padun-workspace.webp',url:'https://padun-desta.vercel.app/',index:'01',featured:true,sample:false},
 {slug:'lendsight',title:'LendSight',category:'analytics',copy:'lendsight',stack:['Python','FastAPI','SQL','React'],repoUrl:'https://github.com/Desta-data-analytics/lendingscope',sourcePublic:false,image:'media/lendsight-overview.webp',url:'https://lendsight-plum.vercel.app/',index:'02',featured:true,sample:false},
 {slug:'credit-risk-analytics',title:'Credit Risk Analytics',category:'analytics',copy:'risk',stack:['Python','pandas','Next.js','Statistics'],repoUrl:'https://github.com/Desta-data-analytics/credit-risk-analytics',sourcePublic:true,image:'media/risk-collage-v2.jpg',url:'https://desta-data-analytics.github.io/credit-risk-analytics/',index:'03',featured:false,sample:false},
 {slug:'stockwise',title:'Stockwise',category:'analytics',copy:'stockwise',stack:['JavaScript','Node.js','Python','Forecasting'],image:'media/stockwise-collage-v2.jpg',url:'https://desta-data-analytics.github.io/stockwise/',repoUrl:'https://github.com/Desta-data-analytics/stockwise',sourcePublic:true,index:'04',featured:false,sample:false},
 {slug:'sakuara',title:'Sakuara',category:'software',copy:'sakuara',stack:['React','TypeScript','Supabase','PostgreSQL'],repoUrl:'https://github.com/Desta-Platform/Sakuara',sourcePublic:false,image:'media/sakuara-collage-v2.jpg',url:'https://natalius-desta-riyanto.github.io/portfolio/demo/sakuara/',index:'05',featured:false,sample:false}
] as const;

export function caseSections(locale:Locale, slug:string){
 const c=t(locale);
 const content=slug==='padun'?[c.padunOverview,c.padunFlow,c.padunFeatures,c.padunImplementation]
 :slug==='lendsight'?[c.lendsightOverview,c.lendsightFlow,c.lendsightFeatures,c.lendsightImplementation]
 :slug==='stockwise'?[c.stockwiseOverview,c.stockwiseFlow,c.stockwiseFeatures,c.stockwiseImplementation]
 :slug==='credit-risk-analytics'?[c.riskOverview,c.riskFlow,c.riskFeatures,c.riskImplementation]
 :[c.sakuaraOverview,c.sakuaraFlow,c.sakuaraFeatures,c.sakuaraImplementation];
 return [c.caseOverview,c.caseFlow,c.caseFeatures,c.caseImplementation].map((title,i)=>[title,content[i]]);
}
