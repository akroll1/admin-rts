import parseISO from 'date-fns/parseISO'

export const parseUrls = (userInput) => {
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
export const predictionIsLocked = epoch => {
    return Date.now() > epoch ? true : false;
}
export const parseEpoch = (epoch, form) => {
    // time needs to be set toLocale stuff...
    epoch = parseInt(epoch)
    const time = new Date(epoch);
    if(epoch){
        const hoursArr = [...Array(24).keys()];
        const hour = hoursArr[time.getHours()] % 12;
        const ampm = time.getHours() >= 12 ? 'pm' : 'am';
        const daysArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const day = daysArr[time.getDay()];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const month = months[time.getMonth()];
        const year = time.getFullYear();
        const dayOfMonth = time.getDate();
        if(form){
            return `${month} ${dayOfMonth}, ${year}`;
        }
        return `${day} ${month} ${dayOfMonth} - ${hour}${ampm}`;
    }
};

export const capFirstLetters = word => {
    if(word == undefined || word.length === 0){
        return '';
    } else {
        const words = word.split(' ');
        if(words.length === 1){
            return words.map(el => el.charAt(0).toUpperCase() + el.slice(1));
        }
        return words.map(el => el.charAt(0).toUpperCase() + el.slice(1) + ' ');
    } 
};

/**
 * @param {number} epoch
 * @returns {number} epoch/1000
 */
export const createTimestamp = epoch => {
    return parseInt(Math.round(new Date(epoch)));
};

/**
 * @param {number} epoch/1000
 * @returns {string} ISO string
 */
export const createISOString = timestamp => {

    timestamp *= 1000;
    const time = parseISO(new Date(timestamp).toISOString());
}


export const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log('validate email: ',re.test(email));
    return re.test(email);
}
export const removeBadEmails = emails => {
    return emails.filter( email => email != undefined && email.length > 0);
}
export const slicedGame = (str) => {
    let index = str.indexOf('-');
    if(index > -1){
        return str.slice(0,index);
    } else {
        return str;
    }
};

export const getGameType = (path) => {
    if(path.includes('poll')) return 'poll';
    if(path.includes('quiz')) return 'quiz';
    if(path.includes('predictive')) return 'predictive';
};

export const transformedWeightclass = weightclass => {
    let temp;
    if(weightclass.includes('LIGHT')){
        temp = weightclass
            .slice(5).
            toLowerCase();
        return `Light ${temp.charAt(0).toUpperCase() + temp.slice(1)}`;
    }
    if(weightclass.includes('SUPER')){
        temp = weightclass
        .slice(5).
        toLowerCase();
        return `Super ${temp.charAt(0).toUpperCase() + temp.slice(1)}`;
    }
    return `${ weightclass.charAt(0).toUpperCase() + weightclass.slice(1).toLowerCase()}`
}