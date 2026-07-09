const COOKIE_NAME = 'devdungeon_auth';

export function setAuthCookie() {
  document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${60 * 60 * 24 * 7}`;
}

export function clearAuthCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}
