const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');
module.exports = class SelleruserTransform extends Transform {

    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
            'firstname': item.firstname,
            'lastname': item.lastname,
            ...this.withToken(item)


        }
    }
    withToken(item) {
        if (item.token)
            return { token: item.token }

        if (this.createToken) {

            let token = jwt.sign({ selleruser_id: item._id }, config.secret, {
                expiresIn: '110h',
            });

            return { token }
        }

        return {};
    }
}