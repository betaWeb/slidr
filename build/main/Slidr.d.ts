import Slide from "./Slide";
import SlideProps from "./Slide";
declare global {
    interface Window {
        Slidr: any;
    }
}
declare type SliderOptions = {
    loops?: Number;
    animate?: Boolean;
    animation_class?: string;
    enter_class?: string;
    container?: string;
};
/**
 * @class
 * @property {SliderOptions} options
 * @property {SlideProps[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 */
export default class Slidr {
    options: SliderOptions;
    slides: Slide[];
    index: number;
    loops: number;
    _events: Object;
    /**
     * @returns {SliderOptions}
     */
    static get DEFAULT_OPTIONS(): SliderOptions;
    /**
     * @returns {Slide}
     */
    get current_slide(): Slide;
    /**
     * @constructor
     * @param {SliderOptions} options
     */
    constructor(options?: SliderOptions);
    /**
     * @returns {Slidr}
     */
    add(slide_props: SlideProps): Slidr;
    /**
     * @returns {Slidr}
     */
    run(): Slidr;
    /**
     * @param {Number} index
     * @returns {Slide|null}
     */
    getSlideByIndex(index: number): Slide;
    /**
     * @param {String} name
     * @returns {Slide|null}
     */
    getSlideByName(name: String): (Slide | null);
    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     */
    listen(event_name: string, callback: Function): Slidr;
    /**
     * @throws {Error}
     * @private
     */
    private _slide;
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
export {};
