<template>
    <div class="wholePage" style="text-align:center;">
        <div class="displayCoordinates" style="display: flex;; align-items: center; justify-content: space-between;">
            <div>
                <h1>Your Coordinates:</h1>
                <p>{{ myCoordinates.lat.toFixed(4) }} Latitude, {{ myCoordinates.lng.toFixed(4) }} Longtitude</p>
            </div>
            <div>
                <h1>Map Coordinates:</h1>
                <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longtitude</p>
            </div>
        </div>
        <google-map
            :center="myCoordinates"
            :zoom="zoom"
            style="width:1000px; height: 700px; margin: 0 auto; margin-top: 20px;"
            ref="mapRef"
            @dragend="handleDrag"
        ></google-map>
    </div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            myCoordinates: {
                lat: 0,
                lng: 0
            },
            zoom: 12
        }
    },
    created() {
        // does user have saved center? use it instead of default:
        if(localStorage.center){
            this.myCoordinates = JSON.parse(localStorage.center);
        } else {
            //get coordinates from browser request
            this.$getLocation({})
                .then(coordinates => {
                    this.myCoordinates = coordinates;
                })
                .catch(error => alert(error));
        }

        // does user have saved zoom level? use it instead of default:
        if(localStorage.zoom) {
            this.zoom = parseInt(localStorage.zoom);
        }

    },
    mounted() {
        // add map to data object
        this.$refs.mapRef.$mapPromise.then(map => this.map = map);
    },
    methods: {
        handleDrag() {
            // get center and zoom level
            let center = {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            };
            let zoom = this.map.getZoom();

            localStorage.center = JSON.stringify(center);
            localStorage.zoom = zoom;
        }
    },
    computed: {
        mapCoordinates(){
            if(!this.map) {
                return {
                     lat: 0,
                     lng: 0
                };
            }
            return {
                lat: this.map.getCenter().lat().toFixed(4),
                lng: this.map.getCenter().lng().toFixed(4)
            }
        }
    }
}
</script>

<style scoped>
.displayCoordinates {
    padding: 0 10%;
    margin: 0 auto;
}

.displayCoordinates h1 {
    font-size: 25px;
    font-weight: bold;
}

.wholePage {
    margin-top: 30px;
}
</style>