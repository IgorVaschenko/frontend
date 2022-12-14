//ВСТРОЕННЫЕ GENERICS
const num: Array<number> = [1, 2, 3]

async function test() {
    const a = await new Promise<number>((resolve, reject) => {
        resolve(1)
    })
}

const check: Record<string, boolean> = {
    drive: true,
    kpp: false,
}

//FUNCTION WITH GENERIC
function logMiddleWare<T>(data: T): T {
    console.log(data);
    return data
}

const res44 = logMiddleWare<string>('10')
const res444 = logMiddleWare<number>(10)

function splitHalf<T>(data: Array<T>): Array<T> {
    const l = data.length / 2
    return data.splice(0, l)
}
splitHalf([1, 2, 3]); /*===**/splitHalf<number>([1, 2, 3])
splitHalf(['1', '2', '3']); /*===**/splitHalf<string>(['1', '2', '3'])
splitHalf([!!'1', !!'2', !!'3']); /*===**/splitHalf<boolean>([!!'1', !!'2', !!'3'])


//USE GENERIC IN TYPES

const split: <T>(data: Array<T>) => Array<T> = splitHalf
const split2: <Y>(data: Array<Y>) => Array<Y> = splitHalf

interface ILogLine<T> {
    timeStamp: Date;
    data: T
}

type LogLineType<T> = {
    timeStamp: Date;
    data: T
}

const logLine: ILogLine<{ a: 1 }> = {// ILogLine || LogLineType
    timeStamp: new Date(),
    data: {
        a: 1
    }
}

// ОГРАНИЧЕНИЯ

class Vehicle {
    run: number
}

class LCV extends Vehicle {
    capacity: number
}

function kmToMiles<T extends Vehicle>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.62
    return vehicle
}

const vehicle = kmToMiles(new Vehicle())
const lcv = kmToMiles(new LCV())
kmToMiles({ run: 1 })//подойдет, тк есть тоже свойство

function logId<T extends string | number, Y>(id: T, additionalData: Y): { id: T, data: Y } { //можно ограничить ДАЖЕ примитивами!
    console.log(id);
    console.log(additionalData);
    return { id, data: additionalData }
}

console.log('<==============>');
//GENERIC CLASSES
class Res<D, E>{
    data?: D
    error?: E

    constructor(data?: D, error?: E) {
        if (data) this.data = data
        if (error) this.error = error
    }
}

const res = new Res<string, number>('data', 0);
//equal
const res2 = new Res('data', 0)
//
const res3 = new Res('data')
res.error


// class HTTPResp extends Res<D, E>{
class HTTPResp<F extends number> extends Res<string, number>{
    code: number

    setCode(code: F) {
        this.code = code
    }
}
const res4 = new HTTPResp()
res4.error

///MIXINS
type Constructor = new (...args: any[]) => {}
type GConstructor<T = {}> = new (...args: any[]) => T

class List {
    constructor(public items: string[]) { }
}
class Accordion {
    isOpened: boolean
}

type ListType = GConstructor<List>
type AccordionType = GConstructor<Accordion>

//1 - ext
class ExtendedListClass extends List {
    first() {
        return this.items[0]
    }
}
//2 mixin function
function ExtendList<TBase extends ListType & AccordionType>(Base: TBase) {
    return class ExtendList extends Base {
        first() {
            return this.items[0]
        }
    }
}

class AccordionList {  // List  +  Accordion
    isOpened: boolean
    constructor(public items: string[]) { }
}

const list = ExtendList(AccordionList)
const res33 = new list(['first', 'second'])
console.log(res33.first());
