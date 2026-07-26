(function () {
  var el = document.querySelector('.weather');
  var temp = el && el.querySelector('.weather-temp');
  if (!el || !temp) return;

  var lat = el.getAttribute('data-lat');
  var lon = el.getAttribute('data-lon');
  var tz = el.getAttribute('data-tz');
  if (!lat || !lon) return;

  var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat +
    '&longitude=' + lon +
    '&current=temperature_2m' +
    '&timezone=' + encodeURIComponent(tz || 'auto');

  fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var value = data && data.current && data.current.temperature_2m;
      if (typeof value === 'number') {
        temp.textContent = Math.round(value) + 'º';
      }
    })
    .catch(function () {
      // Leave the static fallback temperature in place.
    });
})();
