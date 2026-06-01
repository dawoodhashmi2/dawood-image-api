// TASK 4: Dark / Light theme toggle button
function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="theme-btn"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? ' Dark' : ' Light'}
    </button>
  )
}

export default ThemeToggle
