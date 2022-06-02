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
