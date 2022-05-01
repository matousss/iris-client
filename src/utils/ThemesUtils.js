const themes = ['default', 'dark', 'red']


const changeTheme = theme => {
    const b = document.getElementsByTagName("body");
    b.dataset.theme = theme;
}

const cycleTheme = direction => {
    if (direction === undefined) direction = true;

    const b = document.getElementsByTagName("body")[0];

    let newIndex = ((b.dataset.theme === undefined) ?
        0: (themes.indexOf(b.dataset.theme)) + (direction ? 1 : -1))


    if (newIndex === themes.length) newIndex = 0;
    if (newIndex === -1) newIndex = themes.length - 1;

    b.dataset.theme = themes[newIndex]
}

export {cycleTheme, changeTheme}