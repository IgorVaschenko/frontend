import * as ArticlesModel from './my-articles'

async function ApiReq() {

    let articles = await ArticlesModel.all()

    let data = articles.data
    console.log('articles names:' +
        data.map((item, i, arr) => i !== arr.length - 1
            ? ` "${item.title}"`
            : ` "${item.title}".`)
    );

    // берем случайный индекс
    const ind = Math.floor(Math.random() * data.length)
    const id = data[ind].id
    console.log('select index = ' + ind + ', id = ' + id);

    const article = await ArticlesModel.one(id)
    console.log(`Choiced article with name: ${article.data.title}`);

    //пробуем удалить её
    const isDeleted = await ArticlesModel.remove(id)
    console.log(`Choiced arcticle is deleted: ${isDeleted.data}`)

    articles = await ArticlesModel.all()

    return articles
}
ApiReq()
    .then(({ data }) => console.log('articles names after one delete:' +
        data.map((item, i, arr) => i !== arr.length - 1
            ? ` "${item.title}"`
            : ` "${item.title}".`)
    ))
    .catch((e) => {
        ArticlesModel.toCorrectError(e)
    })


/**PROMISES */
// ArticlesModel.all()
//     .then((articles) => {
//         console.log('articles names:' +
//             articles.map((item, i, arr) => i !== arr.length - 1
//                 ? ` "${item.title}"`
//                 : ` "${item.title}".`)
//         );

        // берем случайный индекс
        // const ind = Math.floor(Math.random() * articles.length)
        // const id = articles[ind].id
//         console.log('select index = ' + ind + ', id = ' + id);

//         return ArticlesModel.one(id)
//     })
//     .then((article) => {
//         console.log(`Choiced article with name: ${article.title}`);

//         return ArticlesModel.remove(article.id)
//         //пробуем удалить её
//     })
//     .then(() => {
//         console.log(`Choiced arcticle is deleted`)

//         return ArticlesModel.all()
//     })
//     .then((articles) => {
//         //а сколько статей в базе сейчас
//         console.log('In DB stayed next articles:' +
//             articles.map((item, i, arr) => i !== arr.length - 1
//                 ? ` "${item.title}"`
//                 : ` "${item.title}".`)
//         );
//     })
//     .catch((e) => console.log(e))