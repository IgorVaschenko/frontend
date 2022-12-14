//FACTORY PATTERN
console.log('<<<FACTORY PATTERN>>>');
interface IInsurance {//общий интерфейс
    id: number
    status: string
    setVehicle(vehicle: any): void
    submit(): Promise<boolean>
}

class TFInsurance implements IInsurance {
    id: number
    status: string
    private vehicle: any

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('',
            {
                method: 'POST',
                body: JSON.stringify({ vehicle: this.vehicle })
            })
        const data = await res.json()
        return data.isSuccess
    }
}
class ABInsurance implements IInsurance {
    id: number
    status: string
    private vehicle: any

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle
    }
    async submit(): Promise<boolean> {
        const res = await fetch('',
            {
                method: 'POST',
                body: JSON.stringify({ vehicle: this.vehicle })
            })
        const data = await res.json()
        return data.yes
    }
}

abstract class InsuranceFactory {
    db: any = { save() { } }

    abstract createInsurance(): IInsurance

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

class ABInsuranceFactory extends InsuranceFactory {
    createInsurance(): ABInsurance {
        return new ABInsurance()
    }
}
class TFInsuranceFactory extends InsuranceFactory {
    createInsurance(): TFInsurance {
        return new TFInsurance()
    }
}
//
const tfInsuranceFactory = new TFInsuranceFactory()
const ins = tfInsuranceFactory.createInsurance()
tfInsuranceFactory.saveHistory(ins) //from abstract InsuranceFactory

//variant 2 --> more compact

const INSURANCE_TYPE = {
    tf: TFInsurance,
    ab: ABInsurance
}

type IT = typeof INSURANCE_TYPE

class InsuranceFactoryAltern {
    db: any

    createInsurance<T extends keyof IT>(type: T): IT[T] {
        return INSURANCE_TYPE[type]
    }

    saveHistory(ins: IInsurance) {
        this.db.save(ins.id, ins.status)
    }
}

const insuranceFactoryAltern = new InsuranceFactoryAltern()
const ins2 = new (insuranceFactoryAltern.createInsurance('tf'))


//SINGLETON PATTERN
console.log('<<<SINGLETON PATTERN>>>');
class MyMap {

    private static instance: MyMap

    map: Map<number, string> = new Map()

    private constructor() { }

    clean() {
        this.map = new Map()
    }

    public static get(): MyMap {
        if (!MyMap.instance) {
            MyMap.instance = new MyMap()
        }
        return MyMap.instance
    }
}

class Service1 {
    addMap(key: number, value: string) {
        const myMap = MyMap.get()
        myMap.map.set(key, value)
    }
}
class Service2 {
    getKeys(key: number) {
        const myMap = MyMap.get()
        console.log(myMap.map.get(key));
        myMap.clean()
        console.log(myMap.map.get(key));
    }
}

new Service1().addMap(1, 'It works!')
new Service2().getKeys(1)


//PROTOTYPE  PATTERN
console.log('<<<PROTOTYPE  PATTERN>>>');
interface Prototype<T> {
    clone(): T
}

class UserHistory implements Prototype<UserHistory>{
    createdAt: Date

    constructor(public email: string, public name: string) {
        this.createdAt = new Date()
    }

    clone(): UserHistory {
        let target = new UserHistory(this.email, this.name)
        target.createdAt = this.createdAt
        return target
    }
}

let userH = new UserHistory('a@a.ru', 'Bob')
console.log(userH);
let userH2 = userH.clone()
console.log(userH2);

//BUILDER  PATTERN
console.log('<<<BUILDER  PATTERN>>>');
enum ImageFormat {
    Png = 'png',
    Jpeg = 'jpeg'
}

interface IResolution {
    width: number
    height: number
}

interface IImageConversion extends IResolution {
    format: ImageFormat;
}

class ImageBuilder {
    private formats: ImageFormat[] = []
    private resolutions: IResolution[] = []

    addPng() {
        if (this.formats.includes(ImageFormat.Png)) {
            return this
        }
        this.formats.push(ImageFormat.Png)
        return this
    }
    addJpeg() {
        if (this.formats.includes(ImageFormat.Jpeg)) {
            return this
        }
        this.formats.push(ImageFormat.Jpeg)
        return this
    }
    addResolution(width: number, height: number) {
        this.resolutions.push({ width, height })
        return this
    }

    build(): IImageConversion[] {
        const res: IImageConversion[] = []
        for (const r of this.resolutions) {
            for (const f of this.formats) {
                res.push({
                    format: f,
                    width: r.width,
                    height: r.height
                })
            }
        }
        return res
    }
}

console.log(new ImageBuilder()
    .addJpeg()
    .addPng()
    .addResolution(100, 50)
    .addResolution(200, 100)
    .build()
);
