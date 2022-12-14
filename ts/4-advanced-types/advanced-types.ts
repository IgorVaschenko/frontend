////*******UNION */

function logId(id: string | number | boolean) {
    if (typeof id === 'string') console.log(id.toUpperCase());
    if (typeof id === 'number') console.log(id, 'number');
    if (typeof id === 'boolean') console.log(id, 'boolean');
}

logId('qwerty')

function logError(err: string | string[]) {
    if (typeof err === 'string') console.log(err.toUpperCase());
    if (Array.isArray(err)) console.log(err.reduce((a, b) => `${a} and ${b}`));
}

logError('error single')
logError(['error1', 'error2', 'error3', 'error4'])

function logObject(obj: { a: number } | { b: number }) {
    if ('a' in obj) {
        console.log(obj.a);
    } else {
        console.log(obj.b);
    }
}

logObject({ a: 3 })
logObject({ b: 5 })


function logMultipleIds(a: string | number, b: string | boolean) {
    if (typeof a === typeof b) {
        console.log(`types ${a} & ${b} is same`);
    } else {
        console.log(`types ${a} & ${b} different`);
    }
}

logMultipleIds('qw', 'wq')

///*******LITERAL TYPES */

function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    return 1
}

fetchWithAuth('a', 'post')

let method = 'post'

fetchWithAuth('a', method as 'post')

////********TYPES ALIAS

type httpMethod = 'post' | 'get'

function fetchingWithAuth(url: string, method: httpMethod): 1 | -1 {
    return 1
}

type UserProps = {
    firstname: string,
    lastname: string,
    city: string,
    age: number,
    skills: string[]
}

type Role = {
    id: number
}

type UserWithRole = UserProps & Role
// type UserWithRole = UserProps | Role   =>OR

const User: UserWithRole = {
    firstname: 'Oleg',
    lastname: 'Pupkin',
    city: 'Minsk',
    age: 23,
    skills: ['1', '2'],
    id: 33
}

///*******INTERFACES

interface User {
    firstname: string,
    lastname: string,
    city: string,
    age: number,
    skills: string[]

    log: (id: number) => string
}

interface UserWithRol extends User {
    roleId: number
}
//OR
interface Rol {
    roleId: number
}

interface UserWithRol extends User, Rol {
    createdAt: Date;
}

const Person: UserWithRol = {
    firstname: 'Oleg',
    lastname: 'Pupkin',
    city: 'Minsk',
    age: 23,
    skills: ['1', '2'],
    roleId: 58,
    createdAt: new Date(),

    log(id) {
        return ''
    }
}

interface UserDic {
    [index: number]: User
}
type UserDic2 = {
    [index: number]: User
}


///OPTIONAL*********

interface User22 {
    login: string;
    password?: string
}
type User21 = {
    login: string;
    password?: string
}

const userr: User22 = {
    login: 'q@d.ru',
}

function multiply(first: number, second?: number) {
    return second ? first * second : first ** 2
}

console.log(multiply(3));



interface UserPro {
    login: string;
    password?: {
        type: 'primary' | 'secondary'
    }
}

function testPass(user: UserPro) {
    const t = user.password?.type
    // const t = user.password!.type
}

function test(param?: string) {
    const t = param ?? multiply(5)
}

//************VOID

function multiply2(first: number, second?: number): number | void {
    if (second) return first * second

    // return first ** 2
}

type voidFunc = () => void

const f1: voidFunc = () => { }
const f2: voidFunc = () => {
    return true    ///  SKIP RETURN
}

const b = f2()

const skillz = ['dev', 'front']

const user3 = {
    s: ['']
}

skillz.forEach((skill) => user3.s.push(skill))


//************UNKNOWN

let input: unknown

input = 3
input = ['sd', 'ss']

function run(i: unknown) {
    if (typeof i === 'number') {
        i++
        console.log('number', i);
    } else {
        console.log('not number', i);
    }
}
run(input)

async function getData() {
    try {
        await fetch('')
    } catch (err) {
        if (err instanceof Error) {
            console.log('error', err.message);
        }
        //OR
        const e = err as Error ///не явно ==> не рекомендуется
        console.log('error2', e.message);
    }
}
getData()

type U1 = unknown | null

type I1 = unknown & string

///NEVER *****************

function generateError(message: string): never {
    throw new Error(message)
}

function dumpError(): never {
    while (true) { }
}

function rec(): never {
    return rec()
}

type paymentAction = 'refund' | 'checkout' | 'reject'

function proccessAction(action: paymentAction) {
    switch (action) {
        case 'refund':
            //...
            break;
        case 'checkout':
            //..
            break;
        case 'reject':
            //..
            break;
        default:
            const _: never = action
            throw new Error('No action')
    }
}


function isString(x: string | number): boolean {///исчерпывающая проверка
    if (typeof x === 'string') {
        return true
    } else if (typeof x === 'number') {
        return false
    }
    generateError('error')
}

////NULL ===>>>>    tsconfig.json ====> "strictNullChecks": true,   
const n: null = null
const n1: any = null
// const n2: number = null
// const n3: string = null
// const n4: boolean = null
// const n5: undefined = null

interface Userr {
    name: string
}

const getUser = () => {
    if (Math.random() > 0.5) {
        return null
    } else {
        return {
            name: 'Bob'
        } as Userr
    }
}

const user4 = getUser()

if (user4) {
    const name4 = user4.name
}

//CONVERSION TYPES ***********


interface User5 {
    name: string;
    email: string;
    login: string;
}

const usr: User5 = {
    name: 'Bob',
    email: 'bob@mail.com',
    login: 'bob',
}

interface Adm {
    name: string;
    role: number
}

const admin: Adm = {  ///has email && login 
    ...usr,
    role: 1
}
console.log(admin);
// ||
// \/
const userToAdmin = (user: User5): Adm => {  ///has NOT email && login 
    return {
        name: user.name,
        role: 3
    }
}
const admin2 = userToAdmin(usr)
console.log(admin2);


/// TYPE GUARD

function loggId(id: string | number) {
    if (isStrin(id)) {
        // if (typeof id === 'string') {
        console.log(id);
    } else {
        console.log(id);
    }
}

function isStrin(x: string | number): x is string {
    return typeof x === 'string'
}


function isAdmin(user: User5 | Adm): user is Adm {
    return 'role' in user
}
function isAdminAlternative(user: User5 | Adm): user is Adm {
    return (user as Adm).role !== undefined
}
function setRoleZero(user: User5 | Adm) {
    if (isAdmin(user)) {
        user.role = 0
    } else {
        throw new Error('User is not ADMIN')
    }
}

///ASSERTS

interface User6 {
    name: string
}

const a = {}

assertsUser(a)

a.name = 'Bob'

function assertsUser(obj: unknown): asserts obj is User6 {
    if (typeof obj === 'object' && !!obj && 'name' in obj) {
        return
    }
    throw new Error('Objec is not User')
}