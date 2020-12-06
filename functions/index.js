const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.database;
const db = database();

const axios = require("axios");
const cors = require("cors")({
    origin: true
});

const googleMapsApiKey = "AIzaSyCt-2hDJH6w6yw7_VRVDjiyPB-7j8jnuII";

exports.geocodeAddressAndSave = functions.https.onRequest(
    async(request, response) => {
        try {
            const address = request.body.address;
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`);

            if (data.status !== "OK") {
                return cors(request, response, () => {
                    response.status(200).send("No results.");
                })
            }

            const geoCodedLocation = data.results[0];

            const objGeocodedLocation = {
                address: geoCodedLocation.formatted_address,
                geoPoint: new admin.database.geoPoint(geoCodedLocation.geometry.location.lat, geoCodedLocation.geometry.location.lng)
            }

            await db.collection('PhotoGallery').add(objGeocodedLocation);

            return cors(request, response, () => {
                response.status(200).send(objGeocodedLocation);
            });

        } catch (error) {
            functions.logger.error(error.message);
            response.status(500).send();
        }
        response.send();
    });