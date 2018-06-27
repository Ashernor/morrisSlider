// Constructor method
function MorrisSlider(){
    this.initialize.apply(this);
}

// prototypes to define methods
MorrisSlider.prototype = {
    initialize: function(morrisSlider){
        morrisSlider = this;
        morrisSlider.getLastMovies("e082a5c50ed38ae74299db1d0eb822fe", function(data){
            morrisSlider.initSliderWithJson(data);
        });
    },
    // These function gets the upcoming movies in JSON from the MovieDB API
    // The documentation of the upcoming movies APS is available here :
    // https://developers.themoviedb.org/3/movies/get-upcoming
    getLastMovies: function getLastMovies(apiKey, callback){
        // If no API key is provider let's stop right here
        if (apiKey == "") {
            console.log("NO API KEY PROVIDER");
            return;
        }

        // Its easier to maintain if break the URL in small pieces for arguments and options
        var url        = 'https://api.themoviedb.org/3/movie/upcoming',
            key        = `?api_key=${apiKey}`,
            options    = '&region=fr&language=fr-FR';

        // throw error if no region + put default region to FR & language_fr_Fr

        // lets make our ajax request

        $.ajax({
            type: 'GET',
            url: url + key + options,
            async: false,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                callback(json.results);
            },
            error: function(e) {
                // there is place for improvement here (send en error message to our server for exeample)
                console.log("Sorry there was problem with while retrieving movies")
            }
        });
    },
    initSliderWithJson: function initSliderWithJson(data){
        // We create the slider in JS to make sure the user doesn't mess something when integrating
        // The slider is composed of the following elements
        // 1. Two buttons (next & prev) which enables the end user to navigates the slider with arrows
        // 2. A bullet navigation which contains as many bullets as there is movies
        // 3. The list of the next movies
        // 4. A mask element to hide upcoming movies
        $("#movieSlider").append("<a href='#' class='buttons prev' onclick='morrisSlider.buttonClick(0);' /><a href='#' class='buttons next' onclick='morrisSlider.buttonClick(1);' /><div class='bullets-nav'></div><div class='mask maskLeft'></div><div class='mask maskRight'></div>");
        // Let's iterate in the list of movies to create the content of the slider
        var i = 0;
        data.forEach(function(movie){
            if (i == 0) var htmlCass = "beginning active";

            // the following variable contain the HTML for each movie it contains the following element
            // 1. A container with the class movie
            // 2. And image with the poster of the movie
            // 3. A container movie infos which is composed of title in H2 tag, a release date H4 tag, and the movie overview in a P tag
            // 4. At last but not least a score rating from users
            var html = `<div class="movie ${htmlCass}" data-position="${i}"><img alt='${movie.title} poster' src='http://image.tmdb.org/t/p/w500/${movie.poster_path}' /><div class="movieInfos"><h2>${movie.title}</h2><h4>${movie.release_date}</h4><p>${morrisSlider.truncateWords(movie.overview, 85)}</p>${morrisSlider.transfromIntoStars(movie.vote_average)}</div></div>`;
            // Let's add the HTML to our container
            $("#movieSlider").append(html);

            // Now let's add a bullet for each movie
            var bullet = `<a href='#' class="${htmlCass}" data-position="${i}" onclick="morrisSlider.slideToPosition(${i});"></a>`;
            $(".bullets-nav").append(bullet);

            i++;
        })
    },
    // This function enables the bullet-nav to work when the use click on one the slider
    // automatically slides on it's positon
    // on argument it takes the position of the bullet which was clicked
    slideToPosition: function slideToPosition(position) {
        // Select the correct movie according the bullet nav positon
        moviePosition = $(".movie")[position];
        $(".active").removeClass("active");

        // As for the buttonClick function let's hide the arrows according to the positon in the slider
        if (position > 0) $(".buttons.prev").show();
        if (position < $(".movie").length-1) $(".buttons.next").show();
        if (position == 0) $(".buttons.prev").hide();
        if (position == $(".movie").length-1) $(".buttons.next").hide();

        // This time we need to do some calculs before animate the whole slider
        var whereToSlide = `${ 25 - position*52.5 }%`;
        $(".movie.beginning").animate({
            marginLeft: whereToSlide,
        }, 1000, function() {
            $(moviePosition).addClass("active");
            $($(".bullets-nav a")[position]).addClass("active");
        });
    },
    // This function enables the arrows to work
    // It takes a side as an argument
    // 0 is for left
    // 1 is for right
    buttonClick: function buttonClick(side){

        // With the side we chose if we must take the next or the previous element and the direction of the animation
        if (side == 0){
            var next       = $(".active").prev();
            var direction  = "+";
        }else{
            var direction  = "-";
            var next       = $(".active").next();
        }

        // The next 4 lines make sure we hide the arrows if are on the first on last element
        if ($(next).data("position") > 0) $(".buttons.prev").show();
        if ($(next).data("position") < $(".movie").length-1) $(".buttons.next").show();
        if ($(next).data("position") == 0) $(".buttons.prev").hide();
        if ($(next).data("position") == $(".movie").length-1) $(".buttons.next").hide();

        // These 4 lines animates the whole slider
        // The slider animtes with jQuery
        // The movieInfo container show and hides thanks to the magic of css transition
        $(".active").removeClass("active");
        $(".movie.beginning").animate({
            marginLeft: `${direction}=52.5%`,
        }, 1000, function() {
            $(next).addClass("active");
        });
    },
    // This function takes a floating note as an argument and transforms it in rating in star
    // Thanks to the awesomeness of FontAwesome https://fontawesome.com/icons/star?style=regular&from=io
    transfromIntoStars: function transfromIntoStars(note) {
        //Let's make a percentage
        var percentage = `${(Math.round(note)*10)}%`;
        // Create stars holder
        var span = `<div class="stars-outer"><div class="stars-inner" style="width: ${percentage}"></div></div>`;
        return span
    },
    // Simple function to truncate the except without cutting a word
    truncateWords: function truncateWords(str, nbWords) {
        var returnStr = str.split(" ").splice(0, nbWords).join(" ");
        // add the … only if the text is not complete
        if (str.split(" ").length > nbWords) returnStr = returnStr+"…";
        return returnStr;
    }
};