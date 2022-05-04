import {Channel} from "./ModelStorage";

const getComparsionValue = (channel: Channel) =>
    (channel.messages === null || channel.messages.length === 0) ? 0 : channel.messages[0].creation.getTime()

const getSortedChannels = (channels) => Array.from(channels.values()).sort((a, b) => {
    let aTime = getComparsionValue(a);
    let bTime = getComparsionValue(b);
    return (bTime - aTime)
})


export {getSortedChannels}
