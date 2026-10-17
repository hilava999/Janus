// @ts-ignore
import { defineCollection} from 'astro:content';
import { glob,file } from 'astro/loaders';
import {z} from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/work' }),
  // Type-check frontmatter using a schema
  schema:z.object({
        title: z.string(),
        pubDate: z.string().or(z.date()),
        nsfw: z.boolean().default(false),
        imgs: z.array(z.string()),
        tags: z.array(z.string()).optional(),
        fandom: z.string().optional(),
    }),
});


const settings = defineCollection({
    loader: file("./src/content/settings/index.json", {
        parser: (text) => [{ id: "index", ...JSON.parse(text) }]
    }),
    schema: z.object({
        siteTitle: z.string(),
        subTitle: z.string().optional(),
        desc: z.string().optional(),
        about: z.string().optional(),
        favicon: z.string().optional(),
        lastUpdate: z.string().optional(),
        ogImage: z.string().optional(),
        top_slides: z.array(z.string()).optional(),
        prof: z.object({
            author: z.string(),
            bio: z.string().optional(),
            icon: z.string().optional(),
        }),
        sns: z.array(z.object({
            platform: z.enum(["x", "bluesky", "pixiv", "github", "youtube", "website"]),
            url: z.string(),
        })).optional(),
        theme: z.object({
            accent_color: z.string(),
            font: z.enum(["sans", "serif"]),
        }),
     }),
});


export const collections = { work,settings };
