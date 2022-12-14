window.addEventListener('load', function () {
    const timer = new Timer(this.document.querySelector('.timer'), 10)
    console.log(timer);
})

class Timer {
    constructor(el, time) {
        this.el = el
        this.time = time
        this.interval

        this.render()
        this.start()
    }

    start() {
        this.interval = setInterval(this.tick, 1000)
    }

    stop() {
        clearInterval(this.interval)
    }

    tick = () => {
        this.time--
        this.render()

        this.time <= 0 && this.stop()
    }

    render() {
        this.el.innerHTML = this.time
    }
}