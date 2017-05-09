$(document).ready(function () {
    ////////////////////////////
    // selector/dropdown of hotels/activities/restaurants

    // function to create html
    var dropdownCreator = function (arr) {
        let elements = $();
        arr.forEach(elem => {
            elements = elements.add('<option value=\"' + elem.id + '\">' + elem.name + '</option>');
        });
        return elements;
    };

    // add to dom
    $('#hotel-choices').append(dropdownCreator(hotels));
    $('#restaurant-choices').append(dropdownCreator(restaurants));
    $('#activity-choices').append(dropdownCreator(activities));


    ////////////////////////////
    // add from selector/dropdown to itinerary!

    $('#activity-adder').on('click', '.btn', (event) => {
        event.stopPropagation();
        let info = $(this).find('#activity-choices option:selected')

        var coords = activities.filter(function(activity){
            return activity.id == info.val();
        })[0].place.location;

        let newItem = $('<div class=\"itinerary-item\"><span class=\"title\">' +
                      info.text() + '</span><button class=\"btn btn-xs ' +
                      'btn-danger remove btn-circle\">x</button></div>');

        map.panTo(new google.maps.LatLng(coords[0], coords[1]));
        var markerIcon = window.drawMarker('activity', coords)

        $('#activity-list-group').append(newItem);
        newItem.data({id: info.val(), marker: markerIcon});
    });


      $('#restaurant-adder').on('click', '.btn', (event) => {
        event.stopPropagation();
        let info = $(this).find('#restaurant-choices option:selected')

        var coords = restaurants.filter(function(restaurant){
            return restaurant.id == info.val();
        })[0].place.location;

        let newItem = $('<div class=\"itinerary-item\"><span class=\"title\">' +
                      info.text() + '</span><button class=\"btn btn-xs ' +
                      'btn-danger remove btn-circle\">x</button></div>');

        map.panTo(new google.maps.LatLng(coords[0], coords[1]));
        var markerIcon = window.drawMarker('restaurant', coords)

        $('#restaurant-list-group').append(newItem);
        newItem.data({id: info.val(), marker: markerIcon});
    });



    $('#hotel-adder').on('click', '.btn', (event) => {
        event.stopPropagation();
        let info = $(this).find('#hotel-choices option:selected')

        var coords = hotels.filter(function(hotels){
            return hotels.id == info.val();
        })[0].place.location;

        let newItem = $('<div class=\"itinerary-item\"><span class=\"title\">' +
                      info.text() + '</span><button class=\"btn btn-xs ' +
                      'btn-danger remove btn-circle\">x</button></div>');

        map.panTo(new google.maps.LatLng(coords[0], coords[1]));
        var markerIcon = window.drawMarker('hotels', coords)

        $('#hotel-list-group').append(newItem);
        newItem.data({id: info.val(), marker: markerIcon});
    });


    $('#itinerary').on('click', '.btn', function(event){
        event.stopPropagation();
        var marker = $(this).parent().data('marker');
        marker.setMap(null);
        $(this).parent().remove();

    })

    $('.add-day').on('click', '.btn', function(event){
        event.stopPropagation();


        var newDay = $('<span>' + day + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button>');

        $('#day-title').append(newDay);
    })

    // var addToItinerary = function (name) {
    //     $('#' + name + '-adder').on('click', '.btn', function (event) {
    //             event.stopPropagation();
    //             // let siblings = $(this).siblings()
    //             // let selector = '#' + name + '-choices'
    //             // console.log(siblings)
    //             // console.log(selector)

    //             let elements = $(this).siblings('#' + name + '-choices');
    //             console.log(elements)
    //             console.log(elements.val())
    //             console.log(elements.children())
    //             // console.log(item.children().eq(item.val()-1).text())
    //             console.log(elements.children().filter((elem) => elem.value == items.val()))

    //             // // console.log(selectedElem)
    //             // let newItem = '<div class=\"itinerary-item\"><span class=\"title\">' +
    //             //               info.text() + '</span><button class=\"btn btn-xs ' +
    //             //               'btn-danger remove btn-circle\">x</button></div>';
    //             // $('#' + name + '-list-group').append(newItem);
    //     });
    // };

    // add to dom
    // var itinerary_names = ['hotel', 'restaurant', 'activity']
    // itinerary_names.forEach(item => { addToItinerary(item) });



    // Map Updating




});

