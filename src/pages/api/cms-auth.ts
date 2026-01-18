import type { APIRoute } from 'astro';

// Credentials - in production, use environment variables
const VALID_USERNAME = 'gene';
const VALID_PASSWORD = process.env.CMS_PASSWORD || 'EJkjyj1jbatTjVgXpamg';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Set session cookie
    cookies.set('cms_session', 'authenticated', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return redirect('/keystatic');
  }

  return redirect('/cms-login?error=1');
};

export const prerender = false;
