
export const predictionIsLocked = epoch => {
    return Date.now() > epoch ? true : false;
};

export const getSidebarData = showData => {
    const { show, fight } = showData;
    const { location, network, showTime } = show;
    const { fightQuickTitle, odds, rounds, weightclass } = fight;
    const transformedOdds = odds ? odds.split(',').join(',') : 'TBD';
    const isLocked = predictionIsLocked(showTime);

    return ({
        fightQuickTitle,
        location,
        isLocked, 
        network, 
        odds: transformedOdds, 
        rounds, 
        showTime: parseEpoch(showTime),
        weightclass: transformedWeightclass(weightclass)
    });
};

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
        return `${day} ${month} ${dayOfMonth} - ${hour} ${ampm}`;
    }
};

export const capFirstLetters = word => {
    if(word == undefined || word.length === 0){
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

/**
 * @param {number} epoch
 * @returns {number} epoch/1000
 */
export const createTimestamp = epoch => {
    return parseInt(Math.round(new Date(epoch)));
};

export const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log('validate email: ',re.test(email));
    return re.test(email) ? true : false;
}

export const removeBadEmails = emails => {
    return emails.filter( email => email != undefined && email.length > 0);
}

export const transformedWeightclass = weightclass => {
    if(weightclass){
        
        let temp;
        if(weightclass.includes('LIGHT')){
            if(weightclass.includes('LIGHTWEIGHT')){
                return `${weightclass.charAt(0).toUpperCase() + weightclass.slice(1).toLowerCase()}`
            }
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
}