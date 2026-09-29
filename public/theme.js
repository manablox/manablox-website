// Before the first paint: the class enables scroll reveals, the attribute applies a theme
// the visitor chose on an earlier visit. Without a choice the CSS follows the browser, so
// there is nothing to write.
document.documentElement.classList.add('js');
try {
  const chosen = localStorage.getItem('manablox-theme');
  if (chosen === 'dark' || chosen === 'light') document.documentElement.dataset.theme = chosen;
} catch {
  // A browser that refuses storage simply follows its own setting.
}
