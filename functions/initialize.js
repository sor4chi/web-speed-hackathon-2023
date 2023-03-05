export const onRequestPost = async () => {
  const url = new URL('https://sor4chi-web-speed-hackathon-2023.fly.dev/initialize');
  const response = await fetch(url, {
    method: 'POST',
  });
  return new Response(response.body, {
    status: response.status,
  });
};

export const onRequestGet = async () => {
  return new Response('Hello world!', {
    status: 200,
  });
};
