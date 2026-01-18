import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protect /keystatic and /api/keystatic routes
  if (pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic')) {
    const sessionCookie = context.cookies.get('cms_session');

    if (sessionCookie?.value !== 'authenticated') {
      return context.redirect('/cms-login');
    }
  }

  return next();
});
