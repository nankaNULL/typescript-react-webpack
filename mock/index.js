const delay = require('mocker-api/lib/delay.js');

const noProxy = process.env.NO_PROXY === 'true';

var proxy = {
    'GET /api/user/info': {
        result: true,
        result_code: 1,
        result_message: 'success',
        data: {
            username: 'yuwan'
        }
    }
}

module.exports = (noProxy ? {} : delay(proxy, 1000));
