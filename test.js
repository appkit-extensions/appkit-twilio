var twilio = require('./index');

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC1fe4c812be......................';
const authToken = '0d086ca31f72......................';
const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+12223334444',
     to: '+17172012010'
   })
  .then(message => {
      console.log(message.sid)
  })
  .catch(ex => console.error(ex));

client.messages('SMb802f82b27bf4d8b8284991963c5ae2c')
  .fetch()
  .then(message => console.log(message.to))
  .catch(ex => console.error(ex))

client.messages
  .list()
  .then(messages => console.log(messages))
  .catch(ex => console.error(ex))
