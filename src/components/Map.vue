<template>
    <div class="wholePage" style="text-align:center; width: 100vw;">
        <div class="displayCoordinates" style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
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
            style="width:100vw; height: 100vh; max-width: 100%; margin: 0 auto; margin-top: 20px;"
            ref="mapRef"
            @dragend="handleDrag"
        ></google-map>

        <a href="#" class="float">
            <h5>Create Post</h5>
        </a>
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
    margin: 0 auto;
    width: 40vw;
    padding: 20px 20px 0px 20px;
}
.displayCoordinates h1 {
    font-size: 25px;
    font-weight: bold;
    padding: 0px 10px;
}
.displayCoordinates p {
    padding: 0px 10px;
}

.wholePage {
    background-color: #4B515D;
    color: white;
    max-width: 100%;
}

.float {
    position: fixed;
    width: 150px;
    height: 60px;
    bottom: 100px;
    right: 0px;
    left: 0px;
    margin-right: auto;
    margin-left: auto;
    background-color:#dc3545;
    color:#FFF;
    border-radius:15px;
	text-align: center;
	box-shadow: 2px 2px 3px #999;
    text-decoration: none;
}

.float:hover {
    background-color: #c82333;
}

.float h5 {
    vertical-align: center;
    padding: 17px;
}

</style>