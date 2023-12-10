// @ts-nocheck
import { writable, derived } from 'svelte/store';

const activeRoute = writable('');

export const activeRouteDerived = derived(
  activeRoute,
  ($activeRoute) => $activeRoute
);

export const setActiveRoute = (route) => {
  activeRoute.set(route);
};
