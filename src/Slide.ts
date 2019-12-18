export type SlideProps = {
    name: string
    timeout: number
    shown?: Function
    beforeEnter?: Function
    beforeLeave?: Function
}

/**
 * @property {SlideProps} _properties
 * @property {number} _index
 */
export default class Slide {

    public element: HTMLElement | null;
    private _properties: SlideProps;
    private _index: number;
    private _active: Boolean;

    /**
     * @returns {String}
     */
    public get name(): string {
        return this._properties.name
    }

    /**
     * @returns {number}
     */
    public get timeout(): number {
        return this._properties.timeout
    }

    /**
     * @returns {String}
     */
    public get selector(): string {
        return `[data-slide="${this._properties.name}"]`
    }

    /**
     * @returns {SlideProps}
     */
    public static get DEFAULT_SLIDE_PROPS(): SlideProps {
        return {
            name: '',
            timeout: 0,
            shown: _ => { },
            beforeEnter: _ => { },
            beforeLeave: _ => { }
        }
    }

    /**
     * @returns {number}
     */
    public get index(): number {
        return this._index
    }

    /**
     * @params {number}
     */
    public set index(index: number) {
        this._index = index
    }

    /**
     * @returns {Boolean}
     */
    public get active(): Boolean {
        return this._active
    }

    /**
     * @params {Boolean}
     */
    public set active(active: Boolean) {
        this._active = active
        this.element.classList.toggle('active')
    }

    /**
     * @param {SlideProps} properties
     */
    constructor(properties: SlideProps) {
        if (!properties.name || !properties.name.length)
            throw new Error('[Err] Slide.constructor :: property "name" is required')

        this._properties = {
            ...Slide.DEFAULT_SLIDE_PROPS,
            ...properties
        };

        this.element = document.querySelector(this.selector) as HTMLElement

        if (this.element === null)
            throw new Error(`[Err] Slide.constructor :: DOM element '${this.selector}' does not exists`)

        this._index = null
        this._active = false
    }

    /**
     * @param {String} event_name
     * @returns {Function}
     */
    public dispatchEvent(event_name: string): Function {
        return this._properties[event_name].call(this)
    }

    /**
     * @returns {Boolean}
     */
    public isActive(): Boolean {
        return this._active === true
    }
}
