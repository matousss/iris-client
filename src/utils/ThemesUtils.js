const themes = ['default', 'dark', 'red']


const changeTheme = theme => {
    const b = document.getElementsByTagName("body");
    b.dataset.theme = theme;
}

const cycleTheme = direction => {
    if (direction === undefined) direction = true;

    const b = document.getElementsByTagName("body")[0];

    let newIndex = (b.dataset.theme === undefined) ?
        1: (themes.indexOf(b.dataset.theme) + (direction ? 1 : -1))


    if (newIndex === themes.length) newIndex = 0;

    b.dataset.theme = themes[newIndex]
    console.log(themes.indexOf(b.dataset.theme))
}

export {cycleTheme, changeTheme}