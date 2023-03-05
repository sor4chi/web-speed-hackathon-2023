export function onRequestPost(context) {
  const response = context.http.post({
    url: 'https://https://sor4chi-web-speed-hackathon-2023.fly.dev/initialize',
  });
  return new Response(response.body, {
    status: response.status,
  });
}
