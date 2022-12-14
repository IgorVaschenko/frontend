//********1******* */
const info: {
    officeId: number,
    isOpened: boolean,
    contacts: {
        phone: string,
        email: string,
        address: {
            city: string
        }
    }
} = {
    "officeId": 45,
    "isOpened": false,
    "contacts": {
        "phone": "+79100000000",
        "email": "my@email.ru",
        "address": {
            "city": "Москва"
        }
    }
}
//********2******* */
enum Status {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    DELETED = 'deleted',
}

async function getFaqs(req: { topicId: number, status?: Status })
    : Promise<{
        question: string,
        answer: string,
        tags: string[]
        likes: number,
        status: Status
    }[]> {
    const res = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(req)
    });
    const data = await res.json();
    return data;
}


//*********3****** */

interface IPayment {
    sum: number;
    from: number;
    to: number;
}
interface IPaymentRequest extends IPayment { }

enum IStatus {
    SUCCESS = 'success',
    FAILED = 'failed'
}

interface IDataSuccess extends IPayment {
    databaseId: number
}
interface IDataFailed {
    errorMessage: string;
    errorCode: number
}

interface IResponseSuccess {
    status: IStatus.SUCCESS
    data: IDataSuccess
}
interface IResponseFailed {
    status: IStatus.FAILED
    data: IDataFailed
}

//*********4****** */

type Resp = IResponseSuccess | IResponseFailed

function typeGuardSuccess(response: Resp): response is IResponseSuccess {
    if (response.status === IStatus.SUCCESS) {
        return true
    } else {
        return false
    }
}

function isRequestSuccess(res: Resp): number {
    if (typeGuardSuccess(res)) {
        return res.data.databaseId
    } else {
        throw new Error(res.data.errorMessage)
    }
}

//*********5 (classes #5)****** */


class Usr {
    skills: string[] = []

    addSkill(args: string[]): void
    addSkill(args: string): void
    addSkill(args: string | string[]): void {
        if (typeof args === 'string') {
            console.log('string>>>>>', args);
        } else {
            console.log('array>>>>>', args.reduce((a, b) => ` ${a} ${b} `));
        }
    }
}

const usr1 = new Usr()
usr1.addSkill('qwqeq')
usr1.addSkill(['cacac', '12', 'cwwcwwcwww'])



//*********5****** */
// Необходимо сделать корзину(Cart) на сайте,
//     которая имееет список продуктов(Product), добавленных в корзину
// и переметры доставки(Delivery).Для Cart реализовать методы:
// - Добавить продукт в корзину
//     - Удалить продукт из корзины по ID
//         - Посчитать стоимость товаров в корзине
//             - Задать доставку
//                 - Checkout - вернуть что всё ок, если есть продукты и параметры доставки
// Product: id, название и цена
// Delivery: может быть как до дома(дата и адрес) или до пункта выдачи(дата = Сегодня и Id магазина)

class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number
    ) { }
}

class Delivery {
    constructor(
        public date: Date
    ) { }
}

class HomeDelivery extends Delivery {
    constructor(date: Date, adress: string) {
        super(date)
    }
}
class ShopDelivery extends Delivery {
    constructor(public shopId: number) {
        super(new Date())
    }
}

type DeliveryOptions = HomeDelivery | ShopDelivery

class Cart {
    private products: Product[] = []
    private delivery: DeliveryOptions

    public addProduct(product: Product): void {
        this.products.push(product)
    }

    public deleteProduct(productId: number): void {
        this.products = this.products.filter((pr: Product) => pr.id !== productId)
    }

    public getSumm(): number {
        return this.products
            .map((pr: Product) => pr.price)
            .reduce((sum: number, pr: number) => sum + pr)
    }

    public setDelivery(delivery: DeliveryOptions): void {
        this.delivery = delivery
    }

    public checkOut(): object {
        if (!this.products.length) throw Error('Ни одного товара в корзине')
        if (!this.delivery) throw Error('Не выбран способ доставки')

        return { success: true }
    }
}

const cart = new Cart()
cart.addProduct(new Product(1, 'banana', 10))
cart.addProduct(new Product(2, 'apple', 20))
cart.addProduct(new Product(3, 'lemon', 30))

cart.deleteProduct(1)
cart.setDelivery(new HomeDelivery(new Date(), 'gomel'))


console.log('-----------------')
console.log(cart.getSumm())
console.log(cart.checkOut())
console.log('-----------------')

//*********6****** */
// Необходимо реализовать абстрактный класс Logger с 2 - мя методами
// абстрактным - log(message): void
//     printDate - выводящий в log дату
// К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,
//     выводящий сначала дату, а потом заданное сообщение

abstract class Logger2 {
    abstract log(message: string): void
    printDate(date: Date) {
        this.log(date.toDateString())
    }
}

class LogWithDate extends Logger2 {
    log(message: string): void {
        console.log(message);
    }
    logWithDate(message: string): void {
        this.printDate(new Date())
        this.log(message)
    }
}

const q = new LogWithDate()
console.log('-----------------')
q.logWithDate('Message LogWithDate')
console.log('-----------------')

//*********7****** */ toString()

function customToString<T>(data: T): string | undefined {
    if (Array.isArray(data)) return data.toString()
    switch (typeof data) {
        case "string":
            return data
        case "bigint":
        case "number":
        case "symbol":
        case "boolean":
        case "function":
            return data.toString()
        case "object":
            return JSON.stringify(data)
        default:
            return undefined
    }
}

console.log('<=========================>');
console.log('string', customToString('string'));
console.log('number', customToString(123));
console.log('bigint', customToString(123e5));
console.log('boolean', customToString(true));
console.log('undefined', customToString(undefined));
console.log('function', customToString(() => { }));
console.log('object', customToString({ a: 1 }));
console.log('array', customToString(['a']));
console.log('symbol', customToString(Symbol('22')));
console.log('<=========================>');



//*********8****** */ sorting 

const data = [
    { id: 1, name: 'Bib' },
    { id: 3, name: 'Bab' },
    { id: 2, name: 'Bob' },
]

interface ID {
    id: number
}
function sortById<T extends ID>(data: Array<T>, type: 'ub' | 'voz'): Array<T> {
    switch (type) {
        case 'ub':
            return data.sort((a, b) => b.id - a.id)
        case 'voz':
            return data.sort((a, b) => a.id - b.id)
        default:
            return data
    }
}

console.log('<=========================>');
console.log(sortById(data, 'ub'));
console.log(sortById(data, 'voz'));
console.log('<=========================>');

//*********9****** */ sorting by key

interface IData {
    group: number;
    name: string;
    id: number
}

const studentsData: IData[] = [
    { group: 1, name: 'QQ', id: 5 },
    { group: 1, name: 'EE', id: 6 },
    { group: 2, name: 'WW', id: 5 },
]

type key = string | number | symbol

interface IGroup<T> {
    [key: string]: T[]
}

function groupByKey<T extends Record<key, any>>(data: T[], key: keyof T): IGroup<T> {
    return data.reduce<IGroup<T>>((map: IGroup<T>, item) => {
        const itemKey = item[key]
        let currentEl = map[itemKey]

        if (Array.isArray(currentEl)) {
            currentEl.push(item)
        } else {
            currentEl = [item]
        }
        map[itemKey] = currentEl
        return map
    }, {})
}
console.log('<=========================>');
const resGr = groupByKey(studentsData, 'group')
const resGr2 = groupByKey(studentsData, 'name')
const resGr3 = groupByKey(studentsData, 'id')
console.log(resGr);
console.log(resGr2);
console.log(resGr3);

console.log('<=========================>');


//CREATEDAT DECORATOR
interface ITestDecorator {
    users: number;
    getUsersInDatabase(): number
}

@setCreatedAtMethod
class TestDecorator implements ITestDecorator {
    users: number = 1000

    getUsersInDatabase(): number {
        return this.users
    }
}

function setCreatedAtMethod<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdAt() {
            const date = new Date()
            return `createdAt method created at: ${date.toString()}`
        }
    }
}

type CreatedAt = {
    createdAt: () => string
}

console.log('<=========================>');
console.log('<<<CREATEDAT DECORATOR>>>');
console.log((new TestDecorator() as ITestDecorator & CreatedAt).createdAt());
console.log('<=========================>');


// DECORATOR ERROR INTERCEPTION
interface ITestError {
    users: number;
    getUsersInDatabase(): number
}

class TestError implements ITestDecorator {
    users: number = 1000

    @Catch({ rethrow: true })
    getUsersInDatabase(): number {
        throw new Error('Test Error')
    }
}

function Catch(rethrow: { rethrow: boolean } = { rethrow: false }) { ///return Promise
    // function Catch(rethrow: boolean = false) { ///return Promise
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) => {
        const method = descriptor.value
        descriptor.value = async (...args: any[]) => {
            try {
                return await method?.apply(target, args)
            } catch (err) {
                if (err instanceof Error && rethrow) {
                    console.log(`Catched error - ${err.message}`);
                    throw (err)
                }
                if (err instanceof Error) {
                    console.log(`Catched error - ${err.message}`);
                }
            }
        }
    }
}



console.log('<=========================>');
console.log('<<<CREATEDAT DECORATOR>>>');
console.log(new TestError().getUsersInDatabase());
console.log('<=========================>');
