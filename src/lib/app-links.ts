/**
 * Links into the product app. EVERY sign-in / sign-up CTA on this site goes
 * through these two constants — never a hand-written URL in a component.
 * The app's own routes use trailing slashes.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://linkedin.tyashin.com').replace(/\/+$/, '');
export const SIGNUP_URL = `${APP_URL}/signup/`;
export const LOGIN_URL = `${APP_URL}/login/`;
