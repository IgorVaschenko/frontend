//KEYOF

interface IUser {
    name: string
    age: number
}

type KeysOfUser = keyof IUser

const key: KeysOfUser = "age"

function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

const user: IUser = {
    name: 'Bob',
    age: 30
}

const userName = getValue(user, 'name')

//TYPEOF

let strOrNum: string | number

let strOrNum2: typeof strOrNum

const user12 = {
    name: 'BOB'
}

type keyOfUser = keyof typeof user12


enum Direction {
    up,
    down
}

type d = keyof typeof Direction

//Indexed Access Types

interface Role {
    name: string
}
interface Permission {
    endDate: Date
}

interface User211 {
    name: string
    roles: Role[]
    permission: Permission
}

const user21: User211 = {
    name: 'Bob',
    roles: [],
    permission: {
        endDate: new Date()
    }
}

const nameUser = user['name'] //обращение к переменным
let roleNames: 'roles' = 'roles'

type rolesType = User211['roles']//обращение к типам
// type roleType2 = User[roleNames]//ошибка, нельзя напрямую(при const можно)
type rolesType2 = User211[typeof roleNames]

type roleType = User211['roles'][number]  ///достаем тип из любой вложенности
type dateType = User211['permission']['endDate']


const roles = ['admin', 'user', 'super-user'] as const
type roleTypes = typeof roles[number] ///создания union-типа из заданных значений!!!!!


////Conditional Types====>тернарник для типов

const a: number = Math.random() > 0.5 ? 1 : 0

interface HTTPResponse<T extends 'success' | 'failed'> {
    code: number;
    data: T extends 'success' ? string : Error
    additionalData: T extends 'success' ? string : number
}

const succ: HTTPResponse<'success'> = {
    code: 200,
    data: 'done',
    additionalData: 'good'
}
const err: HTTPResponse<'failed'> = {
    code: 404,
    data: new Error('failed'),
    additionalData: 321
}

class User1 {
    id: number;
    name: string
}
class UserPersisted {
    dbId: string
}

//с перегрузками
function getUser(dbId: string): UserPersisted
function getUser(id: number): User1
function getUser(dbIdorID: string | number): User1 | UserPersisted {
    if (typeof dbIdorID === 'string') {
        return new UserPersisted()
    } else {
        return new User1()
    }
}

type UserOrUserPersisted<T extends string | number> = T extends number ? User1 : UserPersisted
function getUser2<T extends string | number>(id: T): UserOrUserPersisted<T> {
    if (typeof id === 'string') {
        return new UserPersisted() as UserOrUserPersisted<T>
    } else {
        return new User1() as UserOrUserPersisted<T>
    }
}

const result = getUser2(1)
const result2 = getUser2('daacv')


///INFER

function runTransaction(transaction: {
    fromTo: [string, string],//
    fromTo2?: [string, string],//
}) {
    console.log(transaction);
}

type GetFirstArg<T> = T extends (first: infer First, ...args: any) => any ? First : never // данная функция достанет тип, при том что явно он нигде не указан, 
//хак для вытаскивания корректного типа (к примеру со сторонней либы)

const transaction: GetFirstArg<typeof runTransaction> = {
    // fromTo: ['1', '2'] as [string, string] // ===> жестко указываем (крайнее решение)
    fromTo: ['1', '2']
}

runTransaction(transaction)

///MAPPED TYPES

type Modifier = 'read' | 'update' | 'create'

type UsrRoles = {
    customers?: Modifier,
    projcts?: Modifier,
    adminPanel?: Modifier,
}

type ModifierToAccess<Type> = {
    +readonly [Property in keyof Type as `CanAccess-${string & Property}`]+?: boolean // +/- обязательны/нет  , также можно заждать кастом имя,  только для чтения
    // +readonly [Property in keyof Type]-?: boolean
}

type UserAccess2 = ModifierToAccess<UsrRoles> /// полная автоматизация при добавлении\удалении ролей

type UserAccess = {  ///нужно вручную добавлять флаг при изменение usrRoles
    customers?: boolean,
    projcts?: boolean,
    adminPanel?: boolean,
}

///TEMPLATE LITERAL TYPES
type ReadOrWrite = 'read' | 'write'
type Bulk = 'bulk' | ''

type Access = `can${ReadOrWrite}`
type Access2 = `can${Capitalize<ReadOrWrite>}` ///Uppercase and other 
type Access3 = `can${Capitalize<ReadOrWrite>}${Capitalize<Bulk>}`

type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never  ///обратно вытянуть тип в объединении ==> infer
type T = ReadOrWriteBulk<Access3>

type ErrorOrSuccess = 'error' | 'success'
type ResponseT = {
    results: `http${Capitalize<ErrorOrSuccess>}`
}

const aw: ResponseT = {
    results: "httpSuccess" ///httpError
}