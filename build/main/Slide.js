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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFRQTs7O0dBR0c7QUFDSCxNQUFxQixLQUFLO0lBc0V0Qjs7T0FFRztJQUNILFlBQVksVUFBc0I7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO1FBRTdFLElBQUksQ0FBQyxXQUFXLG1DQUNULEtBQUssQ0FBQyxtQkFBbUIsR0FDekIsVUFBVSxDQUNoQixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVwRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxJQUFJLENBQUMsUUFBUSxtQkFBbUIsQ0FBQyxDQUFBO1FBRWhHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3hCLENBQUM7SUFsRkQ7O09BRUc7SUFDSCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUE7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxRQUFRO1FBQ2YsT0FBTyxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssbUJBQW1CO1FBQ2pDLE9BQU87WUFDSCxJQUFJLEVBQUUsRUFBRTtZQUNSLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQztZQUNkLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFFLENBQUM7WUFDcEIsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQztTQUN2QixDQUFBO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFBO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsTUFBTSxDQUFDLE1BQWU7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUF1QkQ7OztPQUdHO0lBQ0ksYUFBYSxDQUFDLFVBQWtCO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUE7SUFDaEMsQ0FBQztDQUNKO0FBekdELHdCQXlHQyJ9