document.addEventListener('DOMContentLoaded', () => {

    const $timer = document.getElementById('timer')
    const populateTimer = timeout => {
        let cpt = timeout / 1000
        $timer.innerHTML = cpt.toString()
        return window.setInterval(() => {
            cpt--
            $timer.innerHTML = cpt.toString()
        }, 1000)
    }
    let timer = null
    const slider = new window.Slidr({ animate: false })
    slider
        .add({name: 'slide1', timeout: 5 * 1000})
        .add({
            name: 'slide2',
            timeout: 7 * 1000,
            shown() {
                this.element.querySelector('.slide-title').classList.add('shake-animation')
            },
            beforeLeave() {
                this.element.querySelector('.slide-title').classList.remove('shake-animation')
            }
        })
        .add({name: 'slide3', timeout: 5 * 1000})
        .listen('beforeEnter', function () {
            timer = populateTimer(this.current_slide.timeout)
        })
        .listen('beforeLeave', function () {
            if (timer !== null) window.clearInterval(timer)
        })
        .run()

})