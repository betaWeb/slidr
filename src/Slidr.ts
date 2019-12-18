import Slide from "./Slide";
import SlideProps from "./Slide";

export type SliderOptions = {
    loops?: Number
    animate?: Boolean
    animation_class?: string
    enter_class?: string
    container?: string
}

/**
 * @class
 * @property {Object} options
 * @property {Slide[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 * @property {Number|null} _current_loop
 */
export default class Slidr {

    public options: SliderOptions
    public slides: Slide[]
    public index: number
    public loops: number
    private _events: Object
    private _current_loop?: number | null
    private _previous_slide?: Slide | null
    private _loop_start: number
    private _time_remaining: number

    /**
     * @returns {Object}
     * @public
     */
    public static get DEFAULT_OPTIONS(): SliderOptions {
        return {
            loops: Infinity,
            animate: true,
            animation_class: 'fade',
            enter_class: 'fade-in'
        }
    }

    /**
     * @returns {Slide}
     * @public
     */
    public get current_slide(): Slide {
        return this.slides[this.index]
    }

    /**
     * Returns slider progress in percent
     * 
     * @returns {Number}
     * @public
     */
    public get progress(): Number {
        if (!this.current_slide || !this.slides.length) return 0
        return ((this.current_slide.index + 1) * 100) / this.slides.length
    }

    /**
     * @constructor
     * @param {Object} options
     * @param {Number} options.loops
     * @param {Boolean} options.animate
     * @param {String} options.animation_class
     * @param {String} options.enter_class
     */
    constructor(options: SliderOptions = {}) {
        this.options = <SliderOptions>{
            ...Slidr.DEFAULT_OPTIONS,
            ...options
        }
        this.slides = []
        this.index = 0
        this.loops = 0
        this._events = {
            'beforeEnter': () => { },
            'beforeLeave': () => { },
            'loopend': () => { },
            'change': () => { }
        }
        this._current_loop = null
        this._previous_slide = null
        this._loop_start = Date.now()
        this._time_remaining = 0

        if (this.options.container && this.options.container.length)
            this._buildFromHTML()
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public add(slide_props: SlideProps): Slidr {
        const slide = new Slide(slide_props)
        let index = this.slides.push(slide)

        slide.index = index - 1

        if (this.options.animate)
            document
                .querySelector(slide.selector)
                .classList.add(this.options.animation_class)

        return this
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public run(): Slidr {
        this.stop()

        this.current_slide.active = true
        this._dispatchEvent('change')

        try {
            this._slide()
        } catch (e) {
            throw new Error(`[Err] Slidr.run :: ${e.message}`)
        }

        return this
    }

    /**
     * @param {Number} index
     * @returns {Slide|null}
     * @public
     */
    public getSlideByIndex(index: number): Slide {
        return this.slides[index] || null
    }

    /**
     * @param {String} name
     * @returns {Slide|null}
     * @public
     */
    public getSlideByName(name: String): (Slide | null) {
        return this.slides.find(slide => slide.name === name) || null
    }

    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     * @public
     */
    public listen(event_name: string, callback: Function): Slidr {
        if (!Object.keys(this._events).includes(event_name))
            throw new Error(`[Err] Slidr.listen :: Event '${event_name}' does not exists.`)

        this._events[event_name] = callback

        return this
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public prev(): Slidr {
        this._beforeSlideChange()

        if (this.index - 1 < 0)
            this.index = this.slides.length - 1
        else this.index -= 1

        return this.run()
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public next(): Slidr {
        this._beforeSlideChange()

        if (this.index + 1 > this.slides.length - 1) {
            this.index = 0
            this.loops++

            if (this.loops === this.options.loops) {
                this.stop()
                this._dispatchEvent('loopend')
                return this
            }
        } else this.index += 1

        return this.run()
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public goTo(index): Slidr {
        this._beforeSlideChange()
        this.index = this.slides[index] ? index : 0
        return this.run()
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public start(): Slidr {
        this._startTimer(this.current_slide.timeout)
        return this
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public stop(): Slidr {
        if (this._current_loop !== null) {
            window.clearTimeout(this._current_loop)
            this._current_loop = null
        }
        return this
    }

    /**
     * @returns {Number}
     * @public
     */
    public pause(): number {
        this.stop()
        this._time_remaining -= Math.round((Date.now() - this._loop_start) / 1000) * 1000
        return this._time_remaining
    }

    /**
     * @returns {Slidr}
     * @public
     */
    public resume(): Slidr {
        this._startTimer(this._time_remaining)
        return this
    }

    /**
     * @throws {Error}
     * @private
     */
    private _slide(): void {
        if (!this.current_slide)
            throw new Error('[Err] Slidr._slide :: no slide found at index ' + this.index)

        this._dispatchEvent('beforeEnter')
        this.current_slide.dispatchEvent('beforeEnter')

        if (this.options.animate && this._previous_slide !== null)
            this._previous_slide.element.classList.remove(this.options.enter_class)

        let animation_loop = window.setTimeout((): void => {
            window.clearTimeout(animation_loop)
            animation_loop = null

            if (this.options.animate)
                document.querySelector(this.current_slide.selector).classList.add(this.options.enter_class)

            this.current_slide.dispatchEvent('shown')

            this.start()
        }, this.options.animate ? 350 : 0)
    }

    private _startTimer(timeout): void {
        this._loop_start = Date.now()
        this._time_remaining = timeout

        if (this._current_loop !== null)
            window.clearTimeout(this._current_loop)

        this._current_loop = window.setTimeout(this.next.bind(this), this._time_remaining)
    }

    /**
     * @private
     */
    private _beforeSlideChange(): void {
        this._dispatchEvent('beforeLeave')
        this.current_slide.dispatchEvent('beforeLeave')
        this.current_slide.active = false
        this._previous_slide = this.current_slide
    }

    /**
     * @private
     */
    private _buildFromHTML(): void {
        const slides = document.querySelectorAll(this.options.container + ' [data-slide]')

        if (!slides)
            throw new Error(`[Err] Slidr._buildFromHTML :: No slides found on container element '${this.options.container}'`)

        Array.from(slides)
            .forEach(({ dataset }: HTMLElement) => {
                if (dataset.slide && dataset.slide.length) {
                    this.add({
                        name: dataset.slide,
                        timeout: dataset.timeout ? parseInt(dataset.timeout, 10) : 0
                    } as SlideProps)
                }
            })
    }

    /**
     * @param {String} event_name
     * @private
     */
    private _dispatchEvent(event_name: string): Function {
        return this._events[event_name].call(this)
    }

}
