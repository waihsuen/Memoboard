<template>
  <div>
    <SortMemo />
    <CreateMemo v-on:add-memo="newMemoHandler" />
    <div class="memoContainer" v-bind:key="memo.id" v-for="memo in allMemos">
      <Item v-bind:memo="memo" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Item from "../components/Item";
import CreateMemo from "../components/CreateMemo";
import SortMemo from "../components/SortMemo";

export default {
  name: "Memos",
  components: {
    Item,
    CreateMemo,
    SortMemo
  },
  props: [],
  methods: {
    ...mapActions(["fetchMemos", "addMemo"]),
    newMemoHandler(memoData) {
      this.addMemo(memoData);
    }
  },
  computed: mapGetters(["allMemos"]),
  created() {
    this.fetchMemos();
  }
};
</script>

<style scoped>
.memoContainer {
  float: left;
}
</style>