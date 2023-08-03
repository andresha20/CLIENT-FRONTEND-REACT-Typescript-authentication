export const setCookie = (name: string, value: string) => {
    let expires = "";
    const date = new Date();
    date.setHours(date.getHours() + 1);
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export const deleteCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const getCookie = (name: string) => {
    const cookieName = name + "=";
    const cookiesAsArray = document.cookie.split(';');
    for(let i = 0; i < cookiesAsArray.length; i++) {
        let cookie = cookiesAsArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(cookieName) == 0) return cookie.substring(cookieName.length, cookie.length);
    }
    return null;
}