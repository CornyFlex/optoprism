<template>
  <div>
    <Map/>

    <router-view/>
  </div>
</template>

<script>
import Map from '@/components/Map';

export default {
  name: 'MainMap',
  components: {
    Map
  }
}

</script>
