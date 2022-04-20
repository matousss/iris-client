const parseChannels = () => {
    return JSON.parse(sessionStorage.getItem('channels'))
}

export {parseChannels}
