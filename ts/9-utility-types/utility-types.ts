//PARTIAL READONLY REQUIRED

interface Person {
    name: string
    age?: number
    email: string
}

type partial = Partial<Person> /// Все свойства НЕОБЯЗАТЕЛЬНЫ
const p: partial = {}
type required = Required<Person> /// Все свойства OБЯЗАТЕЛЬНЫ
type readonly = Readonly<Person> /// только ДЛЯ ЧТЕНИЯ

type requiredReadonly = Required<Readonly<Person>> /// можно комбинировать

//PICK, OMIT, EXTRACT, EXCLUDE

interface PaymentPersistant {
    id: number
    sum: number
    from: string
    to: string
}

type Payment = Omit<PaymentPersistant, 'id'>/// Позволяет убрать ненужные свойства из типа
type PaymentRequisits = Pick<PaymentPersistant, 'from' | 'to'>/// Позволяет взять нужные свойства из типа

type ExtractEx = Extract<'from' | 'to' | Payment, string>/// Вытащить только string (только необходимые по заданному типу)
type ExcludeEx = Exclude<'from' | 'to' | Payment, string>/// Вытащить только не string (только НЕ заданного  типа)


///RETURNTYPE PARAMETERS CONSTRUCTORPARAMETERES

class User {
    constructor(
        public id: number,
        public name: string,
    ) { }
}

function getData(id: number): User {
    return new User(id, 'Bob')
}

type RT = ReturnType<typeof getData>///для получения ТИПА возвращаемой функции
type RT2 = ReturnType<()=>void>
type RT3 = ReturnType<<T>()=>T>
type RT4 = ReturnType<<T extends number>()=>T>

type PT = Parameters<typeof getData>///для получения КОРТЕЖА ПАРАМЕТРОВ данного типа функции
type first = PT[0]

type CP = ConstructorParameters<typeof User>///Парамент конструктора КЛАССА
type IT = InstanceType<typeof User>///instance CLASS


///AWAITED

type A = Awaited<Promise<string>>///для получения ТИПА возвращаемого промиса/цепочки промисов
type A2 = Awaited<Promise<Promise<string>>>

interface IMenu {
    name: string
    url: string
}

async function getMenu() : Promise<IMenu[]> {
    return [{ name: 'Analitics', url: 'analitics'}]    
}
type R = Awaited<ReturnType<typeof getMenu>>

async function getArray<T>(x: T): Promise<Awaited<T>[]> {
    return [await x]
}