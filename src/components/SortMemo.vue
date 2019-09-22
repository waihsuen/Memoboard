<template>
  <div>
    Sort Memo By :
    <select class="custom-select" @change="sortMemo($event)">
      <option value="title" selected>Title</option>
      <option value="createdate">Create Date</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SortMemo",
  methods: mapActions(["sortMemo"])
};
</script>

<style scoped>
.custom-select {
  -webkit-appearance: menulist;
}

</style>