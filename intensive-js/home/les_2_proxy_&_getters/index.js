//1

class EmailParser {
    constructor(email) {
        this.email = email

        Object.defineProperty(this, 'name', {
            get() {
                console.log('name');
                return this.isCorrect ? this.email.substr(0, this.email.indexOf('@')) : null
            }
        })
        Object.defineProperty(this, 'domain', {
            get() {
                console.log('domain');
                return this.isCorrect ? this.email.split('@')[1] : null
            }
        })
        Object.defineProperty(this, 'isCorrect', {
            get() {
                const validEmail = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i
                console.log('isCorrect');
                return validEmail.test(this.email)
            }
        })
    }
}


let parser = new EmailParser('test_name@test.ru')


console.log(parser);
console.log('name>>>', parser.name)
console.log('domain>>>', parser.domain)
console.log('isCorrect>>>', parser.isCorrect)
console.log('<<<<<<<<<<<<<>>>>>>>>>>>>>>')



///2
let div = document.createElement('div')
div.style.border = '1px solid teal'
div.innerText = 'qfqfqfqf'
document.body.appendChild(div)

function watchObj(tag, callback) {
    return new Proxy(tag, {
        set(target, name, value) {
            // console.log('target', target);
            // console.log('name', name);
            // console.log('value', value);
            target[name] = value
            callback(name, value)
            return true
        },
        get(target, name) {
            return typeof target[name] === 'object'
                ? watchObj(target[name], callback)
                : typeof target[name] === 'function'
                    ? target[name].bind(target)
                    : target[name]
        }
    })
}

cleverDiv = watchObj(div, function (prop, val) {
    console.log(prop, val)
})

cleverDiv.innerHTML = '<strong>HTML</strong><em>Changed</em>';

cleverDiv.style.color = 'red'

// console.log(cleverDiv.innerHTML);//Cannot create proxy with a non-object as target or handler => check on object

cleverDiv.querySelector('em').style.color = 'green' //Illegal invocation слетает контекст

cleverDiv.classList.add('some')