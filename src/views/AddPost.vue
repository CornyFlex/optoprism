<template>
  <div>
    <b-form class="postForm" id="UploadForm" name="UploadForm">
      <h3 style="text-align: center">Add a post</h3>
      <b-form-group id="input-title" label-for="input_title">
        <h4>Title:</h4>
        <b-form-input
          id="input_title"
          required
          type="text"
          placeholder="Enter title"
          v-model="title"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <h4>Description:</h4>
        <b-form-textarea
          id="textarea"
          placeholder="Enter something..."
          rows="5"
          max-rows="10"
          v-model="description"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group>
        <h4>Location:</h4>
        <autocomplete
          ref="gmapAutocomplete"
          @place_changed="setPlace"
          placeholder="Enter an address here..."
          class="field_location"
        ></autocomplete>
      </b-form-group>

      <b-form-group id="input_image" label-for="input_image">
        <h4>Image:</h4>
        <b-form-file
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="previewImage"
          accept="image/*"
          v-model="file1"
          :state="Boolean(file1)"
          required
        ></b-form-file>
        <div class="mt-3">
          Selected file: {{ file1 ? file1.name : "" }}<br />
        </div>

        <div v-if="imageData != null">
          <img class="preview" height="268" width="356" :src="img1" />
          <br />
        </div>
      </b-form-group>

      <b-form-group style="text-align: left">
        <b-button
          size="lg"
          block
          variant="success"
          @click="create"
          type="submit"
          >Upload</b-button
        >
      </b-form-group>

      <b-form-group style="text-align: center" v-if="savingSuccessful">
        <b-button variant="primary" size="lg"
          ><router-link
            :to="{ name: 'MainMap' }"
            style="text-decoration: none; color: white"
            >Return Home</router-link
          ></b-button
        >
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import firebase from "firebase";
import { gmapApi } from "vue2-google-maps";
import { markerRef } from "../main";

export default {
  firebase: {
    markers: markerRef,
  },

  data: () => ({
    //form inputs
    title: "",
    description: "",
    img1: "",
    file1: "",
    imageData: null,

    //form validation
    savingSuccessful: false,

    //location
    currentPlace: null,
    places: [],
    markers: [],
  }),
  mounted() {
    this.geolocate;
  },
  computed: {
    google: gmapApi,
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    create() {
      var post = {
        photo: this.img1,
        title: this.title,
        description: this.description,
        position: {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        },
        address: this.$refs.gmapAutocomplete.$refs.input.value,
      };

      markerRef
        .push(post)
        .then((response) => {
          //log response and push to array
          console.log(response);

          //reset fields to default value
          this.title = "";
          this.description = "";
          this.img1 = "";
          this.file1 = "";
          this.$refs.gmapAutocomplete.$refs.input.value = "";
          this.currentPlace = "";

          //check validation
          this.savingSuccessful = true;
          this.$router.push("/");
        })
        .catch((err) => {
          //log error
          console.log(err);
        });
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.img-div {
  display: flex;
  margin: 25px;
}

img {
  max-width: 250px;
  margin: 15px;
}
.postForm {
  width: 50%;
  margin: 5% auto;
}
.success {
  margin: 5% auto;
}
.field_location {
  width: 100%;
  padding: 10px 10px;
}
</style>