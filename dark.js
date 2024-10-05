document.addEventListener('DOMContentLoaded', function() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const darkThemeClass = 'dark-mode';

    // Check for saved user preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === darkThemeClass) {
        document.body.classList.add(darkThemeClass);
        applyDarkModeToAllElements();
    }

    themeToggleButton.addEventListener('click', function() {
        if (document.body.classList.contains(darkThemeClass)) {
            document.body.classList.remove(darkThemeClass);
            localStorage.removeItem('theme');
            removeDarkModeFromAllElements();
        } else {
            document.body.classList.add(darkThemeClass);
            localStorage.setItem('theme', darkThemeClass);
            applyDarkModeToAllElements();
        }
    });

    function applyDarkModeToAllElements() {
        document.querySelectorAll('*').forEach(el => el.classList.add(darkThemeClass));
    }

    function removeDarkModeFromAllElements() {
        document.querySelectorAll('*').forEach(el => el.classList.remove(darkThemeClass));
    }
});
