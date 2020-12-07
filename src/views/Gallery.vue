<template>
  <div>
    <h2>See what people around you see!</h2>
    <b-container>
      <div v-for="(m, index) in this.savedPosts" :key="index">
        <b-row class="postRow">
          <div class="imageDisplay">
            <img v-bind:src="m.photo" style="width: 100%;max-height:350px;" />
          </div>
          <div class="postInformation">
            <h2 style="font-weight:bold;">{{ m.title }}</h2>
            <p style="font-size: 15px; color: black">{{ m.address }}</p>
            <br />
            <p syle="font-size: 15px; color: black">{{ m.description }}</p>
            <br/>
            <p style="font-size: 15px; color: gray">{{ m.createdBy }}</p>
            <br />
          </div>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { db } from "../main";

export default {
  name: "Gallery",
  data() {
    return {
      savedPosts: [],
    };
  },
  mounted() {
    const Vue = this;

    var ref = db.ref("PhotoGallery");

    ref.on(
      "value",
      function (snapshot) {
        snapshot.forEach((childSnapshot) => {
          Vue.savedPosts.push(childSnapshot.val());
        });
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );

    console.log(Vue.savedPosts);
  },
};
</script>

<style scoped>
.imageDisplay {
  width: 30%;
  float: left;
  padding: 0px 10px;
}

.postInformation {
  width: 70%;
  float: left;
  clear: both;
  padding: 0px 10px;
}

.postRow{
    max-height: 350px;
    margin: 50px auto;
}
</style>