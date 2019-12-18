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
 * @property {Object} options
 * @property {Slide[]} slides
 * @property {Number} index
 * @property {Number} loops
 * @property {[String]: Function} _events
 * @property {Number|null} _current_loop
 */
var Slidr = /** @class */ (function () {
    /**
     * @constructor
     * @param {Object} options
     * @param {Number} options.loops
     * @param {Boolean} options.animate
     * @param {String} options.animation_class
     * @param {String} options.enter_class
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
        this._current_loop = null;
        this._previous_slide = null;
        if (this.options.container && this.options.container.length)
            this._buildFromHTML();
    }
    Object.defineProperty(Slidr, "DEFAULT_OPTIONS", {
        /**
         * @returns {Object}
         * @public
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
         * @public
         */
        get: function () {
            return this.slides[this.index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slidr.prototype, "progress", {
        /**
         * Returns slider progress in percent
         *
         * @returns {Number}
         * @public
         */
        get: function () {
            if (!this.current_slide || !this.slides.length)
                return 0;
            return ((this.current_slide.index + 1) * 100) / this.slides.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @returns {Slidr}
     * @public
     */
    Slidr.prototype.add = function (slide_props) {
        var slide = new Slide(slide_props);
        var index = this.slides.push(slide);
        slide.index = index - 1;
        if (this.options.animate)
            document
                .querySelector(slide.selector)
                .classList.add(this.options.animation_class);
        return this;
    };
    /**
     * @returns {Slidr}
     * @public
     */
    Slidr.prototype.run = function () {
        this._clearCurrentLoop();
        this.current_slide.active = true;
        this._dispatchEvent('change');
        try {
            this._slide();
        }
        catch (e) {
            throw new Error("[Err] Slidr.run :: " + e.message);
        }
        return this;
    };
    /**
     * @param {Number} index
     * @returns {Slide|null}
     * @public
     */
    Slidr.prototype.getSlideByIndex = function (index) {
        return this.slides[index] || null;
    };
    /**
     * @param {String} name
     * @returns {Slide|null}
     * @public
     */
    Slidr.prototype.getSlideByName = function (name) {
        return this.slides.find(function (slide) { return slide.name === name; }) || null;
    };
    /**
     *
     * @param {String} event_name
     * @param {Function} callback
     * @returns {Slidr}
     * @public
     */
    Slidr.prototype.listen = function (event_name, callback) {
        if (!Object.keys(this._events).includes(event_name))
            throw new Error("[Err] Slidr.listen :: Event '" + event_name + "' does not exists.");
        this._events[event_name] = callback;
        return this;
    };
    /**
     * @returns {Slidr}
     * @public
     */
    Slidr.prototype.prev = function () {
        this._beforeSlideChange();
        if (this.index - 1 < 0)
            this.index = this.slides.length - 1;
        else
            this.index -= 1;
        return this.run();
    };
    /**
     * @returns {Slidr}
     * @public
     */
    Slidr.prototype.next = function () {
        this._beforeSlideChange();
        if (this.index + 1 > this.slides.length - 1) {
            this.index = 0;
            this.loops++;
            if (this.loops === this.options.loops) {
                this._clearCurrentLoop();
                this._dispatchEvent('loopend');
                return this;
            }
        }
        else
            this.index += 1;
        return this.run();
    };
    /**
     * @returns {Slidr}
     * @public
     */
    Slidr.prototype.goTo = function (index) {
        this._beforeSlideChange();
        this.index = this.slides[index] ? index : 0;
        return this.run();
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
        if (this.options.animate && this._previous_slide !== null)
            this._previous_slide.element.classList.remove(this.options.enter_class);
        var animation_loop = window.setTimeout(function () {
            window.clearTimeout(animation_loop);
            animation_loop = null;
            if (_this.options.animate)
                document.querySelector(_this.current_slide.selector).classList.add(_this.options.enter_class);
            _this.current_slide.dispatchEvent('shown');
            _this._current_loop = window.setTimeout(_this.next.bind(_this), _this.current_slide.timeout);
        }, this.options.animate ? 350 : 0);
    };
    /**
     * @private
     */
    Slidr.prototype._clearCurrentLoop = function () {
        if (this._current_loop !== null) {
            window.clearTimeout(this._current_loop);
            this._current_loop = null;
        }
    };
    /**
     * @private
     */
    Slidr.prototype._beforeSlideChange = function () {
        this._dispatchEvent('beforeLeave');
        this.current_slide.dispatchEvent('beforeLeave');
        this.current_slide.active = false;
        this._previous_slide = this.current_slide;
    };
    /**
     * @private
     */
    Slidr.prototype._buildFromHTML = function () {
        var _this = this;
        var slides = document.querySelectorAll(this.options.container + ' [data-slide]');
        if (!slides)
            throw new Error("[Err] Slidr._buildFromHTML :: No slides found on container element '" + this.options.container + "'");
        Array.from(slides)
            .forEach(function (_a) {
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
