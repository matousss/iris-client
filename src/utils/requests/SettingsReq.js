import {getFetch} from "./RequestUtils";
import {getBasicAuth} from "./AuthReq";

async function updateAvatar(avatarBase64) {
    let avatar = await fetch(avatarBase64);
    let formData = new FormData();

    formData.append('avatar', await avatar.blob(), 'avatar.png')
    return await getFetch('avatar', 'POST', formData)
}

async function changePassword(auth, newPassword) {
    let formData = new FormData();
    formData.append('password', newPassword);
    return getFetch('changepassword', 'POST', formData, getBasicAuth(auth))
}

export {updateAvatar, changePassword}