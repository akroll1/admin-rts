export const sanitizeUrl = (str: string) => {
    const map: any = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        "`": '&grave;'
    };
    const reg = /[&<>"'/]/ig;
    return str.replace(reg, (match) => (map[match]));
}

export const formattedShowTime = (isoString: string) => {
    const formatted = `${new Date(isoString).toString().slice(4, 10)}, ${new Date(isoString).toString().slice(11, 15)}`;
    return formatted
}

export const showsTimesFaceoff = (isoString: string) => {
    const formatted = `${new Date(isoString).toString().slice(0, 3).toUpperCase()} ${new Date(isoString).toString().slice(4, 10)}, ${new Date(isoString).toString().slice(11, 15)}`;
    return formatted
}

export const predictionIsLocked = (isoTime: string) => {
    // this needs to be fixed
    return Date.now() > new Date(isoTime).getTime();
};


export const parseUrls = (userInput: string) => {
    var urlRegExp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g;
    let formattedMessage = userInput.replace(urlRegExp, (match) => {
        let formattedMatch = match;
        if (!match.startsWith("http")) {
            formattedMatch = `http://${match}`;
        }
        return `<a href=${formattedMatch} class="chat-line__link" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    return formattedMessage;
};

export const capFirstLetters = (word: string) => {
    if(word === undefined || word.length === 0){
        return '';
    } else {
        word.replace(/,/i, '')
        let words = word.split(' ');
        if(words.length === 1){
            return words.map(el => el.charAt(0).toUpperCase() + el.slice(1));
        }
        return words.map(el => el.charAt(0).toUpperCase() + el.slice(1) + ' ').join('');
    } 
};

export const isValidEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}