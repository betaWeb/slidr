import Slide from "./Slide";
import SlideProps from "./Slide";
export declare type SliderOptions = {
    loops?: Number;
    animate?: Boolean;
    animation_class?: string;
    enter_class?: string;
    container?: string;
};
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
    options: SliderOptions;
    slides: Slide[];
    index: number;
    loops: number;
    private _events;
    private _current_loop?;
    private _previous_slide?;
    /**
     * @returns {Object}
     * @public
     */
    static get DEFAULT_OPTIONS(): SliderOptions;
    /**
     * @returns {Slide}
     * @public
     */
    get current_slide(): Slide;
    /**
     * Returns slider progress in percent
     *
     * @returns {Number}
     * @public
     */
    get progress(): Number;
    /**
     * @constructor
     * @param {Object} options
     * @param {Number} options.loops
     * @param {Boolean} options.animate
     * @param {String} options.animation_class
     * @param {String} options.enter_class
     */
    constructor(options?: SliderOptions);
    /**
     * @returns {Slidr}
     * @public
     */
    add(slide_props: SlideProps): Slidr;
    /**
     * @returns {Slidr}
     * @public
     */
    run(): Slidr;
    /**
     * @param {Number} index
     * @returns {Slide|null}
     * @public
     */
    getSlideByIndex(index: number): Slide;
    /**
     * @param {String} name
     * @returns {Slide|null}
     * @public
     */
    getSlideByName(name: String): (Slide | null);
    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     * @public
     */
    listen(event_name: string, callback: Function): Slidr;
    /**
     * @returns {Slidr}
     * @public
     */
    prev(): Slidr;
    /**
     * @returns {Slidr}
     * @public
     */
    next(): Slidr;
    /**
     * @returns {Slidr}
     * @public
     */
    goTo(index: any): Slidr;
    /**
     * @throws {Error}
     * @private
     */
    private _slide;
    /**
     * @private
     */
    private _clearCurrentLoop;
    /**
     * @private
     */
    private _beforeSlideChange;
    /**
     * @private
     */
    private _buildFromHTML;
    /**
     * @param {String} event_name
     * @private
     */
    private _dispatchEvent;
}
