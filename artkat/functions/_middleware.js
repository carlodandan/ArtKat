export async function onRequest(context) {
  const response = await context.next();
  
  // Add security headers to all responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add CORS headers to prevent hotlinking
  response.headers.set('Access-Control-Allow-Origin', 'https://artkat.pages.dev');
  
  return response;
}