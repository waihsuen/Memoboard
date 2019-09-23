<template>
  <div>
    <transition
          name="fade"
          enter-active-class="animated fadeInUp delay-2s"
          leave-active-class="animated fadeOutUp delay-2s"
        >
    <div class="memoItem">
      <div class="inputContainer">
        <input
          @blur="titleOnBlurHandler(memo.id, memo.title, memo.body)"
          v-model="memo.title"
          type="text"
          name="title"
          size="15"
          maxlength="15"
          placeholder="Title goes here"
        />
      </div>
      <div class="textareaContainer">
        <textarea
          @blur="bodyOnBlurHandler(memo.id, memo.title, memo.body)"
          v-on:keyup="bodyChangeHandler()"
          v-model="memo.body"
          type="text"
          name="body"
          size="140"
          maxlength="140"
          rows="4"
          placeholder="Please input your idea/memo here"
        />
      </div>

      <div class="cardFooter">
        <div class="cardFooterContainer">
          <div
            class="charLeft"
            v-bind:class="{'is-showCharLeft':(this.messageLengthLeft <= 15)}"
          >{{ messageLengthLeft }} left</div>
          <i @click="trashClickedHandler(memo.id)" class="trash fas fa-trash"></i>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VAnimateCss from "v-animate-css";

export default {
  name: "Item",
  components: {},
  // directives: {
  //   focus: {
  //     // directive definition
  //     inserted: function(el) {
  //       el.focus();
  //     }
  //   }
  // },
  data() {
    return {
      messageLength: this.memo.body.length,
      status: ""
    };
  },
  props: {
    memo: Object
  },
  methods: {
    ...mapActions(["editMemo", "deleteMemo"]),

    titleOnBlurHandler(id, title, body) {
      this.editMemo({ id: id, title: title, body: body });
      //this.$emit("notification", this.status);
    },
    bodyOnBlurHandler(id, title, body) {
      this.editMemo({ id: id, title: title, body: body });
      //this.$emit("notification", this.status);
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
      return 140 - this.messageLength;
    }
  },
  // updated: function() {
  //   console.log('BBB');
  //   this.$nextTick(function() {
  //     console.log('xxxx');
  //   });
  // }
};
</script>


<style scoped>
input[name="title"] {
  font-size: 0.875rem;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  width: 100%;
  resize: none;
  box-sizing: border-box;
}

textarea:focus,
input:focus {
  border: 1px solid gray;
  outline: 1px solid gray;
  outline: 0px auto -webkit-focus-ring-color;
}

.memoItem {
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 0.75rem;
  background-color: #b3b2b2;
  margin: 10px;
  width: 150px;
  height: 150px;
}
.inputContainer {
  width: 100%;
  padding: 6px;
}
.textareaContainer {
  width: 100%;
  padding: 6px;
  background-color: #cbcbcb;
}

.trash {
  min-width: 20px;
  cursor: pointer;
}

.charLeft {
  margin: 0 0 0 4px;
  min-width: 20px;
  visibility: hidden;
}

.is-showCharLeft {
  visibility: visible;
}

.cardFooterContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px;
}
</style>
