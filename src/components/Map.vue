<template>
  <div class="wholePage" style="text-align: center; width: 100vw">
    <google-map
      :center="myCoordinates"
      :zoom="zoom"
      style="width: 100vw; height: 100vh; max-width: 100%; margin: 0 auto"
      ref="mapRef"
      @dragend="handleDrag"
    >
      <marker-info
        :position="infoPosition"
        :opened="infoOpened"
        :content="infoContent"
        :options="infoOptions"
        @closeclick="infoOpened = false"
      />

      <div v-if="this.savedLocations.length > 0">
        <markermap
          :key="index"
          v-for="(m, index) in this.savedLocations"
          :position="{ lat: m.position.lat, lng: m.position.lng }"
          :clickable="true"
          :draggable="false"
          @click="postInfo(m)"
        />
      </div>
    </google-map>
    <a class="float" v-show="signedIn"
      ><router-link
        :to="{ name: 'AddPost' }"
        style="text-decoration: none; color: white"
        ><h5>Create Post</h5></router-link
      ></a
    >
  </div>
</template>

<script>
import { firebase } from "@firebase/app";
import "@firebase/auth";
import { db } from "../main";

export default {
  data() {
    return {
      // check for sign in:
      signedIn: false,
      username: '',

      // map information:
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      zoom: 12,

      // location:
      savedLocations: [],

      // information about each post:
      infoPosition: null,
      infoOpened: false,
      infoContent: null,
      infoOptions: {
        content: "",
      },
    };
  },
  mounted() {
    const Vue = this;
    // reference to list of posts
    var ref = db.ref("PhotoGallery");

    ref.on(
      "value",
      function (snapshot) {
        snapshot.forEach((childSnapshot) => {
          Vue.savedLocations.push(childSnapshot.val());
        });
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    console.log(Vue.savedLocations);
    // add map to data object
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  created() {
    // does user have saved center? use it instead of default:
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      //get coordinates from browser request
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates;
        })
        .catch((error) => alert(error));
    }

    // does user have saved zoom level? use it instead of default:
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.signedIn = true;
        this.username = user.email;
      } else {
        this.signedIn = false;
      }
    });
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }
      return {
        lat: this.map.getCenter().lat().toFixed(4),
        lng: this.map.getCenter().lng().toFixed(4),
      };
    },

    dataCoordinates() {
      if (this.savedLocations.length > 0)
        return this.savedLocations.flatMap((obj) =>
          Object.values(obj.position)
        );
      return [];
    },
  },
  methods: {
    handleDrag() {
      // get center and zoom level
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },

    postInfo: function (marker) {
      this.infoPosition = marker.position;
      this.infoOpened = true;
      this.infoOptions.content = `<p style="color:black;font-size:20px;font-weight:bold;padding-top:5px;">${marker.title}</p>
            <p style="font-size: 15px;color:black;">${marker.address}</p>
            <br/>
            <p style="font-size:15px;color:gray;">Created by: ${marker.createdBy}</p>
            <br/>
            <div style="width:300px;text-align:center;margin:0 auto;">
                <img src="${marker.photo}" style="width:100%;"/>
            </div>`;
        console.log(marker.photo);
    }
  }
};
</script>

<style scoped>
.wholePage {
  background-color: #4b515d;
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
  background-color: #dc3545;
  color: #fff;
  border-radius: 15px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  text-decoration: none;
  z-index: 1;
}
.float:hover {
  background-color: #c82333;
}

.float h5 {
  vertical-align: center;
  padding: 17px;
}

.imgTitle {
  color: black;
}
</style>