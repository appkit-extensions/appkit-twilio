// const fetch = require('node-fetch');

module.exports = function client(accountSid, authToken) {
    const api = {
        messages: Messaging(accountSid, authToken)
    };

    api.messages.create = (opts) => {
        const { body, from, to } = opts;
        return messagesCreate(body, to, from, accountSid, authToken);
    }

    api.messages.list = (opts) => {
        // const { } = opts;
        return messagesList(accountSid, authToken);
    }

    return api;
}

const Messaging = (accountSid, authToken) => (messageId) => {
    return {
        fetch: () => {
            return messagesFetch(messageId, accountSid, authToken);
        },
    }
}

async function messagesCreate(message, toNumber, fromNumber, accountSid, authToken) {

    let body = '';
    body += 'To=' + encodeURIComponent(toNumber) + '&';
    body += 'From=' + encodeURIComponent(fromNumber) + '&';
    body += 'Body=' + encodeURIComponent(message);

    const options = {
        method: 'POST',
        body,
        headers: {
            "Authorization": "Basic " + new Buffer(accountSid + ':' + authToken).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/SMS/Messages.json`, options);
    const json = await res.json();
    return json;
};

async function messagesFetch(messageId, accountSid, authToken) {

    const options = {
        method: 'GET',
        headers: {
            "Authorization": "Basic " + new Buffer(accountSid + ':' + authToken).toString("base64"),
        }
    }

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/SMS/Messages/${messageId}.json`, options);
    const json = await res.json();
    return json;
};

async function messagesList(accountSid, authToken) {

    const options = {
        method: 'GET',
        headers: {
            "Authorization": "Basic " + new Buffer(accountSid + ':' + authToken).toString("base64"),
        }
    }

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/SMS/Messages.json`, options);
    const json = await res.json();
    return json;
};
