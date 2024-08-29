import { Metadata } from 'next';

enum MENU_ICONS {
  Inbox = 'inbox',
  Posts = 'posts',
}

export const site = {
  title: 'Next.js Boilerplate',
  description:
    'A boilerplate for fullstack aplications with Next.js, Lucia Auth, and Drizzle, with a postgreSQL database, powered by Neon',
  lang: 'en',
  menus: {
    links: [
      {
        href: '/app',
        label: 'Home',
        icon: MENU_ICONS.Inbox,
        admin: false,
      },
    ],
  },
  afterLoginRedirect: '/app',
} as const;
export type SiteConfig = typeof site;

export const customMetadata: Metadata = {
  title: site.title,
  description: site.description,
};
