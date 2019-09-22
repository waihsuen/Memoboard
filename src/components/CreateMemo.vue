<template>
  <div>
    <form class="addNewContainer" @submit="newMemo">
      <input
        v-model="title"
        type="text"
        size="15"
        maxlength="15"
        name="title"
        placeholder="Add new title"
      />
      <input
        v-model="body"
        type="text"
        size="15"
        maxlength="15"
        name="body"
        placeholder="Add new idea"
      />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateMemo",
  data() {
    return {
      title: "",
      body: ""
    };
  },
  methods: {
    newMemo(e) {
      e.preventDefault();

      const newMemoData = {
        title: this.title,
        body: this.body
      };

      this.$emit("add-memo", newMemoData);
    }
  }
};
</script>

<style scoped>
.addNewContainer {
  width: 150px;
  height: 150px;
  background-color: lightblue;
}
</style>