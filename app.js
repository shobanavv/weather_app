$(document).ready(function() {
    setTimeout(function() {
        $("button-id").trigger('click');
        getInfo();
    },1);
    var findWeather, showOutput, getForecast;
    var findItem;
    var url1, url2;
    $("#search-id").focus();

    $("#button-id").click(function() {
        getInfo();
    });

    var getInfo = function() {

        findItem = $("#search-id").val();  //Gets user input.
        $("#message").empty();

        if (findItem == "") {
            $("#message").text(" Enter a city name and State to find weather.");        //blank input message.
        } else {
            $("#search-id").val("");
            findWeather(findItem);              //calls function to find weather.
        }
    };

    var dayCalc = function(num) {
        var today;
        if(num === "Sun"){
            today = "Sunday";
        } else if (num === "Mon") {
            today = "Monday";
        } else if (num === "Tue") {
            today = "Tuesday";
        } else if (num === "Wed") {
            today = "Wednesday";
        } else if (num === "Thu") {
            today = "Thursday";
        } else if (num === "Fri") {
            today = "Friday";
        } else if(num === "Sat") {
            today = "Saturday";
        }
        return today;
    };

    showOutput = function(out) {               //showoutput displays information received from json object from Forecast for developers.
        var date = Date(out.currently.time);
        var day = date.substr(0,3);
        $("#date").text( date.substr(4,6));
        $("#day").text(dayCalc(day));
        $("#time").text(date.substr(16,5));
        $("#climate").text(out.currently.icon);
        $("#temp").text(parseInt(out.currently.temperature));
        $("#humid").text("Humidity :   " + parseInt(out.currently.humidity * 100 )+ "%");
        $("#wind").text("Wind Speed:   " + Math.round(out.currently.windSpeed) + " mph");
        $("#visib").text("Visibility:   " + Math.round(out.currently.visibility) + " m");
        $("#message").text(out.daily.summary);
    };

    getForecast = function(data) {
        $("#message").empty();
        // $("#search-id").empty();
        $("#city-name").text(data.results[0].address_components[0].long_name);  //Output city name.
        $("#state").text(data.results[0].address_components[2].long_name);
        $("#country").text(data.results[0].address_components[3].long_name);
        url2 = 'https://api.forecast.io/forecast/73ae89cc503818fc307b31e9445b5a47/' + data.results[0].geometry.location.lat +',' + data.results[0].geometry.location.lng;

        $.ajax({                    //calls Forecast for Developers api to get current weather information.
            dataType: "jsonp",
            url: url2,
            success: showOutput,      // calls showOutput to display current weather for specified city name.
            error: function() {
                $("#message").text("Forecast for Developers website got busy processing your request. Please try again later.");
            }
        });
    };


    findWeather = function(address) {
        url1 = 'http://maps.googleapis.com/maps/api/geocode/json';      //Gets longitude and lattitude from Googleapi.
        var dataparam = {
            sensor: false,                           //these 2 parameters required to send to Google api to get latitude and longitude.
            address: address
        };
        $.ajax ({                                    //makes ajax call
            data: dataparam,
            dataType: "json",
            url: url1,
            success: getForecast,           //calls back (getForecast)Forecast for Developers api to find weather for that lat and long.
            error: function() {
                 $("#message").text("Enter a proper city name.");
            }

        });
    };
    $("#search-id").keydown(function(e){
        if(e.keyCode === 13) {
            getInfo();
        }
    });

});
