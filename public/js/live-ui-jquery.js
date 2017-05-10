$(document).ready(function () {
    
    ////////////////////////////
    // selector/dropdown of hotels/activities/restaurants

    // function to create html
    var dropdownCreator = function (arr) {
        let elements = $();
        arr.forEach(elem => {
            elements = elements.add('<option value=\"' + 
                elem.id + '\">' + elem.name + '</option>');
        });
        return elements;
    };

    // add to dom
    $('#hotel-choices').append(dropdownCreator(hotels));
    $('#restaurant-choices').append(dropdownCreator(restaurants));
    $('#activity-choices').append(dropdownCreator(activities));

    ////////////////////////////
    // data accessing for functions
    let arrData = { 
        hotel: hotels, 
        restaurant: restaurants, 
        activity: activities 
    };
    let itinerary_names_plural = { 
        hotel: 'hotels', 
        restaurant: 'restaurants', 
        activity: 'activities' 
    };
    
    ////////////////////////////
    // add from selector/dropdown to itinerary!
    let addToItinerary = function (name) {
        $('#' + name + '-adder').on('click', '.btn', function(event) {
            event.stopPropagation();
            // select and make new item
            let elements = $(this).siblings('#' + name + '-choices');
            let id = elements.val();
            let text = elements
                .children()
                .filter((i, elem) => elem.value == id)
                .text();
            let newItem = $('<div class=\"itinerary-item\"><span class=' + 
                '\"title\">' + text + '</span><button class=\"btn btn-xs ' + 
                'btn-danger remove btn-circle\">x</button></div>');

            // make new marker, move to it 
            let coords = arrData[name]
                .filter(datum => datum.id == id)[0]
                .place
                .location;
            map.panTo(new google.maps.LatLng(coords[0], coords[1]));
            let marker = window.drawMarker(itinerary_names_plural[name], coords);
            
            console.log(newItem)
            
            newItem.data({ id: id, marker: marker});
            $('#' + name + '-list-group').append(newItem);
        });
    };

    // add to dom
    let itinerary_names = ['hotel', 'restaurant', 'activity'];
    itinerary_names.forEach(item => { addToItinerary(item) });
    
    //////////////////////////
    // removing events
    $('#itinerary').on('click', '.btn', function(event){
        event.stopPropagation();
        let marker = $(this).parent().data('marker');
        marker.setMap(null);
        $(this).parent().remove();
    });

    ///////////////////////
    // adding days
    let day = 1;
    $('.add-day').on('click', '.btn', function(event){
        event.stopPropagation();
        let newDay = $('<span>' + day++ + '</span><button ' + 
            'class="btn btn-xs btn-danger remove btn-circle">x</button>');

        $('#day-title').append(newDay);
    });

});

