const Slidr = require('../build/main/Slidr').default
const Slide = require('../build/main/Slide').default
const {readFileSync} = require('fs')
const __html__ = readFileSync('tests/fixtures/document.html')
const getSlide = (n, props) => Object.assign({name: 'slide' + n, timeout: 1000}, props)
const setSliderInstace = props => new Slidr(props)

beforeAll(() => {
    document.body.innerHTML = __html__
})

describe('Slidr', () => {

    it('should have 0 slides', () => {
        const slider = setSliderInstace()
        expect(slider.slides.length).toBe(0)
    })

    it('should have 2 slides', () => {
        const slider = setSliderInstace()
        slider
            .add(getSlide(1))
            .add(getSlide(2))
        expect(slider.slides.length).toBe(2)
    })

    it('should throws exeption when slide DOM element not exists', () => {
        const slider = setSliderInstace()
        expect(() => {
            slider
                .add(getSlide(1))
                .add(getSlide(2))
                .add(getSlide(3))
        }).toThrowError(Error)
    })

    it('should have find a slide at index 0', () => {
        const slider = setSliderInstace()
        slider.add(getSlide(1))
        const slide = slider.getSlideByIndex(0)
        expect(slide).not.toBe(null)
        expect(slide).toBeInstanceOf(Slide)
    })

    it('should have find a slide with name', () => {
        const slider = setSliderInstace()
        slider.add(getSlide(1))
        const slide = slider.getSlideByName('slide1')
        expect(slide).not.toBe(null)
        expect(slide).toBeInstanceOf(Slide)
    })

    it('should run slides', async () => {
        const slider = setSliderInstace()
        let slide1_called = false
        let slide2_called = false
        await new Promise(resolve => {
            slider
                .add(getSlide(1, {
                    shown() {
                        slide1_called = true
                    }
                }))
                .add(getSlide(2, {
                    timeout: 2000,
                    shown() {
                        slide2_called = true
                        resolve()
                    }
                }))
            jest.setTimeout(slider.getSlideByIndex(0).timeout + slider.getSlideByIndex(1).timeout + 100)
            slider.run()
        })
        expect(slide1_called).toEqual(true)
        expect(slide2_called).toEqual(true)
    })

    it('should run slides loop 2 times', async () => {
        const slider = setSliderInstace({loops: 2})
        let slide1_called = 0
        let slide2_called = 0
        await new Promise(resolve => {
            slider.options.loops = 2
            slider
                .add(getSlide(1, {
                    shown() {
                        slide1_called++
                    }
                }))
                .add(getSlide(2, {
                    timeout: 2000,
                    shown() {
                        slide2_called++
                    },
                }))
            jest.setTimeout(10000)
            slider.listen('loopend', function () {
                resolve()
            })
            slider.run()
        })
        expect(slide1_called).toEqual(2)
        expect(slide2_called).toEqual(2)
    })

    it('should build slider from HTML elements', () => {
        const slider = setSliderInstace({container: '.slider'})
        expect(slider.slides.length).toEqual(2)
        console.log(slider.slides)
        expect(slider.getSlideByIndex(0).name).toBe('slide1')
        expect(slider.getSlideByIndex(1).name).toBe('slide2')
    })

})

afterEach(() => {
    jest.setTimeout(5000)
})
