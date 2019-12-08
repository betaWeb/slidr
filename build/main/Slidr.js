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
        document
            .querySelectorAll(`[data-slide]:not(${this.current_slide.selector})`)
            .forEach(el => el.classList.remove(this.options.enter_class));
        window.setTimeout(() => {
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
        this._events[event_name].call(this);
    }
}
exports.default = Slidr;
if (!window.hasOwnProperty('Slidr'))
    window.Slidr = Slidr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFpQjVCOzs7Ozs7O0dBT0c7QUFDSCxNQUFxQixLQUFLO0lBMkJ0Qjs7O09BR0c7SUFDSCxZQUFZLFVBQXlCLEVBQUU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQ0FDUixLQUFLLENBQUMsZUFBZSxHQUNyQixPQUFPLENBQ2IsQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7WUFDdkIsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7WUFDdkIsU0FBUyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7U0FDckIsQ0FBQTtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUN2RCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7SUFDN0IsQ0FBQztJQXhDRDs7T0FFRztJQUNJLE1BQU0sS0FBSyxlQUFlO1FBQzdCLE9BQU87WUFDSCxLQUFLLEVBQUUsUUFBUTtZQUNmLE9BQU8sRUFBRSxJQUFJO1lBQ2IsZUFBZSxFQUFFLE1BQU07WUFDdkIsV0FBVyxFQUFFLFNBQVM7U0FDekIsQ0FBQTtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUF5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