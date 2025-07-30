import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const pages = {"terms":{"outputDir":"./terms","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/terms/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/terms/"}]},"sign_in":{"outputDir":"./sign_in","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/sign_in/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/sign_in/"}]},"signup":{"outputDir":"./signup","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/signup/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/signup/"}]},"settings":{"outputDir":"./settings","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/settings/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/settings/"}]},"users":{"outputDir":"./users","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/users/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/users/"}]},"hom":{"outputDir":"./hom","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/hom/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/hom/"}]},"deals":{"outputDir":"./deals","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/deals/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/deals/"}]},"homes":{"outputDir":"./homes","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/homes/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/homes/"}]},"homess":{"outputDir":"./homess","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/homess/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/homess/"}]},"view":{"outputDir":"./view","lang":"ko","title":"밤오토","cacheVersion":19,"meta":[{"name":"title","content":"밤오토"},{"name":"description","content":"밤오토 현황판입니다"},{"name":"keywords","content":"밤오토"},{"itemprop":"name","content":"밤오토"},{"itemprop":"description","content":"밤오토 현황판입니다"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"밤오토"},{"name":"twitter:description","content":"밤오토 현황판입니다"},{"property":"og:title","content":"밤오토"},{"property":"og:description","content":"밤오토 현황판입니다"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/view/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/view/"}]},"edit":{"outputDir":"./edit","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/edit/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/edit/"}]},"index":{"outputDir":"./","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/"}]},"request":{"outputDir":"./request","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/request/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/request/"}]},"logview":{"outputDir":"./logview","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/logview/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/logview/"}]},"home_":{"outputDir":"./home_","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/home_/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/home_/"}]},"logs":{"outputDir":"./logs","lang":"ko","cacheVersion":19,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/logs/"},{"rel":"alternate","hreflang":"ko","href":"https://6a152889-4b23-4618-a7d9-9f82ec4c3d45.weweb-preview.io/logs/"}]}};

// Read the main HTML template
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
const compiledTemplate = handlebars.compile(template);

// Generate an HTML file for each page with its metadata
Object.values(pages).forEach(pageConfig => {
    // Compile the template with page metadata
    const html = compiledTemplate({
        title: pageConfig.title,
        lang: pageConfig.lang,
        meta: pageConfig.meta,
        scripts: {
            head: pageConfig.scripts.head,
            body: pageConfig.scripts.body,
        },
        alternateLinks: pageConfig.alternateLinks,
        cacheVersion: pageConfig.cacheVersion,
        baseTag: pageConfig.baseTag,
    });

    // Save output html for each page
    if (!fs.existsSync(pageConfig.outputDir)) {
        fs.mkdirSync(pageConfig.outputDir, { recursive: true });
    }
    fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
});

const rollupOptionsInput = {};
for (const pageName in pages) {
    rollupOptionsInput[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

export default defineConfig(() => {
    return {
        plugins: [nodePolyfills({ include: ['events', 'stream', 'string_decoder'] }), vue()],
        base: "/",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [autoprefixer],
            },
        },
        build: {
            chunkSizeWarningLimit: 10000,
            rollupOptions: {
                input: rollupOptionsInput,
                onwarn: (entry, next) => {
                    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
                    return next(entry);
                },
                maxParallelFileOps: 900,
            },
        },
        logLevel: 'warn',
    };
});
