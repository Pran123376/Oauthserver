const { v4: uuidv4 } = require('uuid');

module.exports.generateClientId = () => {
    return uuidv4()
}
module.exports.generateClientSecret = () => {
    return uuidv4()
}
module.exports.generateCode = () => {
    return new Array(8).fill(null).map(() => Math.floor(Math.random() * 10)).join('');
}
module.exports.generateToken = () => {
    return new Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('');
}
module.exports.generateRefreshToken = () => {
    return new Array(10).fill(null).map(() => Math.floor(Math.random() * 10)).join('');
}

