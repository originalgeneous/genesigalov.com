import { defineMiddleware } from 'astro:middleware';

const logoutButtonScript = `
<script>
(function() {
  function addLogoutButton() {
    if (document.getElementById('cms-logout-btn')) return;

    const nav = document.querySelector('nav');
    if (!nav) {
      setTimeout(addLogoutButton, 100);
      return;
    }

    const btn = document.createElement('a');
    btn.id = 'cms-logout-btn';
    btn.href = '/api/cms-logout';
    btn.textContent = 'Log Out';
    btn.style.cssText = 'position:fixed;top:12px;right:16px;padding:8px 16px;background:#ef4444;color:white;border-radius:6px;font-size:14px;font-weight:500;text-decoration:none;z-index:9999;';
    btn.onmouseover = function() { this.style.background='#dc2626'; };
    btn.onmouseout = function() { this.style.background='#ef4444'; };
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLogoutButton);
  } else {
    addLogoutButton();
  }
})();
</script>
`;

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protect /keystatic and /api/keystatic routes
  if (pathname.startsWith('/keystatic') || pathname.startsWith('/api/keystatic')) {
    const sessionCookie = context.cookies.get('cms_session');

    if (sessionCookie?.value !== 'authenticated') {
      return context.redirect('/cms-login');
    }
  }

  const response = await next();

  // Inject logout button script into keystatic pages
  if (pathname.startsWith('/keystatic') && !pathname.startsWith('/keystatic/api')) {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
      const html = await response.text();
      const modifiedHtml = html + logoutButtonScript;
      return new Response(modifiedHtml, {
        status: response.status,
        headers: response.headers,
      });
    }
  }

  return response;
});
