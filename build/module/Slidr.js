import Slide from "./Slide";
/**
 * @class
 * @property {SliderOptions} options
 * @property {SlideProps[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 */
export default class Slidr {
    /**
     * @constructor
     * @param {SliderOptions} options
     */
    constructor(options = {}) {
        this.options = {
            ...Slidr.DEFAULT_OPTIONS,
            ...options
        };
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
        const slide = new Slide(slide_props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBVzVCOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQUs7SUEyQnRCOzs7T0FHRztJQUNILFlBQVksVUFBeUIsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFtQjtZQUMzQixHQUFHLEtBQUssQ0FBQyxlQUFlO1lBQ3hCLEdBQUcsT0FBTztTQUNiLENBQUE7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQ3ZCLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQ3ZCLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO1NBQ3JCLENBQUE7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQzdCLENBQUM7SUF4Q0Q7O09BRUc7SUFDSSxNQUFNLEtBQUssZUFBZTtRQUM3QixPQUFPO1lBQ0gsS0FBSyxFQUFFLFFBQVE7WUFDZixPQUFPLEVBQUUsSUFBSTtZQUNiLGVBQWUsRUFBRSxNQUFNO1lBQ3ZCLFdBQVcsRUFBRSxTQUFTO1NBQ3pCLENBQUE7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElB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