<template>
  <div>NUMEN - Building ID: {{ building.id }}</div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    building: Object
  }
}
</script>
