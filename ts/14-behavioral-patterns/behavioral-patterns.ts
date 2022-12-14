//CHAIN COMMAND

interface IMiddleware {
    next(mid: IMiddleware): IMiddleware
    handle(request: any): any
}

abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware: IMiddleware

    public next(mid: IMiddleware): IMiddleware {
        this.nextMiddleware = mid
        return mid
    }

    handle(request: any) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request)
        }
        return
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('AuthMiddleware');
        if (request.userId === 1) {
            return super.handle(request)
        }
        return { error: 'You are not auth' }
    }
}
class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('ValidateMiddleware');
        if (request.body) {
            return super.handle(request)
        }
        return { error: 'This is haven`t a body' }
    }
}
class Controller extends AbstractMiddleware {
    override handle(request: any) {
        console.log('Controller');
        return { success: request }
    }
}

const auth = new AuthMiddleware()
const validate = new ValidateMiddleware()
const controller = new Controller()

auth.next(validate).next(controller)

console.log(auth.handle({ userId: 2 }));
console.log(auth.handle({ userId: 1 }));
console.log(auth.handle({ userId: 1, body: 'UserBody' }));

//MEDIATOR

interface Mediator {
    notify(sender: string, event: string): void
}

abstract class Mediated {
    mediator: Mediator
    setMediator(mediator: Mediator) {
        this.mediator = mediator
    }
}

class Notifications {
    send() {
        console.log('Sending notification');
    }
}

class Log {
    log(message: string) {
        console.log(message)
    }
}

class EventHandler extends Mediated {
    myEvent() {
        this.mediator.notify('EventHandler', 'myEvent')
    }
}

class NotificationMediator implements Mediator {
    constructor(
        public notifications: Notifications,
        public logger: Log,
        public handler: EventHandler
    ) { }

    notify(sender: string, event: string): void {
        switch (event) {
            case 'myEvent':
                this.notifications.send()
                this.logger.log('Sended')
                break
        }
    }
}

const handler = new EventHandler()
const logger = new Log()
const notification = new Notifications()

const m = new NotificationMediator(
    notification,
    logger,
    handler
)

handler.setMediator(m)
handler.myEvent()

//COMMAND

class User {
    constructor(public userId: number) { }
}
class CommandHistory {
    public commands: Command[] = []
    push(command: Command) {
        this.commands.push(command)
    }
    remove(command: Command) {
        this.commands = this.commands.filter(c => c.commandId !== command.commandId)
    }
}

abstract class Command {
    public commandId: number

    abstract execute(): void

    constructor(public history: CommandHistory) {
        this.commandId = Math.random() * 10
    }
}

class AddUserCommand extends Command {
    constructor(
        private user: User,
        private receiver: UserService,
        history: CommandHistory
    ) {
        super(history)
    }
    execute(): void {
        this.receiver.saveUser(this.user)
        this.history.push(this)
    }

    undo() {
        this.receiver.deleteUser(this.user.userId)
        this.history.remove(this)
    }

}

class UserService {
    saveUser(user: User) {
        console.log(`Save user with id ${user.userId}`);
    }
    deleteUser(userId: number) {
        console.log(`Delete user with id ${userId}`);
    }
}

class ControllerUs {
    receiver: UserService
    history: CommandHistory = new CommandHistory

    addReceiver(receiver: UserService) {
        this.receiver = receiver
    }

    run() {
        const addUserCommand = new AddUserCommand(
            new User(1),
            this.receiver,
            this.history,
        )
        addUserCommand.execute()
        console.log(addUserCommand.history);
        addUserCommand.undo()
        console.log(addUserCommand.history);
    }
}

const controler = new ControllerUs()
controler.addReceiver(new UserService())
controler.run()

//STATE

class DocumentItem {
    public text: string
    private state: DocumentItemState

    constructor() {
        this.setState(new DraftDocumentItemState())
    }

    getState() {
        return this.state
    }
    setState(state: DocumentItemState) {
        this.state = state
        this.state.setContext(this)
    }

    publishDoc() {
        this.state.publish()
    }

    deleteDoc() {
        this.state.delete()
    }
}

abstract class DocumentItemState {
    public name: string
    public item: DocumentItem

    public setContext(item: DocumentItem) {
        this.item = item
    }

    public abstract publish(): void;
    public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {

    constructor() {
        super()
        this.name = 'DraftDocument'
    }

    public publish(): void {
        console.log(`Sented text ${this.item.text}`);
        this.item.setState(new PublishDocumentItemState())
    }
    public delete(): void {
        console.log(`Document is deleteted`);
    }
}
class PublishDocumentItemState extends DocumentItemState {

    constructor() {
        super()
        this.name = 'PublishDocument'
    }

    public publish(): void {
        console.log(`Document is published, forbidden publish is already published document`);
    }
    public delete(): void {
        console.log(`Removed from publication`);
        this.item.setState(new DraftDocumentItemState())
    }
}

const item = new DocumentItem()
item.text = 'My post'
console.log(item.getState());
item.publishDoc()
console.log(item.getState());
item.publishDoc()
console.log(item.getState());
item.deleteDoc()
console.log(item.getState());


//STRATEGY

class User1 {
    githubToken: string
    jwtToken: string
}

interface AuthStrategy {
    auth(user: User1): boolean
}

class Auth {
    constructor(private strategy: AuthStrategy) { }

    setStrategy(strategy: AuthStrategy) {
        this.strategy = strategy
    }

    public authUser(user: User1): boolean {
        return this.strategy.auth(user)
    }
}

class JWTStrategy implements AuthStrategy {
    auth(user: User1): boolean {
        if (user.jwtToken) {
            //heavy logics
            return true
        }
        return false
    }
}
class GithubStrategy implements AuthStrategy {
    auth(user: User1): boolean {
        if (user.githubToken) {
            //heavy logics
            return true
        }
        return false
    }
}

const user1 = new User1()
user1.jwtToken = 'token'
const auth1 = new Auth(new JWTStrategy())
console.log(auth1.authUser(user1));
auth1.setStrategy(new GithubStrategy())
console.log(auth1.authUser(user1));


//ITERATOR

class Task {
    constructor(public priority: number) { }
}

class TaskList {
    private tasks: Task[] = []

    public sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => a.priority - b.priority)
    }

    public addTask(task: Task) {
        this.tasks.push(task)
    }

    public getTasks() {
        return this.tasks
    }
    public count() {
        return this.tasks.length
    }
    public getIterator() {
        return new PriorityTaskIterator(this)
    }
}

interface IIterator<T> {
    current(): T | undefined
    next(): T | undefined
    prev(): T | undefined
    index(): number
}

class PriorityTaskIterator implements IIterator<Task>{
    private position: number = 0
    private taskList: TaskList


    constructor(taskList: TaskList) {
        //prioritet
        taskList.sortByPriority()
        this.taskList = taskList
    }

    current(): Task | undefined {
        return this.taskList.getTasks()[this.position]
    }
    next(): Task | undefined {
        this.position += 1
        return this.taskList.getTasks()[this.position]
    }
    prev(): Task | undefined {
        this.position -= 1
        return this.taskList.getTasks()[this.position]
    }
    index(): number {
        return this.position
    }

}

const taskList = new TaskList()
taskList.addTask(new Task(8))
taskList.addTask(new Task(1))
taskList.addTask(new Task(4))

const iterator = taskList.getIterator()

console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());


///TEMLATE METHOD 

class Form {
    constructor(public name: string) { }
}

abstract class SaveForm<T>{
    public save(form: Form) {
        const res = this.fill(form)
        this.log(res)
        this.send(res)
    }

    protected abstract fill(form: Form): T
    protected log(data: T): void {
        console.log(data);

    }
    protected abstract send(data: T): void
}

class FirstAPI extends SaveForm<string> {
    protected fill(form: Form): string {
        return form.name
    }
    protected send(data: string): void {
        console.log(`Sending ${data}`);
    }
}
class SecondAPI extends SaveForm<{ fio: string }> {
    protected fill(form: Form): { fio: string } {
        return { fio: form.name }
    }
    protected send(data: { fio: string }): void {
        console.log(`Sending ${data}`);
        console.log(`Sending ${data.fio}`);
    }
}

const form1 = new FirstAPI()
form1.save(new Form('Bob'))
const form2 = new SecondAPI()
form2.save(new Form('Bobby'))

//OBSERVER

interface Observer {
    update(subject: Subject): void
}

interface Subject {
    attach(observer: Observer): void
    detach(observer: Observer): void
    notify(): void
}

class Lead {
    constructor(public name: string, public phone: string) { }
}

class NewLead implements Subject {
    private observers: Observer[] = []
    public state: Lead

    attach(observer: Observer): void {
        if (this.observers.includes(observer)) {
            return
        }
        this.observers.push(observer)
    }
    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer)
        if (observerIndex === -1) {
            return
        }
        this.observers.splice(observerIndex, 1)
    }
    notify(): void {
        for (const observer of this.observers) {
            observer.update(this)
        }
    }
}

class NotificationService implements Observer {
    update(subject: Subject): void {
        console.log('NotificationService getted notification');
        console.log(subject);
    }
}
class LeadService implements Observer {
    update(subject: Subject): void {
        console.log('LeadService getted notification');
        console.log(subject);
    }
}

const subject = new NewLead()
subject.state = new Lead('Anton', '123456789')
const s1 = new NotificationService()
const s2 = new LeadService()

subject.attach(s1)
subject.attach(s2)

subject.notify()
subject.detach(s1)
subject.notify()