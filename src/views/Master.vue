<template>
    <div id="app">
        <Navigation/>

        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'Master',
  components: {
    Navigation
  }
}
</script>