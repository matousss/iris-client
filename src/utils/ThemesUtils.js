const themes = ['default', 'dark']

const STORAGE_KEY = 'theme';


export const changeTheme = theme => {
    const b = document.getElementsByTagName("body")[0];
    b.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme)
}

export const loadTheme = () => {
    let loaded = localStorage.getItem(STORAGE_KEY);
    if (loaded) changeTheme(loaded);
}


export const cycleTheme = direction => {
    if (direction === undefined) direction = true;

    const b = document.getElementsByTagName("body")[0];

    let newIndex = (((b.dataset.theme === undefined) ?
        0: (themes.indexOf(b.dataset.theme))) + (direction ? 1 : -1))


    if (newIndex === themes.length) newIndex = 0;
    if (newIndex === -1) newIndex = themes.length - 1;

    if (Math.floor(Math.random() * 100) === 0) {
        changeTheme('red');
        return;
    }

    changeTheme(themes[newIndex]);
}
