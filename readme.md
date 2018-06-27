# MorrisSlider - Readme

## Intro

The JS slider goal is to show you the upcoming movies in a very simple slider. 
It uses MovieDB API (ttps://developers.themoviedb.org/3/movies/get-upcoming)

It's name is 'hommag' co Morris Columns in Paris which are cylindrical outdoor sidewalk structures with a characteristic style that are used for advertising of upcoming movies. (https://fr.wikipedia.org/wiki/Colonne_Morris)

You can try the slider at this address : http://www.thomasrobin.net/morris-slider/

## How it works 

1. Add the CSS and JS to your page or project (and 
2. Add the following tag to your page where you want to add the slider : 
```
    <div id="movieSlider"></div>
```
3. Add the following javascript to init the slider 
```javascript
    <script type="text/javascript">
        $(document).ready(function(){
            morrisSlider = new MorrisSlider(this);
        });
    </script>
```
And voila !    

### What's inside 

You can browse the code in the morris-slider.js it's documented 

### How can we improve it 
- APIKey as an argument 
- Region & language in methods or other arguments if it's well documented
- Better look, why not transform it in circular column, like the ones ine Paris ;)
- Better date display (according to user region or language) maybe with moment.js - https://momentjs.com/


