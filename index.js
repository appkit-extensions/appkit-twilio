const request = require('request');

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

function messagesCreate(message, toNumber, fromNumber, accountSid, authToken) {

    const options = {
        method: 'POST',
        form: {
            To: toNumber,
            From: fromNumber,
            Body: message,
        },
        json: true,
        headers: {
            "Authorization": "Basic " + new Buffer(accountSid + ':' + authToken).toString("base64"),
            "Content-Type": "application/json",
        }
    }

    const promise = new Promise((resolve, reject) => {
        request.post(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/SMS/Messages.json`, options, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (body.code) {
                reject(body);
            } else {
                resolve(body);
            }
        });
    });
    return promise;
};

function messagesFetch(messageId, accountSid, authToken) {

    const options = {
        method: 'GET',
        form: {
        },
        json: true,
        headers: {
            "Authorization": "Basic " + new Buffer(accountSid + ':' + authToken).toString("base64"),
            "Content-Type": "application/json",
        }
    }

    const promise = new Promise((resolve, reject) => {
        request.get(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/SMS/Messages/${messageId}.json`, options, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (body.code) {
                reject(body);
            } else {
                resolve(body);
            }
        });
    });
    return promise;
};

function messagesList(accountSid, authToken) {

    const options = {
        method: 'GET',
        form: {
        },
        json: true,
        headers: {
            "Authorization": "Basic " + new Buffer(accountSid + ':' + authToken).toString("base64"),
            "Content-Type": "application/json",
        }
    }

    const promise = new Promise((resolve, reject) => {
        request(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/SMS/Messages.json`, options, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (body.code) {
                reject(body);
            } else {
                resolve(body);
            }
        });
    });
    return promise;
};
