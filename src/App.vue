<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import KeyboardWordle from "./components/KeyboardWordle.vue";

const WORD = ["П", "Е", "Т", "Л", "Я"];
const words = ref([]);
const targets = ref([]);
const keyboardTargets = ref({});
const inputField = ref(null);
const inputValue = ref("");

const checkWord = () => {
  if (arrayWord.value.length === 5) {
    let target = [];
    arrayWord.value.forEach((letter, index) => {
      if (WORD[index] === letter) {
        keyboardTargets.value[letter.toUpperCase()] = "green";
        target.push("green");
      } else if (WORD.includes(letter)) {
        keyboardTargets.value[letter.toUpperCase()] = "yellow";
        target.push("yellow");
      } else {
        keyboardTargets.value[letter.toUpperCase()] = "grey";
        target.push("");
      }
    });
    targets.value.push(target);
    nextTick();
    words.value.push(arrayWord.value);
    inputValue.value = "";
  }
};

const addLetter = (letter) => {
  inputValue.value += letter[0];
};

onMounted(() => {
  inputField.value.focus();
});

const arrayWord = computed(() => {
  if (inputValue.value.length > 4) {
    inputValue.value = inputValue.value.slice(0, 5);
  }
  return inputValue.value.toUpperCase().split("");
});

const letterColor = (i, j) => {
  return targets.value[i][j];
};
</script>

<template>
  <div class="game-back" @click="inputField.focus()">
    <div class="game-field">
      <div class="one-word" v-for="(word, ind) in words">
        <div
          class="tail"
          v-for="(letter, indx) in word"
          :class="letterColor(ind, indx)"
        >
          {{ letter }}
        </div>
      </div>
      <div class="one-word">
        <div class="tail" v-for="letter in arrayWord">{{ letter }}</div>
      </div>
      <input
        ref="inputField"
        v-model="inputValue"
        @input="console.log(arrayWord)"
        type="text"
        style="opacity: 0; cursor: default"
        @keypress.enter="checkWord"
      />
    </div>

    <div class="keyboard">
      <KeyboardWordle
        @enterLetter="addLetter"
        @checkWord="checkWord"
        :targets="keyboardTargets"
      ></KeyboardWordle>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
}

.game-back {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(#dce35b, #45b649);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.game-field {
  width: 400px;
  height: 490px;
  background-color: rgb(236, 236, 236);
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 3px 15px 5px rgba(0, 0, 0, 0.205);
  border-radius: 20px;
  padding: 8px;
}

.tail {
  font-family: "Courier New", Courier, monospace;
  cursor: pointer;
  text-align: center;
  font-size: 50px;
  align-items: center;
  /* width: 73.6px; */
  padding: 9px 22px;

  background-color: rgb(197, 209, 209);
  border-radius: 12px;
  margin-right: 8px;
  box-shadow: inset 0px 0px 5px 3px rgba(0, 0, 0, 0.205);
}
.tail:last-child {
  margin-right: 0px;
}
.one-word {
  display: flex;
  margin-bottom: 8px;
}

.green {
  background-color: #45b649;
}
.yellow {
  background-color: #fff23d;
}
</style>
