import Slide from "./Slide";
import SlideProps from "./Slide";

type SliderOptions = {
    loops?: Number
    animate?: Boolean
    animation_class?: string
    enter_class?: string
    container?: string
}

/**
 * @class
 * @property {SliderOptions} options
 * @property {SlideProps[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 */
export default class Slidr {

    public options: SliderOptions
    public slides: Slide[]
    public index: number
    public loops: number
    public _events: Object

    /**
     * @returns {SliderOptions}
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
     */
    public get current_slide(): Slide {
        return this.slides[this.index]
    }

    /**
     * @constructor
     * @param {SliderOptions} options
     */
    constructor(options: SliderOptions = {}) {
        this.options = <SliderOptions> {
            ...Slidr.DEFAULT_OPTIONS,
            ...options
        }
        this.slides = []
        this.index = 0
        this.loops = 0
        this._events = {
            'beforeEnter': () => {},
            'beforeLeave': () => {},
            'loopend': () => {},
            'change': () => {}
        }

        if (this.options.container && this.options.container.length)
            this._buildFromHTML()
    }

    /**
     * @returns {Slidr}
     */
    public add(slide_props: SlideProps): Slidr {
        const slide = new Slide(slide_props)
        slide.index = this.slides.push(slide)

        if (this.options.animate)
            document
                .querySelector(slide.selector)
                .classList.add(this.options.animation_class)

        return this
    }

    /**
     * @returns {Slidr}
     */
    public run(): Slidr {
        if (this.index >= this.slides.length) {
            this.index = 0
            this.loops++
            if (this.loops === this.options.loops) {
                this._dispatchEvent('loopend')
                return this
            }
        }

        this.current_slide.active = true
        this._dispatchEvent('change')

        try {
            this._slide()
        } catch (e) {
            throw e
        }

        return this
    }

    /**
     * @param {Number} index
     * @returns {Slide|null}
     */
    public getSlideByIndex(index: number): Slide {
        return this.slides[index] || null
    }

    /**
     * @param {String} name
     * @returns {Slide|null}
     */
    public getSlideByName(name: String): (Slide|null) {
        return this.slides.find(slide => slide.name === name) || null
    }

    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     */
    public listen(event_name: string, callback: Function): Slidr {
        if (!Object.keys(this._events).includes(event_name))
            throw new Error(`[Err] Slidr.listen :: Event '${event_name}' does not exists.`)

        this._events[event_name] = callback

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

        document
                .querySelectorAll(`[data-slide]:not(${this.current_slide.selector})`)
                .forEach(el => el.classList.remove(this.options.enter_class))

        window.setTimeout((): void => {
            document.querySelector(this.current_slide.selector).classList.add(this.options.enter_class)

            this.current_slide.dispatchEvent('shown')

            window.setTimeout(() => {
                this._dispatchEvent('beforeLeave')
                this.current_slide.dispatchEvent('beforeLeave')
                this.current_slide.active = false
                this.index++
                this.run()
            }, this.current_slide.timeout)
        }, this.options.animate ? 350 : 0)
    }

    /**
     * @private
     */
    private _buildFromHTML(): void {
        const slides = document.querySelectorAll(this.options.container + ' [data-slide]')
        if (!slides)
            throw new Error(`[Err] Slidr._buildFromHTML :: No slides found on container element '${this.options.container}'`)

        slides.forEach(({dataset}: HTMLElement) => {
            if (dataset.slide &&dataset.slide.length) {
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
    private _dispatchEvent(event_name: string): void {
        this._events[event_name].call(this)
    }

}
