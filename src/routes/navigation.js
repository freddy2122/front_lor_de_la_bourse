// Simple navigation utility for use outside React components (e.g., in api clients)
// It stores a navigate function provided by react-router-dom's useNavigate.

let navigatorFn = null;

export function setNavigator(navigate) {
  navigatorFn = navigate;
}

export function navigateTo(path, options = { replace: true }) {
  if (navigatorFn) {
    navigatorFn(path, options);
  } else if (typeof window !== 'undefined') {
    // Fallback if navigator not yet ready
    window.location.href = path;
  }
}
