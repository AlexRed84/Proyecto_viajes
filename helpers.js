const{ format } = require('date-fns');

function formatDateToDB(dateObjet) {

    return format(dateObjet, "yyyy-MM-dd HH:mm:ss")    
}

module.exports = {
    formatDateToDB,
};