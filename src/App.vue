<template>
  <div id="app">
    <Navigation/>
    <Map/>
  </div>
</template>

<script>
import Map from './components/Map';
import Navigation from './components/Navigation';

export default {
  name: 'App',
  components: {
    Map,
    Navigation
  }
}
</script>

<style>
</style>
