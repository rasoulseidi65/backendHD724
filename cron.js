var CronJob = require('cron').CronJob;
var Cron = require('./mongodb_backup.js');
new CronJob('0 0 0 * * *', function() {
    Cron.dbAutoBackUp();
    console.log('g')
}, null, true, 'America/New_York');
