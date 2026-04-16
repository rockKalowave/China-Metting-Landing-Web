export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

export const getRelativePath = (pathname) => {
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || '/';
  }
  return pathname || '/';
};

export const toFullPath = (path) => `${BASE_PATH}${path}` || '/';
