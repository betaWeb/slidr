export declare type SlideProps = {
    name: string;
    timeout: number;
    shown?: Function;
    beforeEnter?: Function;
    beforeLeave?: Function;
};
/**
 * @property {SlideProps} _properties
 * @property {number} _index
 */
export default class Slide {
    element: HTMLElement | null;
    private _properties;
    private _index;
    private _active;
    /**
     * @returns {String}
     */
    get name(): string;
    /**
     * @returns {number}
     */
    get timeout(): number;
    /**
     * @returns {String}
     */
    get selector(): string;
    /**
     * @returns {SlideProps}
     */
    static get DEFAULT_SLIDE_PROPS(): SlideProps;
    /**
     * @returns {number}
     */
    get index(): number;
    /**
     * @params {number}
     */
    set index(index: number);
    /**
     * @returns {Boolean}
     */
    get active(): Boolean;
    /**
     * @params {Boolean}
     */
    set active(active: Boolean);
    /**
     * @param {SlideProps} properties
     */
    constructor(properties: SlideProps);
    /**
     * @param {String} event_name
     * @returns {Function}
     */
    dispatchEvent(event_name: string): Function;
    /**
     * @returns {Boolean}
     */
    isActive(): Boolean;
}
