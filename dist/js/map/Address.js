window.Address = (function() {
  function Address(address) {
    this.address = address;
  }

  Address.prototype.toLatLng$ = function() {
    var ajax;
    return ajax = $.ajax({
      type: 'GET',
      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + this.address,
      dataType: 'json',
      scriptCharset: 'utf-8'
    });
  };

  return Address;

})();
