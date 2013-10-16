var toRad = function (value) {
    return value * Math.PI / 180;
}

var getDistance1 = function (lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
}

var getDistance = function (b1, l1, b2, l2) {
    b1 = b1 / 180 * Math.PI;
    l1 = l1 / 180 * Math.PI;
    b2 = b2 / 180 * Math.PI;
    l2 = l2 / 180 * Math.PI;

    var la = Math.sin(b1) * Math.sin(b2) + Math.cos(b1) * Math.cos(b2) * Math.cos(l2 - l1);

    var e = Math.atan(Math.sin(b1) * Math.sin(b2) + Math.cos(b1) * Math.cos(b2) * Math.cos(l2 - l1));
    var result = e * 6378.137;

    return result;
}