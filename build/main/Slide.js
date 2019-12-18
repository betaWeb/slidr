"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @property {SlideProps} _properties
 * @property {number} _index
 */
class Slide {
    /**
     * @param {SlideProps} properties
     */
    constructor(properties) {
        if (!properties.name || !properties.name.length)
            throw new Error('[Err] Slide.constructor :: property "name" is required');
        this._properties = Object.assign(Object.assign({}, Slide.DEFAULT_SLIDE_PROPS), properties);
        this.element = document.querySelector(this.selector);
        if (this.element === null)
            throw new Error(`[Err] Slide.constructor :: DOM element '${this.selector}' does not exists`);
        this._index = null;
        this._active = false;
    }
    /**
     * @returns {String}
     */
    get name() {
        return this._properties.name;
    }
    /**
     * @returns {number}
     */
    get timeout() {
        return this._properties.timeout;
    }
    /**
     * @returns {String}
     */
    get selector() {
        return `[data-slide="${this._properties.name}"]`;
    }
    /**
     * @returns {SlideProps}
     */
    static get DEFAULT_SLIDE_PROPS() {
        return {
            name: '',
            timeout: 0,
            shown: _ => { },
            beforeEnter: _ => { },
            beforeLeave: _ => { }
        };
    }
    /**
     * @returns {number}
     */
    get index() {
        return this._index;
    }
    /**
     * @params {number}
     */
    set index(index) {
        this._index = index;
    }
    /**
     * @returns {Boolean}
     */
    get active() {
        return this._active;
    }
    /**
     * @params {Boolean}
     */
    set active(active) {
        this._active = active;
        this.element.classList.toggle('active');
    }
    /**
     * @param {String} event_name
     * @returns {Function}
     */
    dispatchEvent(event_name) {
        return this._properties[event_name].call(this);
    }
    /**
     * @returns {Boolean}
     */
    isActive() {
        return this._active === true;
    }
}
exports.default = Slide;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQTs7O0dBR0c7QUFDSCxNQUFxQixLQUFLO0lBc0V0Qjs7T0FFRztJQUNILFlBQVksVUFBc0I7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO1FBRTdFLElBQUksQ0FBQyxXQUFXLG1DQUNULEtBQUssQ0FBQyxtQkFBbUIsR0FDekIsVUFBVSxDQUNoQixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQWdCLENBQUE7UUFFbkUsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUk7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsSUFBSSxDQUFDLFFBQVEsbUJBQW1CLENBQUMsQ0FBQTtRQUVoRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtJQUN4QixDQUFDO0lBbEZEOztPQUVHO0lBQ0gsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsUUFBUTtRQUNmLE9BQU8sZ0JBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUE7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxLQUFLLG1CQUFtQjtRQUNqQyxPQUFPO1lBQ0gsSUFBSSxFQUFFLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDZixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ3JCLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7U0FDeEIsQ0FBQTtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLEtBQUssQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE1BQU0sQ0FBQyxNQUFlO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBdUJEOzs7T0FHRztJQUNJLGFBQWEsQ0FBQyxVQUFrQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2xELENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFBO0lBQ2hDLENBQUM7Q0FDSjtBQXpHRCx3QkF5R0MifQ==