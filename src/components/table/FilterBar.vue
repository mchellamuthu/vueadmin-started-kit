<template>
  <div class="col-md-4 pl-0 mt-2 float-right">
    <div class="input-group mb-3">
  <input type="text" v-model="filterText"  class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-primary" @click="doFilter" type="button">Go</button>
    <button class="btn btn-outline-secondary" @click="resetFilter" type="button">Reset</button>
  </div>
</div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      this.$events.fire('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = ''
      this.$events.fire('filter-reset')
    }
  }
}
</script>