"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Slide_1 = __importDefault(require("./Slide"));
/**
 * @class
 * @property {Object} options
 * @property {Slide[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 * @property {Number|null} _current_loop
 */
class Slidr {
    /**
     * @constructor
     * @param {Object} options
     * @param {Number} options.loops
     * @param {Boolean} options.animate
     * @param {String} options.animation_class
     * @param {String} options.enter_class
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
        this._current_loop = null;
        this._previous_slide = null;
        this._loop_start = Date.now();
        this._time_remaining = 0;
        if (this.options.container && this.options.container.length)
            this._buildFromHTML();
    }
    /**
     * @returns {Object}
     * @public
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
     * @public
     */
    get current_slide() {
        return this.slides[this.index];
    }
    /**
     * Returns slider progress in percent
     *
     * @returns {Number}
     * @public
     */
    get progress() {
        if (!this.current_slide || !this.slides.length)
            return 0;
        return ((this.current_slide.index + 1) * 100) / this.slides.length;
    }
    /**
     * @returns {Slidr}
     * @public
     */
    add(slide_props) {
        const slide = new Slide_1.default(slide_props);
        let index = this.slides.push(slide);
        slide.index = index - 1;
        if (this.options.animate)
            document
                .querySelector(slide.selector)
                .classList.add(this.options.animation_class);
        return this;
    }
    /**
     * @returns {Slidr}
     * @public
     */
    run() {
        this.stop();
        this.current_slide.active = true;
        this._dispatchEvent('change');
        try {
            this._slide();
        }
        catch (e) {
            throw new Error(`[Err] Slidr.run :: ${e.message}`);
        }
        return this;
    }
    /**
     * @param {Number} index
     * @returns {Slide|null}
     * @public
     */
    getSlideByIndex(index) {
        return this.slides[index] || null;
    }
    /**
     * @param {String} name
     * @returns {Slide|null}
     * @public
     */
    getSlideByName(name) {
        return this.slides.find(slide => slide.name === name) || null;
    }
    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     * @public
     */
    listen(event_name, callback) {
        if (!Object.keys(this._events).includes(event_name))
            throw new Error(`[Err] Slidr.listen :: Event '${event_name}' does not exists.`);
        this._events[event_name] = callback;
        return this;
    }
    /**
     * @returns {Slidr}
     * @public
     */
    prev() {
        this._beforeSlideChange();
        if (this.index - 1 < 0)
            this.index = this.slides.length - 1;
        else
            this.index -= 1;
        return this.run();
    }
    /**
     * @returns {Slidr}
     * @public
     */
    next() {
        this._beforeSlideChange();
        if (this.index + 1 > this.slides.length - 1) {
            this.index = 0;
            this.loops++;
            if (this.loops === this.options.loops) {
                this.stop();
                this._dispatchEvent('loopend');
                return this;
            }
        }
        else
            this.index += 1;
        return this.run();
    }
    /**
     * @returns {Slidr}
     * @public
     */
    goTo(index) {
        this._beforeSlideChange();
        this.index = this.slides[index] ? index : 0;
        return this.run();
    }
    /**
     * @returns {Slidr}
     * @public
     */
    start() {
        this._startTimer(this.current_slide.timeout);
        return this;
    }
    /**
     * @returns {Slidr}
     * @public
     */
    stop() {
        if (this._current_loop !== null) {
            window.clearTimeout(this._current_loop);
            this._current_loop = null;
        }
        return this;
    }
    /**
     * @returns {Number}
     * @public
     */
    pause() {
        this.stop();
        this._time_remaining -= Math.round((Date.now() - this._loop_start) / 1000) * 1000;
        return this._time_remaining;
    }
    /**
     * @returns {Slidr}
     * @public
     */
    resume() {
        this._startTimer(this._time_remaining);
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
        if (this.options.animate && this._previous_slide !== null)
            this._previous_slide.element.classList.remove(this.options.enter_class);
        let animation_loop = window.setTimeout(() => {
            window.clearTimeout(animation_loop);
            animation_loop = null;
            if (this.options.animate)
                document.querySelector(this.current_slide.selector).classList.add(this.options.enter_class);
            this.current_slide.dispatchEvent('shown');
            this.start();
        }, this.options.animate ? 350 : 0);
    }
    _startTimer(timeout) {
        this._loop_start = Date.now();
        this._time_remaining = timeout;
        if (this._current_loop !== null)
            window.clearTimeout(this._current_loop);
        this._current_loop = window.setTimeout(this.next.bind(this), this._time_remaining);
    }
    /**
     * @private
     */
    _beforeSlideChange() {
        this._dispatchEvent('beforeLeave');
        this.current_slide.dispatchEvent('beforeLeave');
        this.current_slide.active = false;
        this._previous_slide = this.current_slide;
    }
    /**
     * @private
     */
    _buildFromHTML() {
        const slides = document.querySelectorAll(this.options.container + ' [data-slide]');
        if (!slides)
            throw new Error(`[Err] Slidr._buildFromHTML :: No slides found on container element '${this.options.container}'`);
        Array.from(slides)
            .forEach(({ dataset }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFXNUI7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFxQixLQUFLO0lBNEN0Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxVQUF5QixFQUFFO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQ1IsS0FBSyxDQUFDLGVBQWUsR0FDckIsT0FBTyxDQUNiLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ3hCLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ3hCLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3RCLENBQUE7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtRQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQTtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUM3QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQTtRQUV4QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQzdCLENBQUM7SUE3REQ7OztPQUdHO0lBQ0ksTUFBTSxLQUFLLGVBQWU7UUFDN0IsT0FBTztZQUNILEtBQUssRUFBRSxRQUFRO1lBQ2YsT0FBTyxFQUFF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