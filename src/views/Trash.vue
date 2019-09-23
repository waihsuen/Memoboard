<template>
  <div class="trashedMemoHolder">
    <TrashedMemoHolder
      msg="(coming soon) Wanted to create a page that all trashed ideas/memos comes here before being able to be deleted permanently."
    />
  </div>
</template>

<script>
import TrashedMemoHolder from "../components/TrashedMemosHolder";

export default {
  name: "Trash",
  components: {
    TrashedMemoHolder
  }
};
</script>


<style scoped>
.trashedMemoHolder {
  max-width: 900px;
  margin: 100px auto;
}
</style>
