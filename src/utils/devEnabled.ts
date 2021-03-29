import isLocalhost from './isLocalHost';

export default function devEnabled(): boolean {
  return isLocalhost || window.location.search.includes('dev_enabled');
}
