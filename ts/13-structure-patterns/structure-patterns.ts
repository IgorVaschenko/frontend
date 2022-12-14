//BRINGE
console.log('<<<BRINGE>>>');
interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
}

class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect(config: string): void {
        console.log(config);
    }
    disconnect(): void {
        console.log('disconnect tg');
    }
}
class WhatsUpProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect(config: string): void {
        console.log(config);
    }
    disconnect(): void {
        console.log('disconnect whatsapp');
    }
}

class NotificationSender {
    constructor(private provider: IProvider) { }

    send() {
        this.provider.connect('connect')
        this.provider.sendMessage('message')
        this.provider.disconnect()
    }
}
class DelayNotificationSender extends NotificationSender {
    constructor(provider: IProvider) {
        super(provider)
    }

    sendDelay() { }
}

const sender = new NotificationSender(new TelegramProvider())
sender.send()
const sender2 = new NotificationSender(new WhatsUpProvider())
sender2.send()

//FACADE
console.log('<<<FACADE>>>');
class Notify {
    send(template: string, to: string) {
        console.log(`Send ${template} : ${to}`);
    }
}
class Log {
    log(message: string) {
        console.log(message);
    }
}
class Template {
    private templates = [
        { name: 'other', template: '<h1>Template</h1>' }
    ]

    getByName(name: string) {
        return this.templates.find(t => t.name === name)
    }
}

class NotificationFacade {
    private notify: Notify
    private log: Log
    private template: Template

    constructor() {
        this.notify = new Notify()
        this.log = new Log()
        this.template = new Template()
    }

    send(to: string, templateMame: string) {
        const data = this.template.getByName(templateMame)
        if (!data) {
            this.log.log('Template isn`t found')
            return
        }
        this.notify.send(data.template, to)
        this.log.log('Template is sended')
    }
}

const s = new NotificationFacade()
s.send('a@a.ru', 'other')

//ADAPTER PATTERN
console.log('<<<ADAPTER PATTERN>>>');
class KVDatabase {
    private db: Map<string, string> = new Map()
    save(key: string, value: string) {
        this.db.set(key, value)
    }
}

class PersistantDB {
    savePersistent(data: Object) {
        console.log(data);
    }
}
class PersistantDBAdapter extends KVDatabase {
    constructor(public database: PersistantDB) {
        super()
    }

    override save(key: string, value: string): void {
        this.database.savePersistent({ key, value })
    }
}

function run(base: KVDatabase) {
    base.save('key', 'dataValue')
}

run(new PersistantDBAdapter(new PersistantDB))

//PROXY         
console.log('<<<PROXY>>>');
interface IPaymentAPI {
    getPaymentDetail(id: number): IPaymentDetail | undefined
}

interface IPaymentDetail {
    id: number
    sum: number
}

class PaymentAPI implements IPaymentAPI {
    private data = [{ id: 1, sum: 1000 }]
    getPaymentDetail(id: number): IPaymentDetail | undefined {
        return this.data.find(d => d.id === id)
    }
}

class PaymentAccessProxy implements IPaymentAPI {
    constructor(private api: PaymentAPI, private userId: number) { }
    getPaymentDetail(id: number): IPaymentDetail | undefined {
        if (this.userId === 1) {
            return this.api.getPaymentDetail(id)
        }
        console.log('Unauthorized access');
        return undefined
    }
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 1)
console.log(proxy.getPaymentDetail(1));
const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2)
console.log(proxy2.getPaymentDetail(2));

//COMPOSITE
console.log('<<<COMPOSITE>>>');

abstract class DeliveryItem {
    items: DeliveryItem[] = []

    addItem(item: DeliveryItem) {
        this.items.push(item)
    }

    getItemPrice(): number {
        return this.items.reduce((acc: number, item: DeliveryItem) => acc += item.getPrice(), 0)
    }

    abstract getPrice(): number
}

class DeliveryShop extends DeliveryItem {
    constructor(private deliveryFee: number) {
        super()
    }

    getPrice(): number {
        return this.getItemPrice() + this.deliveryFee
    }
}

class Package extends DeliveryItem {
    getPrice(): number {
        return this.getItemPrice()
    }

}

class Prod extends DeliveryItem {
    constructor(private price: number) {
        super()
    }
    getPrice(): number {
        return this.price
    }
}

const shop = new DeliveryShop(100)
shop.addItem(new Prod(1000))

const pack1 = new Package()
pack1.addItem(new Prod(200))
pack1.addItem(new Prod(300))
shop.addItem(pack1)

const pack2 = new Package()
pack2.addItem(new Prod(30))
shop.addItem(pack2)

console.log(shop.getPrice());
