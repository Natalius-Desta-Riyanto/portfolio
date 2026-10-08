import { defineConfig } from 'astro/config';
const site = process.env.SITE_URL;
export default defineConfig({ output:'static', base:process.env.BASE_PATH || '/', ...(site ? {site} : {}), trailingSlash:'always', devToolbar:{enabled:false} });
