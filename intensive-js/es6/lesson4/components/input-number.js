/** @jsx ParodyDom */
import { Parody, createNode, ParodyDom } from '../parody/index.js'

export default class InputNumber extends Parody {
    constructor(props) {
        super(props)

        this.inChange = ('change' in props) ? props.change : () => { }
    }

    _normalizeValue(val) {
        let newValue = parseInt(val)
        if (isNaN(newValue) || newValue < this.props.min) {
            newValue = this.props.min
        } else if (newValue > this.props.max) {
            newValue = this.props.max
        }
        this.inChange(newValue);
    }

    render() {
        return super.render(
            <div className="">
                <input type="button" value="-" className="inputNumber_min" />
            </div>
        )


        const min = createNode('input', {
            type: 'button',
            value: '-',
            onclick: () => {
                this._normalizeValue(this.props.value - 1)
                console.log('click min')
            },
            className: 'inputNumber_min'
        })
        const max = createNode('input', {
            type: 'button',
            value: '+',
            onclick: () => {
                this._normalizeValue(this.props.value + 1)
                console.log('click max')
            },
            className: 'inputNumber_max'
        })
        // const min = document.createElement('input')
        // min.setAttribute('type', 'button')
        // min.value = '-'
        // min.addEventListener('click', () => {
        //     this._normalizeValue(this.props.value - 1)
        //     console.log('click min')
        // })

        // const max = document.createElement('input')
        // max.setAttribute('type', 'button')
        // max.value = '+'
        // max.addEventListener('click', () => {
        //     this._normalizeValue(this.props.value + 1)
        //     console.log('click max')
        // })

        const num = document.createElement('input')
        num.className = 'inputNumber_value'
        num.setAttribute('type', 'text')
        num.value = this.props.value
        num.addEventListener('change', (e) => {
            this._normalizeValue(e.target.value)
        })

        const container = document.createElement('div')
        container.appendChild(min)
        container.appendChild(num)
        container.appendChild(max)

        // return super.render(container)

    }
}