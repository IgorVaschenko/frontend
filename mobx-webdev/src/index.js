/*******LESSON_8_USER_REACTIONS*******/
import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, configure, action, when, autorun } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
  @observable count = 0;
  @action increment() { this.count++ };
  @action decrement() { this.count-- };
};

const appStore = new Store();

when(
  () => appStore.count > 5,
  () => { alert('Count value is more than 5') }
);

autorun(() => {
  alert(`Count value is: ${appStore.count}`);
}, {
  name: 'Custom autorun',
  delay: 3000,
})

@observer class App extends Component {
  handleIncrement = () => { this.props.store.increment() }
  handleDecrement = () => { this.props.store.decrement() }
  render() {
    return (
      <div>
        <DevTools />
        <h1>{this.props.store.count}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    )
  }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));


/*******LESSON_6_ASYNC_REQUEST*******/

// import './index.css';
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { observable, computed, configure, action, decorate, runInAction } from 'mobx';
// import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';
// configure({ enforceActions: 'observed' });

// class Store {
//   user = null;

//   getUser() {
//     console.log('click');
//     fetch('https://randomuser.me/api/')
//       .then((resp) => resp.json())
//       .then((json) => {
//         if (json.results) {
//           // this.user = json.results[0] // ошибка т.к изменяем state напрямую 
//           // this.setUser(json.results) // способ 1 = изменение state через action 
//           runInAction(() => {
//             this.user = json.results[0]
//           }) // способ 2 = изменение state через функцию  runInAction
//         }
//       })
//   }

//   setUser(results) {
//     this.user = results[0]
//   }
// };

// decorate(Store, {
//   user: observable,
//   getUser: action.bound, //чтобы контекст не терять
//   setUser: action
// })

// const appStore = new Store();

// @observer
// class App extends Component {
//   render() {

//     const { store } = this.props

//     return (
//       <div>
//         <DevTools />
//         <button onClick={store.getUser}>Get User</button>
//         <h1>{store.user ? store.user.login.username : `Default name`}</h1>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App store={appStore} />, document.getElementById('root'));

/*******LESSON_5_REPEAT(APP)*******/

// import './index.css';
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { observable, computed, configure, action, decorate } from 'mobx';
// import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';
// configure({ enforceActions: 'observed' });

// class Store {
//   devsList = [
//     { name: "Jack", sp: 12 },
//     { name: "Max", sp: 10 },
//     { name: "Leo", sp: 8 },
//   ];

//   filter = ''

//   get totalSum() {
//     return this.devsList.reduce((acc, { sp }) => acc + sp, 0)
//   };

//   get topPerformer() {
//     const maxSp = Math.max(...this.devsList.map(({ sp }) => sp))
//     return this.devsList.find(({ sp, name }) => maxSp === sp && name)
//   };

//   get filteredDevelopers() {
//     const matchesFilter = new RegExp(this.filter, 'i')
//     return this.devsList.filter(({ name }) => !this.filter || matchesFilter.test(name))
//   };

//   clearList() {
//     this.devsList = []
//   };

//   addDeveloper(dev) {
//     this.devsList.push(dev)
//   };

//   updateFilter(val) {
//     this.filter = val
//   };
// };

// decorate(Store, {
//   devsList: observable,
//   filter: observable,
//   totalSum: computed,
//   topPerformer: computed,
//   clearList: action,
//   addDeveloper: action,
//   updateFilter: action,
// })

// const appStore = new Store();

// const Row = ({ data: { name, sp } }) => {
//   return (
//     <tr>
//       <td>{name}</td>
//       <td>{sp}</td>
//     </tr>
//   );
// };

// @observer
// class Table extends Component {
//   render() {
//     const { store } = this.props;

//     return (
//       <table>
//         <thead>
//           <tr>
//             <td>Name:</td>
//             <td>SP:</td>
//           </tr>
//         </thead>
//         <tbody>
//           {store.filteredDevelopers.map((dev, i) => <Row key={i} data={dev} />)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td>Team SP:</td>
//             <td>{store.totalSum}</td>
//           </tr>
//           <tr>
//             <td>Top Performer:</td>
//             <td>{store.topPerformer ? store.topPerformer.name : ''}</td>
//           </tr>
//         </tfoot>
//       </table>
//     );
//   }
// }

// @observer
// class Controls extends Component {
//   addDeveloper = () => {
//     const name = prompt("The name:");
//     const sp = parseInt(prompt("The story points:"), 10);
//     this.props.store.addDeveloper({ name, sp });
//   }

//   clearList = () => { this.props.store.clearList(); }

//   filterDevelopers = ({ target: { value } }) => this.props.store.updateFilter(value)

//   render() {
//     return (
//       <div className="controls">
//         <button onClick={this.clearList}>Clear table</button>
//         <button onClick={this.addDeveloper}>Add record</button>
//         <input value={this.props.store.filter} onChange={this.filterDevelopers} />
//       </div>
//     );
//   }
// }

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <DevTools />
//         <h1>Sprint Board:</h1>
//         <Controls store={appStore} />
//         <Table store={appStore} />
//       </div>
//     )
//   }
// }

// ReactDOM.render(<App store={Store} />, document.getElementById('root'));

/*******LESSON_4_ДЕЙСТВИЯ(ACTIONS)*******/
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import * as serviceWorker from './serviceWorker'
// import DevTools from 'mobx-react-devtools'
// import { observable, computed, extendObservable, configure, action } from 'mobx'
// import { observer } from 'mobx-react'

// configure({ enforceActions: 'observed' })

// const nickName = observable({ ///можем создать объект , где описать все наблюдаемые свойства и все методы для изменнения этого объекта, обернув его в observable
//   firstName: 'Bob',
//   age: 30,

//   get nickName() { //вычичляемые свойства через геттер и computed
//     console.log('Generate nickName!');
//     return `${this.firstName}${this.age}`
//   },
//   increment() { this.age++ },
//   decrement() { this.age-- }
// }, {
//   increment: action('Plus one'), //можно сделать ИМЕННОВАННЫЕ actions
//   decrement: action //можно оставить action без имени
// }, {
//   name: 'nickNameObservableObject'//можно сделать ИМЕННОВАННЫЙ наблюдаемый объект
// })

// const todos = observable([
//   { text: 'Learn React' },
//   { text: 'Learn MobX' }
// ])

// @observer class Counter extends Component { //используем значение из созданного store

//   handleIncremenr = () => this.props.store.increment()
//   handleDecremenr = () => this.props.store.decrement()

//   render() {
//     return (
//       <div className='App'>
//         <DevTools />
//         <h1>{this.props.store.nickName}</h1>
//         <h2>{this.props.store.age}</h2>
//         <button onClick={this.handleIncremenr}>+1</button>
//         <button onClick={this.handleDecremenr}>-1</button>

//         <ul>
//           {todos.map((item) => (
//             <li key={item.text}>{item.text}</li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Counter store={nickName} />, document.querySelector('#root'))


// serviceWorker.unregister()
 
/*******LESSON_3_НАБЛЮДАЕМЫЙ_ОБЪЕКТ(OBSERVABLE_OBJECT/OBSERVABLE_ARRAY)*******/

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import * as serviceWorker from './serviceWorker'
// import DevTools from 'mobx-react-devtools'
// import { observable, computed, extendObservable } from 'mobx'
// import { observer } from 'mobx-react'


// const nickName = observable({ ///можем создать объект , где описать все наблюдаемые свойства и все методы для изменнения этого объекта, обернув его в observable
//   firstName: 'Bob',
//   age: 30,

//   get nickName() { //вычичляемые свойства через геттер и computed
//     console.log('Generate nickName!');
//     return `${this.firstName}${this.age}`
//   },
//   increment() { this.age++ },
//   decrement() { this.age-- }
// })

// const todos = observable([
//   { text: 'Learn React' },
//   { text: 'Learn MobX' }
// ])
// // const nickName = new class UserNickName {
// //   constructor() {
// //     extendObservable(this, { ///функция для наблюдения за вычисляемыми свойствами
// //       firstName: 'Bob',
// //       age: 30
// //     })
// //   }
// //   @computed get nickName() { //вычичляемые сыойства через геттер и computed
// //     console.log('Generate nickName!');
// //     return `${this.firstName}${this.age}`
// //   }
// // }

// // nickName.increment = function () {
// //   this.age++
// // }
// // nickName.decrement = function () {
// //   this.age--
// // }

// @observer class Counter extends Component { //используем значение из созданного store

//   handleIncremenr = () => this.props.store.increment()
//   handleDecremenr = () => this.props.store.decrement()

//   render() {
//     return (
//       <div className='App'>
//         <DevTools />
//         <h1>{this.props.store.nickName}</h1>
//         <h2>{this.props.store.age}</h2>
//         <button onClick={this.handleIncremenr}>+1</button>
//         <button onClick={this.handleDecremenr}>-1</button>

//         <ul>
//           {todos.map((item) => (
//             <li key={item.text}>{item.text}</li>
//           ))}
//         </ul>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Counter store={nickName} />, document.querySelector('#root'))

// todos.push({ text: 'Learn Redux' })//проверка, добавление элемента после рендера, если убрать обертку observable у todos, будут только дефолтные значения

// serviceWorker.unregister()


/*******LESSON_2_ВЫЧИСЛЯЕМЫЕ_ЗНАЧЕНИЯ*******/

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import * as serviceWorker from './serviceWorker'
// import DevTools from 'mobx-react-devtools'
// import { observable, computed } from 'mobx'
// import { observer } from 'mobx-react'


// const nickName = new class UserNickName {
//   @observable firstName = 'Bob'
//   @observable age = 30

//   @computed get nickName() { //вычичляемые сыойства через геттер и computed
//     console.log('Generate nickName!');
//     return `${this.firstName}${this.age}`
//   }
// }

// nickName.increment = function () {
//   this.age++
// }
// nickName.decrement = function () {
//   this.age--
// }

// @observer class Counter extends Component { //используем значение из созданного store

//   handleIncremenr = () => this.props.store.increment()
//   handleDecremenr = () => this.props.store.decrement()

//   render() {
//     return (
//       <div className='App'>
//         <DevTools />
//         <h1>{this.props.store.nickName}</h1>
//         <h2>{this.props.store.age}</h2>
//         <button onClick={this.handleIncremenr}>+1</button>
//         <button onClick={this.handleDecremenr}>-1</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Counter store={nickName} />, document.querySelector('#root'))

// serviceWorker.unregister()


/*******LESSON_1_НАБЛЮДАЕМЫЙ_STATE*******/

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import * as serviceWorker from './serviceWorker'
// import DevTools from 'mobx-react-devtools'
// import { observable } from 'mobx'
// import { observer } from 'mobx-react'


// const counterState = observable({ ///альтернатива декоратору - функция
//   count: 0
// })

// counterState.increment = function () {
//   this.count++
// }
// counterState.decrement = function () {
//   this.count--
// }

// @observer class Counter extends Component { //используем значение из созданного store

//   handleIncremenr = () => this.props.store.increment()
//   handleDecremenr = () => this.props.store.decrement()

//   render() {
//     return (
//       <div className='App'>
//         <DevTools />
//         <h1>{this.props.store.count}</h1>
//         <button onClick={this.handleIncremenr}>+1</button>
//         <button onClick={this.handleDecremenr}>-1</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Counter store={counterState} />, document.querySelector('#root'))

// serviceWorker.unregister()




// @observer class Counter extends Component {

//   @observable count = 0

//   handleIncremenr = () => this.count++
//   handleDecremenr = () => this.count--

//   render() {
//     return (
//       <div className='App'>
//         <DevTools />
//         <h1>{this.count}</h1>
//         <button onClick={this.handleIncremenr}>+1</button>
//         <button onClick={this.handleDecremenr}>-1</button>
//       </div>
//     )
//   }
// }

// ReactDOM.render(<Counter />, document.querySelector('#root'))

// serviceWorker.unregister()