// Validation
// ---------------------------------

export function weatherDataValidation(data) {
    if (!data.token) return '[ERROR] No token set';
    if (!data.temp) return '[ERROR] got no temperature data';
    if (!data.hum) return '[ERROR] got no humidity data';
    if (!data.pres) return '[ERROR] got no pressure data';

    return false;
}
