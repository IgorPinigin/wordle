<template>
  <div class="keyboard">
    <div class="row" v-for="(row) in letters">
      <div
        class="letter"
        v-for="(letter) in row"
        @click="emitLetter(letter)"
        :class="letterColor(letter)"
        >
        {{ letter }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  targets: Object,
});
const emit = defineEmits(["enterLetter", "checkWord"]);
const emitLetter = (letter) => {
  if (letter === "ВВОД") {
    emit("checkWord");
  } else {
    emit("enterLetter", letter);
  }
};
const letterColor = (letter) => {
  return props.targets[letter];
};
const letters = [
  ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ"],
  ["Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э"],
  ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", "ВВОД"],
];
</script>
<style scoped>
.row {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  margin-bottom: 8px;
}
.keyboard {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 20px;
  width: fit-content;
  background-color: rgba(0, 0, 0, 0.274);
  box-shadow: 0px 3px 15px 5px rgba(0, 0, 0, 0.205);
  margin-left: auto;
  margin-right: auto;
}
.letter {
  font-family: "Courier New", Courier, monospace;
  font-weight: 600;
  padding: 18px 22px;
  font-size: 20px;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 10px;
  margin-right: 8px;
  color: white;
  cursor: pointer;
  box-shadow: 0px 3px 15px 5px rgba(0, 0, 0, 0.205);
}
.letter:hover {
  background-color: rgba(255, 255, 255, 0.349);
  box-shadow: 0px 3px 15px 5px rgba(211, 211, 211, 0.205);
}
.letter:active {
  background-color: rgba(255, 255, 255, 0.637);
}
.green {
  background-color: #45b649;
}
.yellow {
  background-color: #fff23d;
}
.grey{
  background-color: #bbbbbb;
}
</style>
