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
/**
 * @property {SlideProps} _properties
 * @property {number} _index
 */
var Slide = /** @class */ (function () {
    /**
     * @param {SlideProps} properties
     */
    function Slide(properties) {
        if (!properties.name || !properties.name.length)
            throw new Error('[Err] Slide.constructor :: property "name" is required');
        this._properties = __assign(__assign({}, Slide.DEFAULT_SLIDE_PROPS), properties);
        this.element = document.querySelector(this.selector);
        if (this.element === null)
            throw new Error("[Err] Slide.constructor :: DOM element '" + this.selector + "' does not exists");
        this._index = null;
        this._active = false;
    }
    Object.defineProperty(Slide.prototype, "name", {
        /**
         * @returns {String}
         */
        get: function () {
            return this._properties.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slide.prototype, "timeout", {
        /**
         * @returns {number}
         */
        get: function () {
            return this._properties.timeout;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slide.prototype, "selector", {
        /**
         * @returns {String}
         */
        get: function () {
            return "[data-slide=\"" + this._properties.name + "\"]";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slide, "DEFAULT_SLIDE_PROPS", {
        /**
         * @returns {SlideProps}
         */
        get: function () {
            return {
                name: '',
                timeout: 0,
                shown: function (_) { },
                beforeEnter: function (_) { },
                beforeLeave: function (_) { }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slide.prototype, "index", {
        /**
         * @returns {number}
         */
        get: function () {
            return this._index;
        },
        /**
         * @params {number}
         */
        set: function (index) {
            this._index = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slide.prototype, "active", {
        /**
         * @returns {Boolean}
         */
        get: function () {
            return this._active;
        },
        /**
         * @params {Boolean}
         */
        set: function (active) {
            this._active = active;
            this.element.classList.toggle('active');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {String} event_name
     * @returns {Function}
     */
    Slide.prototype.dispatchEvent = function (event_name) {
        return this._properties[event_name].call(this);
    };
    /**
     * @returns {Boolean}
     */
    Slide.prototype.isActive = function () {
        return this._active === true;
    };
    return Slide;
}());
export default Slide;
