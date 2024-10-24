$(function () {

  init();

});

function init() {

  loadJson();

}

function loadJson() {
  const DUBLINBIKE = './assets/data/dublinbike.json';

  $.getJSON(DUBLINBIKE, function (stations) {

    displayStations(stations);
    searchBike(stations);
    clickDetails(stations);

  });
}

function displayStationDetails(station) {
  $('#stationDetail').html(`
    <p><strong>Name:</strong> ${station.name}</p>
    <p><strong>Address:</strong> ${station.address}</p>
    <p><strong>Bikes Available:</strong> ${station.available_bikes}</p>
    <p><strong>Bike Stands:</strong> ${station.bike_stands}</p>
    <p><strong>Status:</strong> ${station.status}</p>
  `);
}

function displayStations(stationData) {

  $('#stationList').empty();
  stationData.forEach(function (station) {
    $('#stationList').append(`
      <div class="station-item" data-id="${station.number}">
        ${station.name}
      </div>
    `);
  });

}

function searchBike(stations) {

  $('#searchInput').on('input', function () {

    const searchValue = $(this).val().toLowerCase();
    const filteredStations = stations.filter(station => station.name.toLowerCase().includes(searchValue));

    displayStations(filteredStations);
    clickDetails(filteredStations);

  });

}

function clickDetails(stations) {

  $('#stationList').on('click', '.station-item', function () {

    const stationId = $(this).data('id');
    const selectedStation = stations.find(station => station.number == stationId);

    displayStationDetails(selectedStation);

  });

}
