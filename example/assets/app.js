document.addEventListener('DOMContentLoaded', () => {

    const $timer = document.getElementById('timer')
    const $progress = document.getElementById('slider_progress')
    const $dotNav = document.getElementById('nav__dots')
    const $pauseBtn = document.querySelector('[data-pause]')
    const $resumeBtn = document.querySelector('[data-resume]')
    const populateTimer = timeout => {
        let cpt = timeout / 1000
        $timer.innerHTML = cpt.toString()
        return window.setInterval(() => {
            cpt--
            $timer.innerHTML = cpt.toString()
        }, 1000)
    }
    const cancelTimer = timer => {
        if (timer !== null)
            window.clearInterval(timer)
    }
    const populateProgress = (progress) => {
        $progress.style.width = progress + '%'
    }

    let timer = null
    let remaining = 0
    const slider = new window.Slidr({ animate: false })
    slider
        .add({ name: 'slide1', timeout: 5 * 1000 })
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
        .add({ name: 'slide3', timeout: 5 * 1000 })
        .listen('beforeEnter', function () {
            timer = populateTimer(this.current_slide.timeout)
            remaining = this.current_slide.timeout
            $resumeBtn.classList.add('control-hidden')
            $pauseBtn.classList.remove('control-hidden')
            populateProgress(this.progress)
            $dotNav.querySelectorAll(`[data-index]:not([data-index="${this.current_slide.index}"])`).forEach(dot => dot.classList.remove('active'))
            $dotNav.querySelector(`[data-index="${this.current_slide.index}"]`).classList.add('active')
        })
        .listen('beforeLeave', function () {
            cancelTimer(timer)
        });


    slider.slides.forEach(({ index }) => {
        let dot = document.createElement('div')
        dot.classList.add('nav__dot')
        dot.dataset.index = index

        dot.addEventListener('click', e => {
            e.preventDefault()
            slider.goTo(index)
            document.querySelectorAll('.nav__dot').forEach(d => d.classList.remove('active'))
            dot.classList.add('active')
        })

        $dotNav.appendChild(dot)
    });

    document.querySelector('[data-prev]').addEventListener('click', e => {
        e.preventDefault()
        slider.prev()
    })

    document.querySelector('[data-next]').addEventListener('click', e => {
        e.preventDefault()
        slider.next()
    })

    $pauseBtn.addEventListener('click', e => {
        e.preventDefault()
        $pauseBtn.classList.add('control-hidden')
        $resumeBtn.classList.remove('control-hidden')
        cancelTimer(timer)
        timer = null
        remaining = slider.pause()
    })

    $resumeBtn.addEventListener('click', e => {
        e.preventDefault()
        $resumeBtn.classList.add('control-hidden')
        $pauseBtn.classList.remove('control-hidden')
        timer = populateTimer(remaining)
        remaining = 0
        slider.resume()
    })

    slider.run()

})