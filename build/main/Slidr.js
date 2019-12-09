"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slide_1 = __importDefault(require("./Slide"));
/**
 * @class
 * @property {SliderOptions} options
 * @property {SlideProps[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 */
class Slidr {
    /**
     * @constructor
     * @param {SliderOptions} options
     */
    constructor(options = {}) {
        this.options = Object.assign(Object.assign({}, Slidr.DEFAULT_OPTIONS), options);
        this.slides = [];
        this.index = 0;
        this.loops = 0;
        this._events = {
            'beforeEnter': () => { },
            'beforeLeave': () => { },
            'loopend': () => { },
            'change': () => { }
        };
        if (this.options.container && this.options.container.length)
            this._buildFromHTML();
    }
    /**
     * @returns {SliderOptions}
     */
    static get DEFAULT_OPTIONS() {
        return {
            loops: Infinity,
            animate: true,
            animation_class: 'fade',
            enter_class: 'fade-in'
        };
    }
    /**
     * @returns {Slide}
     */
    get current_slide() {
        return this.slides[this.index];
    }
    /**
     * @returns {Slidr}
     */
    add(slide_props) {
        const slide = new Slide_1.default(slide_props);
        slide.index = this.slides.push(slide);
        if (this.options.animate)
            document
                .querySelector(slide.selector)
                .classList.add(this.options.animation_class);
        return this;
    }
    /**
     * @returns {Slidr}
     */
    run() {
        if (this.index >= this.slides.length) {
            this.index = 0;
            this.loops++;
            if (this.loops === this.options.loops) {
                this._dispatchEvent('loopend');
                return this;
            }
        }
        this.current_slide.active = true;
        this._dispatchEvent('change');
        try {
            this._slide();
        }
        catch (e) {
            throw e;
        }
        return this;
    }
    /**
     * @param {Number} index
     * @returns {Slide|null}
     */
    getSlideByIndex(index) {
        return this.slides[index] || null;
    }
    /**
     * @param {String} name
     * @returns {Slide|null}
     */
    getSlideByName(name) {
        return this.slides.find(slide => slide.name === name) || null;
    }
    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     */
    listen(event_name, callback) {
        if (!Object.keys(this._events).includes(event_name))
            throw new Error(`[Err] Slidr.listen :: Event '${event_name}' does not exists.`);
        this._events[event_name] = callback;
        return this;
    }
    /**
     * @throws {Error}
     * @private
     */
    _slide() {
        if (!this.current_slide)
            throw new Error('[Err] Slidr._slide :: no slide found at index ' + this.index);
        this._dispatchEvent('beforeEnter');
        this.current_slide.dispatchEvent('beforeEnter');
        if (this.options.animate)
            document
                .querySelectorAll(`[data-slide]:not(${this.current_slide.selector})`)
                .forEach(el => el.classList.remove(this.options.enter_class));
        window.setTimeout(() => {
            if (this.options.animate)
                document.querySelector(this.current_slide.selector).classList.add(this.options.enter_class);
            this.current_slide.dispatchEvent('shown');
            window.setTimeout(() => {
                this._dispatchEvent('beforeLeave');
                this.current_slide.dispatchEvent('beforeLeave');
                this.current_slide.active = false;
                this.index++;
                this.run();
            }, this.current_slide.timeout);
        }, this.options.animate ? 350 : 0);
    }
    /**
     * @private
     */
    _buildFromHTML() {
        const slides = document.querySelectorAll(this.options.container + ' [data-slide]');
        if (!slides)
            throw new Error(`[Err] Slidr._buildFromHTML :: No slides found on container element '${this.options.container}'`);
        slides.forEach(({ dataset }) => {
            if (dataset.slide && dataset.slide.length) {
                this.add({
                    name: dataset.slide,
                    timeout: dataset.timeout ? parseInt(dataset.timeout, 10) : 0
                });
            }
        });
    }
    /**
     * @param {String} event_name
     * @private
     */
    _dispatchEvent(event_name) {
        return this._events[event_name].call(this);
    }
}
exports.default = Slidr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFXNUI7Ozs7Ozs7R0FPRztBQUNILE1BQXFCLEtBQUs7SUEyQnRCOzs7T0FHRztJQUNILFlBQVksVUFBeUIsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLGdDQUNSLEtBQUssQ0FBQyxlQUFlLEdBQ3JCLE9BQU8sQ0FDYixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDWCxhQUFhLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztZQUN2QixhQUFhLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztZQUN2QixTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztZQUNuQixRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQztTQUNyQixDQUFBO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0lBeENEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLGVBQWU7UUFDN0IsT0FBTztZQUNILEtBQUssRUFBRSxRQUFRO1lBQ2YsT0FBTyxFQUFFLElBQUk7WUFDYixlQUFlLEVBQUUsTUFBTTtZQUN2QixXQUFXLEVBQUUsU0FBUztTQUN6QixDQUFBO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQXlC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