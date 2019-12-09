# SlidR

A simple JS library to handle HTML sliders.

Here is a [live demo](https://codepen.io/betaweb/pen/GRgoKbN).

<br><br>


## Getting started
### Installation
To install SlidR, you just have to download `Slidr.min.js` in the `dist` folder and add a script into your HTML page :
```HTML
<script src="path/to/Slidr.min.js"></script>
```


### Basic usage

Here a basic HTML form with a `.slider` element contains 2 slides :
```HTML
<div class="slider">
    <div data-slide="slide1" class="slide">Slide #1</div>
    <div data-slide="slide2" class="slide">Slide #2</div>
</div>
```

> The slides **MUST HAVE** a `data-slide` attribute.

<br>

And you just have to instanciate SlidR, add your slides and run it :
```JS
document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slidr()
    slider
        .add({name: 'slide1', timeout: 20 * 1000})
        .add({name: 'slide2', timeout: 10 * 1000})
        .run()
})
```

And.. voilà ! You have a fully functional slider ! :)

<br>

### Options & Events

Coming soon
