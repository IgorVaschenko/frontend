const inc = () => ({ type: 'INC' })
const dec = () => ({ type: 'DEC' })
const rnd = () => ({
    type: 'RND',
    payload: Math.floor(Math.random() * 10)
})

export { inc, dec, rnd }