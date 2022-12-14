export class Parody {
    constructor(props) {
        this.props = typeof props === 'object' ? props : {}
        this.isMount = false
        this.targetNode
    }

    bindMount(selector) {
        this.isMount = true
        this.targetNode = document.querySelector(selector)
        return this
    }

    render(node) {
        if (this.isMount) {
            this.targetNode.innerHTML = ''
            this.targetNode.appendChild(node)
        }
        return node
    }
}

export function createNode(tagName, props) {
    let node = document.createElement(tagName)

    for (let name in props) {
        node[name] = props[name]
    }

    return node
}

export function ParodyDom(tag, props, ...children) {
    console.log(tag);
    console.log(props);
    console.log(children);

    // const node = document.createElement(tag)

    // children.forEach((child) => {
    //     node.appendChild(child)
    // })

    // Object.assign(node, props)


    return node
}