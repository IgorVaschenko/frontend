//PATTERN DECORATOR 
console.log('<<<PATTERN DECORATOR>>>');

interface IUserService {
    users: number;
    getUsersInDatabase(): number
}

class UserService implements IUserService {
    users: number = 1000

    getUsersInDatabase(): number {
        return this.users
    }
}

function nullUser(obj: IUserService) { //decorator
    obj.users = 0
    return obj
}
function logUsers(obj: IUserService) {//decorator
    console.log('Users: ' + obj.users);
    return obj
}
console.log('1 - ', new UserService().getUsersInDatabase());
console.log('2 - ', nullUser(new UserService()).getUsersInDatabase());    //декоратор  - функция, оборащивающая класс и добавл функционал
console.log('3 - ', logUsers(nullUser(new UserService())).getUsersInDatabase());//несколько декораторов работают наружу (снизу вверх)
console.log('4 - ', nullUser(logUsers(new UserService())).getUsersInDatabase());

//CLASS DECORATOR 
console.log('<<<CLASS DECORATOR>>>');

@nullUser1
@threeUserAdvanced
class UserService1 implements IUserService {
    // users: number  // in nullUser1
    users: number = 1000

    getUsersInDatabase(): number {
        return this.users
    }
}

function nullUser1(target: Function) { //decorator работает ДО инициализации свойств и методов класса
    target.prototype.users = 0
}
function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) { //decorator работает ПОСЛЕ инициализации свойств и методов класса,
    return class extends constructor {                                              // Т.К оборачиваем в анонимный класс
        users = 3
    }
}

console.log('5 - ', new UserService1().getUsersInDatabase());


//DECORATORS FACTORY
console.log('<<<DECORATORS FACTORY>>>');

@setUsers(2)   // инициализация --->>>> сверху - вниз
@log()        //  выполнение --->>>> снизу - вверх
// @setUserAdvanced(4)
class UserService2 implements IUserService {
    users: number

    getUsersInDatabase(): number {
        return this.users
    }
}

function setUsers(users: number) {//factory decorator работает ПОСЛЕ инициализации свойств и методов класса,
    console.log('*setUsers init');
    return (target: Function) => {
        console.log('*setUsers run');
        target.prototype.users = users
    }
}
function log() {//factory decorator работает ПОСЛЕ инициализации свойств и методов класса,
    console.log('*log init');
    return (target: Function) => {
        console.log('*log run');
    }
}
function setUserAdvanced(users: number) {//factory decorator работает ПОСЛЕ инициализации свойств и методов класса,
    console.log('*setUserAdvanced');
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            users = users
        }
    }
}
console.log('6 - ', new UserService2().getUsersInDatabase());


//DECORATOR METHODS
console.log('<<<DECORATOR METHODS>>>');

class UserService3 implements IUserService {
    users: number

    @Log
    getUsersInDatabase(): number {
        throw new Error('DECORATOR METHODS ERROR')
    }
}

function Log(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
): TypedPropertyDescriptor<(...args: any[]) => any> | void {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);

    // descriptor.value = () => {
    //     console.log('DECORATOR METHODS <<<<WITHOUT>>>>> ERROR');
    // }

    //OR

    return {
        writable: true,
        enumerable: true,
        configurable: true,
        value: () => {
            console.log('DECORATOR METHODS <<<<WITHOUT>>>>> ERROR');
        }
    }
}
console.log(new UserService3().getUsersInDatabase());

//DECORATOR PROPS
console.log('<<<DECORATOR PROPS>>>');

class UserService4 implements IUserService {
    @Max(100)
    // users: number = 1000 будует ругаться на 1000, т.к лимит 100
    users: number

    getUsersInDatabase(): number {
        return 1
    }
}

function Max(max: number) {
    return (
        target: Object,
        propertyKey: string | symbol
    ) => {
        let value: number;
        const setter = function (newValue: number) {
            if (newValue > max) {
                console.log(`Invalid value! Max posible value is ${max}`);
            } else {
                value = newValue
            }
        }
        const getter = function () {
            return value
        }
        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}
const userServ = new UserService4()
userServ.users = 1
console.log('userServ.users', userServ.users);
userServ.users = 50
console.log('userServ.users', userServ.users);
userServ.users = 1000
console.log('userServ.users', userServ.users);


//DECORATOR ACCESSOR
console.log('<<<DECORATOR ACCESSOR>>>');

class UserService5 implements IUserService {
    private _users: number

    @Log2()//можно ставить либо на сеттер либо на геттер кокретный декоратор, при этом его дейсевие распространяется на оба
    set users(num: number) {
        this._users = num
    }
    // @Log2()
    get users() {
        return this._users
    }

    getUsersInDatabase(): number {
        return 1
    }
}

function Log2() {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        const set = descriptor.set
        descriptor.set = (...args: any[]) => {
            console.log(args);
            set?.apply(target, args)
        }
    }
}

const userService = new UserService5()
userService.users = 1
console.log(userService.users);

//DECORATOR PARAMETRES
console.log('<<<DECORATOR PARAMETRES>>>');

interface IUserService2 {
    getUsersInDatabase(): number
}

class UserService6 implements IUserService2 {
    private _users: number

    getUsersInDatabase(): number {
        return this._users
    }
    setUsersInDatabase(@Positive() num: number, @Positive() num2: number): void {
        this._users = num
    }
}

function Positive() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        console.log('target: ', target);
        console.log('propertyKey: ', propertyKey);
        console.log('parameterIndex: ', parameterIndex);
    }
}

//METADATA
console.log('<<<METADATA>>>');
//https://coursehunter.net/course/typescript-s-nulya-polnyy-kurs-i-patterny-proektirovaniya?lesson=94


/////DECORATORS ORDER
console.log('<<<DECORATORS ORDER>>>');
function Uni(name: string): any {
    console.log(`Initialization: ${name}`);
    return function () {
        console.log(`Call: ${name}`);
    }
}

@Uni('Class')
class MyClass {

    @Uni('Property 1') //при одинокавых параметрах декораторов(@Uni('Property')) влияет порядок расположения в классе
    props?: any

    @Uni('Property 3')
    props3?: any

    @Uni('Property Static')
    static props2?: any

    @Uni('Method')
    method(@Uni('Parameter') _: any) { }

    @Uni('Method Static')
    static method2(@Uni('Parameter Static') _: any) { }

    constructor(@Uni('Constructor Static') _: any) { }
}

/// ПОРЯДОК
// Initialization: Property 1
// Call: Property 1
// Initialization: Property 3
// Call: Property 3
// Initialization: Method
// Initialization: Parameter
// Call: Parameter
// Call: Method
// Initialization: Property Static
// Call: Property Static
// Initialization: Method Static
// Initialization: Parameter Static
// Call: Parameter Static
// Call: Method Static
// Initialization: Class
// Initialization: Constructor Static
// Call: Constructor Static
// Call: Class