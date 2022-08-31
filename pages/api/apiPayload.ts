const bookingPayload = {
        "firstname" : "Gokul",
        "lastname" : "Test",
        "totalprice" : 150,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
}


const updatedPayload = {
    "firstname" : "Update-gokul",
    "lastname" : "Update-test",
    "totalprice" : 200,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Lunch"
}

export {bookingPayload, updatedPayload};