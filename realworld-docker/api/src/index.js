const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const { connectDb } = require('./helpers/db')
const { port, host, db, authApiUrl } = require('./configuration')
const app = express()

const postSchema = new mongoose.Schema({ //add db schema
    name: String
});
const Post = mongoose.model('Post', postSchema);//add model

const startServer = () => {
    app.listen(port, () => {
        console.log(`>>>>>>>>>>Started api service on port ${port}`);
        console.log(`>>>>>>>>>>On host ${host}`);
        console.log(`>>>>>>>>>>Our database ${db}`);

        Post.find(function (err, posts) {
            if (err) return console.error('>>>>>>>>>>', err);
            console.log('>>>>>>>>>>', posts);
        })

        //create Post instance
        const silence = new Post({ name: 'Silence' });
        console.log('>>>>>>>>>>', silence.name); // 'Silence'
        //add item to DB
        silence.save(function (err, savedSilince) {
            if (err) return console.log('>>>>>>>>>>', err)
            console.log('>>>>>>>>>>savedSilince with volumes', savedSilince);
            // console.log('>>>>>>>>>>savedSilince', savedSilince);
        })
    })
}

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly')
})

app.get('/testwithcurrentuser', (req, res) => {
    // console.log('authApiUrl>>>>>>>>>', authApiUrl);
    axios.get(`${authApiUrl}/currentUser`)
        .then(response => {
            res.json({
                testwithcurrentuser: true,
                currentUserFromAuth: response.data
            })
        })
})

app.get('/api/testapidata', (req, res) => {
    res.json({
        testwithapi: true
    })
})

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer)

//*****************do 12
// const express = require('express')
// const mongoose = require('mongoose')
// const { connectDb } = require('./helpers/db')
// const { port, host, db } = require('./configuration')
// const app = express()

// const postSchema = new mongoose.Schema({ //add db schema
//     name: String
// });
// const Post = mongoose.model('Post', postSchema);//add model

// const startServer = () => {
//     app.listen(port, () => {
//         console.log(`>>>>>>>>>>Started api service on port ${port}`);
//         console.log(`>>>>>>>>>>On host ${host}`);
//         console.log(`>>>>>>>>>>Our database ${db}`);

//         Post.find(function (err, posts) {
//             if (err) return console.error('>>>>>>>>>>', err);
//             console.log('>>>>>>>>>>', posts);
//         })

//         //create Post instance
//         const silence = new Post({ name: 'Silence' });
//         console.log('>>>>>>>>>>', silence.name); // 'Silence'
//         //add item to DB
//         silence.save(function (err, savedSilince) {
//             if (err) return console.log('>>>>>>>>>>', err)
//             console.log('>>>>>>>>>>savedSilince', savedSilince);
//         })
//     })
// }

// app.get('/test', (req, res) => {
//     res.send('Our api server is working correctly')
// })

// connectDb()
//     .on('error', console.log)
//     .on('disconnected', connectDb)
//     .once('open', startServer)


//************do 10
// const express = require('express')
// const { connectDb } = require('./helpers/db')
// const { port, host, db } = require('./configuration')
// const app = express()
// // const port = process.env.PORT //removed to configuration/index.js
// // const host = process.env.HOST
// app.listen(port, () => {
//     console.log(`Started api service on port ${port}`);
//     console.log(`On host ${host}`);
//     console.log(`Our database ${db}`);
// })
// const startServer = () => {
//     app.listen(port, () => {
//         console.log(`Started api service on port ${port}`);
//         console.log(`On host ${host}`);
//         console.log(`Our database ${db}`);
//     })
// }

// console.log(`PORT ${process.env.PORT}`)//from docker-compose.yml envirement

// app.get('/test', (req, res) => {
//     res.send('Our api server is working correctly')
// })
// //2// app.listen(port, () => {
// //     console.log(`Started api service on port ${port}`);
// //     console.log(`On host ${host}`);
// // })
// //1// app.listen(3000, () => {
// //     console.log('Started api service');
// // })

// connectDb()
//     .on('error', () => console.log('NOT START'))
//     .on('disconnected', () => connectDb)
//     .once('open', () => startServer) 