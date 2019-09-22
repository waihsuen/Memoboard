<template>
  <div>
      Sort Memo By:
      <select @change="sortMemo($event)">
          <option value="title">Title</option>
          <option value="createdate">Create Date</option>
      </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'SortMemo',
    methods: mapActions(['sortMemo'])
}
</script>

<style>

</style>