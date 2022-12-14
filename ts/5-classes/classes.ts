///CREATE CLASS

class User7 {
    name: string;

    constructor(name: string) {
        this.name = name
    }
}

const user7 = new User7('Adam')
console.log(user7);
user7.name = 'Bob'
console.log(user7);

class Admin7 {
    role: number
    // role!: number or in tsconfig strict : false
}

const admin7 = new Admin7()
admin7.role = 1
console.log(admin7);

///CONSTRUCTOR

class User8 { //класс с 3мя перезагрузками ---- можно указать либо ничегоб либо имя, либо возраст
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(age: number);
    constructor(name: string, age: number);
    constructor(nameOrAge?: string | number, age?: number) {
        if (typeof nameOrAge === 'string') {
            this.name = nameOrAge
        } else if (typeof nameOrAge === 'string') {
            this.age = nameOrAge
        }
        if (typeof age === 'string') {
            this.age = age
        }
    }
}
const user8 = new User8('Adam')
const user9 = new User8()
const user10 = new User8(33)
const user11 = new User8('Adam', 33)

//METHODS
enum PaymentStatus {
    Holded,
    Proccessed,
    Reversed
}

class Payment {
    id: number;
    status: PaymentStatus = PaymentStatus.Holded;
    createdAt: Date = new Date();
    updateAt: Date;

    constructor(id: number) {
        this.id = id
        // this.createdAt = new Date()   ===> вынесли вверх по умолчанию 
        // this.status = PaymentStatus.Holded
    }

    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime()
    }
    unholdPayment(): void {
        if (this.status === PaymentStatus.Proccessed) {
            throw new Error('Платеж не может быть возвращен')
        }
        this.status = PaymentStatus.Reversed
        this.updateAt = new Date()
    }
}

const payment = new Payment(1)
payment.unholdPayment()
console.log(payment);

const time = payment.getPaymentLifeTime()
console.log(time);


///GETTERS & SETTERS

class User1 {
    _login: string
    password: string

    set login(log: string) {        ///только синхронный код
        this._login = `user-${log}`
    }
    get login(): string {
        return this._login
    }

    async getPassword(p: string) { }

    // set password(p: string) {
    //     //sync
    // }
}

const user1 = new User1()
user1.login = 'Bob'
console.log(user1);
console.log(user1.login);

///IMPLEMENTATION

interface ILogger {
    log(...args): void;
    error(...args): void;
}

class Logger implements ILogger {
    log(...args: any[]): void {
        console.log(...args);
    }
    async error(...args: any[]): Promise<void> {
        //Кинуть во внешнюю систему
        console.log(...args);
    }
}

interface IPayable {
    pay(paymentId: number): void;
    price?: number;
}
interface IDeletable {
    delete(): void;
}

class User2 implements IPayable, IDeletable {
    delete(): void {
        ////
    }
    pay(paymentId: number): void {
        ////
    }
    price?: number;
}

///EXTENDS

type PaymentStatus1 = 'new' | 'paid'

class Payment1 {
    id: number;
    status: PaymentStatus1

    constructor(id: number) {
        this.id = id
    }

    pay() {
        this.status = 'paid'
    }
}

class PersistedPayment extends Payment1 {
    databaseId: number;
    paidAt: Date;

    constructor() {
        const id = Math.random() * 10
        super(id);
    }

    save() {
        ///SAVE TO BASE
    }

    override pay(date?: Date) { ////переобпределение метода родителя
        super.pay()
        if (date) this.paidAt = date
    }
}

///OSOBENNOSTI NASLEDOVANIYA

class User3 {
    name: string = 'user'

    constructor() {
        console.log(this.name);
    }
}

class Admin3 extends User3 {
    name: string = 'admin';

    constructor() {
        super()
        console.log(this.name);
    }
}

new Admin3()

class HttpError extends Error {
    code: number;
    constructor(message: string, code?: number) {
        super(message)
        this.code = code ?? 500
    }
}

console.log(new HttpError('Myerr', 555));

///COMPOSITION VS EXTENDION(INHERITANCY)
class User12 {
    name: string
    constructor(name: string) {
        this.name = name
    }
}

class Users extends Array<User12> {
    searchByName(name: string) {
        return this.filter(u => u.name === name)
    }

    override toString(): string {
        return this.reduce((res, u) => res + ' ' + u.name, '')
        return this.map(u => u.name).join(', ')
    }
}

const users = new Users()
users.push(new User12('Bob'))
users.push(new User12('Adam'))
console.log(users.toString())

class UserList {
    users: User12[]

    push(u: User12) {
        this.users.push(u)
    }
}

class Payment11 {
    date: Date
}

class UserWithPayment extends Payment11 { ///При наследовании ухужшается код за счее жесткой связи 
    name: string                          // абсолютно не связанных между собой доменов (User12 & Payment 11)
}                                         // наследование -> при одной доменной области, Error и схожие

class UserWithPayment2 {//композиция, не нарушаем объект пользователя - у каждаго класса своя область
    user: User12        // UserWithPayment2 просто агрегатор классов, нет жесткой связки (композит)    
    payment: Payment11  // импользовать, когда пересекаем доменную область и уходим в другую доменную область

    constructor(user: User12, payment: Payment11) {
        this.payment = payment
        this.user = user
    }
}


//PROPERTIES VISIBILITY
class Vehicle {

    public make: string // === make: string
    private damages: string[]
    private _model: string
    protected run: number
    #price: number

    addDamage(damage: string) {
        this.damages.push(damage)
    }

    set model(model: string) {
        this._model = model
        this.#price = 100
    }
    get model() {
        return this._model
    }

    isPriceEqual(v: Vehicle) {
        return this.#price === v.#price
    }
}

new Vehicle().make
// new Vehicle().damages && new Vehicle().run ===>>>> not visible in TS

const car = new Vehicle().addDamage('crash')
console.log(car);

class EuroTruck extends Vehicle {
    setDamage() {
        //this._model & this.damages  ===>>> not visible in TS
        //this.prise  ===>>> not visible in TS && JS!!!
    }
    setRun(km: number) {
        this.run = km / 0.62
    }
}


//STATIC PROPERTIES

class UserService {
    private static db: any

    static async getUser(id: number) {
        return this.db.findById()
    }

    create() {
        UserService.db // можно обратится к статичным методам через имя класса
    }

    static { ///(псевдо)инициализатор статичного класса, async not work
        UserService.db = 'jhvwwjb'
    }
}

UserService.getUser(12)
new UserService().create()///===> только чурез instance, 

///CONTEXT >>>>THIS<<<<

class Payment22 {
    private date: Date = new Date()

    getDate(this: Payment22) { ///только TS, подсказка для правильной работы с контекстом, далее передаются func ...args
        return this.date
    }

    getDateArrow = () => {
        return this.date
    }


}

const p = new Payment22()

const user22 = {
    id: 1,
    paymentDate: p.getDate.bind(p),
    paymentDateArrow: p.getDateArrow
}

console.log(p.getDate());
console.log(user22.paymentDate());
console.log(user22.paymentDateArrow());

class PaymentPersistent extends Payment22 {
    save() {
        return super.getDate()
    }
    saveParenArrow() {
        return this.getDateArrow()
        return super.getDateArrow()  //when inherit ===>>>>> Error , no in prototype parent arrowFunc!!!!!
    }
}

console.log(new PaymentPersistent().save());
console.log(new PaymentPersistent().saveParenArrow());


///TIPIZATION >>>>>THIS<<<
class UserBuilder {
    name: string

    setName(name: string): this { /// this помогает сослаться на текущий объект
        this.name = name
        return this
    }

    isAdmin(): this is AdminBuilder { /// ===>>>>TYPE GUARD для определения типа 
        return this instanceof AdminBuilder
    }
}

class AdminBuilder extends UserBuilder {
    roles: string[]
}

const res22 = new UserBuilder().setName('Bob')
console.log('------------');
console.log(res22);

let user33: UserBuilder | AdminBuilder = new UserBuilder()

if (user33.isAdmin()) {
    console.log('admin', user33);
} else {
    console.log('not admin', user33);
}


///ABSTRACT CLASSE
abstract class Controller { ///База для наслаивания доп функционала, без возможности создания
    abstract handle(req: any): void /// только в абстрактом Классе!!!!!

    handleWithLog(req: any) { //будет работать во всех наследниках, т.к мы обязали!! создать абстрактный метод handle()
        console.log('start');
        this.handle(req)
        console.log('end');

    }
}

class UserController extends Controller {
    handle(req: any): void { /// без метода из абст класса с такой же сигнатурой будет ругаться
        console.log('UserController>>', req);
    }

}
//new Controller()// Error? нет instance, тоько наследуемые классы
const c = new UserController()
c.handleWithLog('Request')