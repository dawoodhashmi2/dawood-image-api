function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-btn"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className="icon">{theme === 'dark' ? '○' : '●'}</span>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
export default ThemeToggle
