/**
 * Глобальная вероятность успеха для удобства тестирования
 */
const GLOBAL_PROPABILITY = 0.5
const BAD_JSON_PROPABILITY = 0.5

/**
 * Получить все записи из хранилища
 * @param {callable} onAnswer Функция, обрабатывающая ответ от сервера в формате JSON
 */
export async function all() {
    return TimeoutPropability(300, GLOBAL_PROPABILITY)
        .then(() => serverAnswer(articlesStorage))
}

/**
 * Получить статью по id
 * @param {int} id  Id статьи
 * @param {callable} onAnswer Функция, обрабатывающая ответ от сервера в формате JSON
 */
export async function get(id) {
    return TimeoutPropability(300, GLOBAL_PROPABILITY)
        .then(() => serverAnswer(articlesStorage[mapArticles[id]]))
}
// export function get(id, onAnswer) {
//     TimeoutPropability(300, GLOBAL_PROPABILITY, () => {
//         onAnswer(serverAnswer(articlesStorage[mapArticles[id]]))
//     }, () => {
//         onAnswer(serverAnswer('', 100500, "Propability Error"))
//     })
// }

/**
 * Удалить статью из базы
 * @param {int} id  Id статьи
 * @param {callable} onAnswer Функция, обрабатывающая ответ от сервера в формате JSON
 */
export async function remove(id) {
    return TimeoutPropability(300, GLOBAL_PROPABILITY)
        .then(() => {
            if (id in mapArticles) {
                let num = mapArticles[id]
                delete mapArticles[id]
                articlesStorage.splice(num, 1)
                return serverAnswer(true)
            } else {
                return false
            }
        })
}
// export function remove(id, onAnswer) {
//     TimeoutPropability(300, GLOBAL_PROPABILITY, () => {
//         if (id in mapArticles) {
//             let num = mapArticles[id]
//             delete mapArticles[id]
//             articlesStorage.splice(num, 1)
//             onAnswer(serverAnswer(true))
//         } else {
//             onAnswer(false)
//         }
//     }, () => {
//         onAnswer(serverAnswer('', 100500, "Propability Error"))
//     })
// }

/**полуприватная часть, вдруг захотите сделать промис */
function TimeoutPropability(time, propability) {
    return new Promise(function (res, rej) {
        setTimeout(() => {
            Math.random() < propability ? res() : rej(serverAnswer('', 100500, "Propability Error"))
        }, time)
    })
}
// function TimeoutPropability(time, propability, onSuccess, onError) {
//     setTimeout(() => {
//         Math.random() < propability ? onSuccess() : onError()
//     }, time)
// }

function serverAnswer(data, code = 200, status = "OK") {
    if (Math.random() < BAD_JSON_PROPABILITY) {
        return new Error('incorrect json')
    }
    return JSON.stringify({
        code,
        status,
        data
    })
}

/**приватная часть  */
let articlesStorage = [
    {
        id: 1,
        title: 'Промисификация кода',
        dt: '2018-12-06',
        text: 'Код без промисов бывает жестью, но и с ними можно изобразить много сранного.'
    },
    {
        id: 2,
        title: 'Итераторы и генераторы',
        dt: '2018-12-01',
        text: 'Сначала пугают всех, кто к ним прикасается, а Symbol кажется бредом'
    },
    {
        id: 3,
        title: 'Javascript',
        dt: '2018-12-02',
        text: 'Все равно хороший язык программирования.'
    },
]

let mapArticles = {}

articlesStorage.forEach((item, i) => {
    mapArticles[item.id] = i
}) 