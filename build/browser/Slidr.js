var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Slide from "./Slide";
/**
 * @class
 * @property {SliderOptions} options
 * @property {SlideProps[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 */
var Slidr = /** @class */ (function () {
    /**
     * @constructor
     * @param {SliderOptions} options
     */
    function Slidr(options) {
        if (options === void 0) { options = {}; }
        this.options = __assign(__assign({}, Slidr.DEFAULT_OPTIONS), options);
        this.slides = [];
        this.index = 0;
        this.loops = 0;
        this._events = {
            'beforeEnter': function () { },
            'beforeLeave': function () { },
            'loopend': function () { },
            'change': function () { }
        };
        if (this.options.container && this.options.container.length)
            this._buildFromHTML();
    }
    Object.defineProperty(Slidr, "DEFAULT_OPTIONS", {
        /**
         * @returns {SliderOptions}
         */
        get: function () {
            return {
                loops: Infinity,
                animate: true,
                animation_class: 'fade',
                enter_class: 'fade-in'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slidr.prototype, "current_slide", {
        /**
         * @returns {Slide}
         */
        get: function () {
            return this.slides[this.index];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns {Slidr}
     */
    Slidr.prototype.add = function (slide_props) {
        var slide = new Slide(slide_props);
        slide.index = this.slides.push(slide);
        if (this.options.animate)
            document
                .querySelector(slide.selector)
                .classList.add(this.options.animation_class);
        return this;
    };
    /**
     * @returns {Slidr}
     */
    Slidr.prototype.run = function () {
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
    };
    /**
     * @param {Number} index
     * @returns {Slide|null}
     */
    Slidr.prototype.getSlideByIndex = function (index) {
        return this.slides[index] || null;
    };
    /**
     * @param {String} name
     * @returns {Slide|null}
     */
    Slidr.prototype.getSlideByName = function (name) {
        return this.slides.find(function (slide) { return slide.name === name; }) || null;
    };
    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     */
    Slidr.prototype.listen = function (event_name, callback) {
        if (!Object.keys(this._events).includes(event_name))
            throw new Error("[Err] Slidr.listen :: Event '" + event_name + "' does not exists.");
        this._events[event_name] = callback;
        return this;
    };
    /**
     * @throws {Error}
     * @private
     */
    Slidr.prototype._slide = function () {
        var _this = this;
        if (!this.current_slide)
            throw new Error('[Err] Slidr._slide :: no slide found at index ' + this.index);
        this._dispatchEvent('beforeEnter');
        this.current_slide.dispatchEvent('beforeEnter');
        if (this.options.animate)
            document
                .querySelectorAll("[data-slide]:not(" + this.current_slide.selector + ")")
                .forEach(function (el) { return el.classList.remove(_this.options.enter_class); });
        window.setTimeout(function () {
            if (_this.options.animate)
                document.querySelector(_this.current_slide.selector).classList.add(_this.options.enter_class);
            _this.current_slide.dispatchEvent('shown');
            window.setTimeout(function () {
                _this._dispatchEvent('beforeLeave');
                _this.current_slide.dispatchEvent('beforeLeave');
                _this.current_slide.active = false;
                _this.index++;
                _this.run();
            }, _this.current_slide.timeout);
        }, this.options.animate ? 350 : 0);
    };
    /**
     * @private
     */
    Slidr.prototype._buildFromHTML = function () {
        var _this = this;
        var slides = document.querySelectorAll(this.options.container + ' [data-slide]');
        if (!slides)
            throw new Error("[Err] Slidr._buildFromHTML :: No slides found on container element '" + this.options.container + "'");
        slides.forEach(function (_a) {
            var dataset = _a.dataset;
            if (dataset.slide && dataset.slide.length) {
                _this.add({
                    name: dataset.slide,
                    timeout: dataset.timeout ? parseInt(dataset.timeout, 10) : 0
                });
            }
        });
    };
    /**
     * @param {String} event_name
     * @private
     */
    Slidr.prototype._dispatchEvent = function (event_name) {
        return this._events[event_name].call(this);
    };
    return Slidr;
}());
export default Slidr;
