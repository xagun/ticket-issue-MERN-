const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

// redis protocol with 
// redis://localhost:6379

const setJWT = (key, value) => {
    return new Promise((resolve, reject) => {
        try {
            client.set(key, value, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });

        } catch (error) {
            reject(error)

        }

    })

}

const getJWT = (key) => {

  
    return new Promise((resolve, reject) => {
        try {
            client.get('key', (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });

        } catch (error) {
            reject(error)

        }

    })

}

module.exports = {
    setJWT,
    getJWT
}