<template>
  <div>
    <div class="memoItem">
      <input
        @blur="titleOnBlurHandler(memo.id, memo.title, memo.body)"
        v-model="memo.title"
        type="text"
        name="title"
        size="15"
        maxlength="15"
      />
      <input
        @blur="bodyOnBlurHandler(memo.id, memo.title, memo.body)"
        v-on:keyup="bodyChangeHandler()"
        v-model="memo.body"
        type="text"
        name="body"
        size="20"
        maxlength="20"
      />
      <i @click="trashClickedHandler(memo.id)" class="fas fa-trash"></i>
      <div
        class="charLeft"
        v-bind:class="{'is-showCharLeft':(this.messageLengthLeft <= 15)}"
      >{{ messageLengthLeft }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Item",
  components: {},
  data() {
    return {
      messageLength: this.memo.body.length
    };
  },
  props: {
    memo: Object
  },
  methods: {
    ...mapActions(["editMemoTitle", "deleteMemo"]),

    titleOnBlurHandler(id, title, body) {
      this.editMemoTitle({ id: id, title: title, body: body });
    },
    bodyOnBlurHandler(id, title, body) {
      this.editMemoTitle({ id: id, title: title, body: body });
    },
    bodyChangeHandler() {
      this.messageLength = this.memo.body.length;
    },
    trashClickedHandler(id) {
      this.deleteMemo({ id: id });
    }
  },
  computed: {
    messageLengthLeft: function() {
      return 20 - this.messageLength;
    }
  }
};
</script>


<style scoped>
input[name="title"] {
  font-size: 1rem;
}

.memoItem {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  background-color: bisque;
  margin: 10px;
  padding: 10px;
  width: 150px;
}

.charLeft {
  visibility: hidden;
}

.is-showCharLeft {
  visibility: visible;
}
</style>
