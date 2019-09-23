<template>
  <!-- <CreateMemo v-on:add-memo="newMemoHandler" /> -->

  <div class="mainContainer">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="6" class="buttonAlign">
          <button class="button" @click="createNewMemo()">Create New Memo</button>
        </v-col>
        <v-col cols="12" sm="6" class="sorterAlign">
          <SortMemo />
        </v-col>
      </v-row>
    </v-container>

    <div class="memoContainer">
      <div class="memoCards" v-bind:key="memo.id" v-for="memo in allMemos" v-focus>
        <Item v-on:notification="notificationHandler" v-bind:memo="memo" />
      </div>
    </div>

    <div class="text-center ma-2">
      <!-- <v-btn dark @click="snackbar = true">Open Snackbar</v-btn> -->
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Item from "../components/Item";
// import CreateMemo from "../components/CreateMemo";
import SortMemo from "../components/SortMemo";

let startFocus = false;

export default {
  name: "Memos",
  components: {
    Item,
    // CreateMemo,
    SortMemo
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        if (startFocus) {
          el.querySelector("input").focus();
        }
      }
    }
  },
  props: [],
  data() {
    return {
      isAppFullloaded: false,
      snackbar: false,
      timeout: 1200,
      text: "Memo Saved"
    };
  },
  methods: {
    ...mapActions(["fetchMemos", "addMemo"]),
    newMemoHandler(memoData) {
      this.addMemo(memoData);
    },
    createNewMemo() {
      const newMemo = {
        title: "",
        body: ""
      };
      this.addMemo(newMemo);
    },
    // addedMemoHandler(memoData) {
    //   console.log("memoID", memoID);
    // },
    notificationHandler(status) {
      if (this.isAppFullloaded) {
        console.log("notification", status);
      }
    }
  },
  computed: {
    ...mapGetters(["allMemos"]),
    ...mapGetters(["saveState"])
  },
  created() {
    startFocus = false;
    this.fetchMemos();
  },
  watch: {
    allMemos: function() {
      if (this.isAppFullloaded) {
        console.log("allMemos state update");
        // this.snackbar = true;
      }
    },
    saveState: function() {
      this.snackbar = true;
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.isAppFullloaded = true;
    });
  },
  updated: function() {
    // Entire view has been updated with data
    startFocus = true;
  },
  beforeDestroy: function() {
    startFocus = false;
  }
};
</script>

<style scoped>
.mainContainer {
  margin: 0 auto;
  max-width: 900px;
}
.memoContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.actionContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.button {
  background-color: #443ca9;
  border: none;
  color: white;
  margin: 10px 0;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  border-radius: 32px;
}

.sorterAlign {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.delay {
  transition-delay: 1000ms;
  animation-delay: 1000ms;
}

@media only screen and (max-width: 600px) {
  .sorterAlign {
    justify-content: flex-start;
    margin-top: 20px;
  }
  .buttonAlign {
    text-align: center;
  }
  .memoContainer {
    display: block;
    margin: 0px 20px 0px 0px;
  }
}
</style>