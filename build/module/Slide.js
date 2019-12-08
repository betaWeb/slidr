/**
 * @property {SlideProps} _properties
 * @property {number} _index
 */
export default class Slide {
    /**
     * @param {SlideProps} properties
     */
    constructor(properties) {
        if (!properties.name || !properties.name.length)
            throw new Error('[Err] Slide.constructor :: property "name" is required');
        this._properties = {
            ...Slide.DEFAULT_SLIDE_PROPS,
            ...properties
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvU2xpZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUE7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxLQUFLO0lBc0V0Qjs7T0FFRztJQUNILFlBQVksVUFBc0I7UUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO1FBRTdFLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDZixHQUFHLEtBQUssQ0FBQyxtQkFBbUI7WUFDNUIsR0FBRyxVQUFVO1NBQ2hCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRXBELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLElBQUksQ0FBQyxRQUFRLG1CQUFtQixDQUFDLENBQUE7UUFFaEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDeEIsQ0FBQztJQWxGRDs7T0FFRztJQUNILElBQVcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQTtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLFFBQVE7UUFDZixPQUFPLGdCQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFBO0lBQ3BELENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sS0FBSyxtQkFBbUI7UUFDakMsT0FBTztZQUNILElBQUksRUFBRSxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRSxDQUFDO1lBQ2QsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQztZQUNwQixXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRSxDQUFDO1NBQ3ZCLENBQUE7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLEtBQUs7UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxNQUFNLENBQUMsTUFBZTtRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQXVCRDs7O09BR0c7SUFDSSxhQUFhLENBQUMsVUFBa0I7UUFDbkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQTtJQUNoQyxDQUFDO0NBQ0oifQ==