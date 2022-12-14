import * as serverApi from './my-db.js'

async function all() {
    const response = await serverApi.all()
    return responseToJson(response)
}

async function one(id) {
    const response = await serverApi.get(id)
    return responseToJson(response)
}

async function remove(id) {
    const response = await serverApi.remove(id)
    return responseToJson(response)
}

const responseToJson = (response) => {
    try {
        const articles = JSON.parse(response)
        if (articles.code !== 200) throw new Error('Bad code request, code not equal 200')
        return articles
    } catch (e) {
        throw e
    }
}

const toCorrectError = (e) => {
    if (typeof e !== 'string') {
        console.log(e.message);
    } else {
        const error = JSON.parse(e)
        console.log(error.status)
    }
}

export { all, one, remove, toCorrectError }