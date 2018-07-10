# appkit-twilio

## Usage

Create a Twilio client with your account SID and AuthToken
```
const accountSid = 'AC1fe4c812be......................';
const authToken = '0d086ca31f72......................';

const client = Libs.twilio(accountSid, authToken);
```

Send a message
```
const message = await client.messages.create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12223334444',
    to: '+17172012010'
});
console.log(message.id);

```

Get a specific message
```
const message = await client.messages('SMb802f82b27bf4d8b8284991963c5ae2c').fetch();
console.log(message.to);
```

Get a list of recent messages
```
const messages = await client.messages.list();
console.log(messages);
```
