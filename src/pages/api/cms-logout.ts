import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('cms_session', { path: '/' });
  return redirect('/cms-login');
};

export const prerender = false;
