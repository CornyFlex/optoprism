<template>
  <div class="about">
    <b-container style="width:80%;text-align:right;margin-top:5%;">
      <div class="header">
        <h1>Are you ready to show the world what you can do?</h1>
        <br/>
        <h2>Sign up now and enjoy the benefits of sharing your work with others!</h2>
        <br/><br/>
        <b-button size="lg" variant="danger" router-link :to="{ name: 'Register' }" style="text-decoration:none;color:white;">Get Started</b-button>
      </div>

    </b-container>

    <b-container class="footer">
      <b-row>
        <b-col class="column"><h2>Make your images seen by others!</h2></b-col>
        <b-col class="column"><h2>Keep a personal record of all the things you've posted!</h2></b-col>
        <b-col class="column"><h2>Connect with the world!</h2></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.header {
  width: 45%;
  text-align: left;
  clear:both;
}
.footer {
  width: 100%;
  margin-top: 5%;
  vertical-align: middle;
  color: white;
}
.column {
  background-color: #828282;
  margin: 0px 10px;
  border-radius: 25px;
}
.column h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
}
</style>