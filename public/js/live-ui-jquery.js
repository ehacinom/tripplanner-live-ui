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
    let itinerary_names = ['hotel', 'restaurant', 'activity'];
    let dayMaster = [{ hotel: [], restaurant: [], activity: []}];
    window.dayMaster = dayMaster;
    let currentDayIndex = 0;

    ////////////////////////////
    // add event from selector/dropdown to itinerary!
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

            // data
            newData = { 
                id: id, 
                marker: marker, 
                destinationName: text, 
                destinationType: name 
            };
            
            // add to dom
            newItem.data(newData);
            $('#' + name + '-list-group').append(newItem);
            
            // add to daymaster
            dayMaster[currentDayIndex][name].push(newData);
            
            console.log('daymaster', dayMaster)
        });
    };

    // add to dom
    itinerary_names.forEach(item => { addToItinerary(item) });

    //////////////////////////
    // removing events
    $('#itinerary').on('click', '.btn', function(event){
        event.stopPropagation();
        let parent = $(this).parent();
        
        // remove associated marker
        parent.data('marker').setMap(null);        
        
        // remove from master
        let destinationType = parent.data('destinationType')
        let id = parent.data('id');
        
        dayMaster[currentDayIndex][destinationType] =
            dayMaster[currentDayIndex][destinationType]
                .filter(datum => datum.id !== id);
        
        // remove row on itinerary
        $(this).parent().remove();
    });

    ///////////////////////
    // adding days
    $('.add-day').on('click', '.btn', function(event){
        event.stopPropagation();
        
        // add to master
        dayMaster.push({ hotel: [], restaurant: [], activity: []});
        let day = dayMaster.length;
        currentDayIndex = day-1;
        
        // add button to dom
        var newDay = $('<button class="btn btn-circle day-btn current-day">' + 
            day + '</button>');
        $('.day-buttons')
            .children(':last-child')
            .removeClass('current-day');
        $('.day-buttons').append(newDay);
        
        // remove old itinerary
        $('.list-group').empty();
        
        // add new itinerary
    });
    
    /////////////////////
    // switching between days
    
    $('.day-buttons').on('click', '.btn', function(event) {
        event.stopPropagation();
        $(this).parent().children().removeClass('current-day');
        $(this).addClass('current-day');
        
        // remove old itinerary
        $('.list-group').empty();
        
        // add new itinerary
        currentDayIndex = Number($(this).text()) - 1     
        itinerary_names.forEach(name => {
            dayMaster[currentDayIndex][name].forEach(event => {
                let newItem = $('<div class=\"itinerary-item\"><span class=' +
                    '\"title\">' + event.destinationName + 
                    '</span><button class=\"btn btn-xs ' +
                    'btn-danger remove btn-circle\">x</button></div>');
                $('#' + name + '-list-group').append(newItem);
            })
        });
        
    });
    

});





















