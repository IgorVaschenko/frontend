import { Parody } from '../parody/index.js'
import InputNumber from './input-number.js'

class Cart extends Parody {
    constructor(props) {
        super(props)

        this.state = {
            products: [
                { price: 1000, rest: 10, current: 1 },
                { price: 2000, rest: 5, current: 2 },
            ]
        }
    }

    onChange(ind, val) {
        console.log(ind);
        console.log(val + ' in parent');
        console.log(this);

        this.state.products[ind].current = val
        console.log('this.state.products[ind].current = ', this.state.products[ind].current);

        this.render()
    }

    render() {
        const div = document.createElement('div')
        this.state.products.forEach((item, i) => {
            const inp = (new InputNumber({
                min: 1,
                max: item.rest,
                value: item.current,
                change: this.onChange.bind(this, i)
            })).render()

            div.appendChild(inp)
        })
        const summary = document.createElement('div')
        summary.innerHTML = this.state.products.reduce((acc, item) => acc + item.price * item.current, 0)
        div.appendChild(summary)

        return super.render(div)
    }
}

export default Cart