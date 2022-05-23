import {getFetch} from "./RequestUtils";

async function updateAvatar(avatarBase64) {
    let avatar = await fetch(avatarBase64);
    let formData = new FormData();

    formData.append('avatar', await avatar.blob(), 'avatar.png')
    return await getFetch('avatar', 'POST', formData)
}

export {updateAvatar}