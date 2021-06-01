export default function parseRoute(hashRoute) {
  let path;
  if (hashRoute.startsWith('#')) {
    path = hashRoute.replace('#', '');
  }
  return { path };
}
