<script setup>
import { onMounted, ref, reactive } from "vue";
import InputNew from '../components/InputNew.vue';
import Navbar from '../components/Navbar.vue';

const count = ref(0);

let boards = reactive([
  //{
    //id: crypto.randomUUID(),
    //name: "Pendientes",
    //items: [{ id: crypto.randomUUID(), title: "Hola a todos" }],
  //},
]);
function startDrag(evt, boardId, itemId) {
  console.log(boardId, itemId);
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("item", JSON.stringify({ boardId, itemId }));
}
function onDrop(evt, dest) {
  const { boardId, itemId } = JSON.parse(evt.dataTransfer.getData("item"));
  console.log({ boardId, itemId });
  const board = boards.find((board) => board.id === boardId);
  const item = board.items.find((item) => item.id === itemId);
  board.items = board.items.filter((i) => i.id !== item.id);
  dest.items.push({ ...item });
}
function handleNewItem(text, board) {
  console.log(text.value);
  board.items.push({ id: crypto.randomUUID(), title: text.value });
}
function createNewBoard() {
  const name = prompt("Nombre de la tabla");
  if (name) {
    const board = {
      id: crypto.randomUUID(),
      name: name,
      items: [],
    };
    boards.push(board);
  }
}

</script>

<template>
  <Navbar/>
    <div class="titulo">
        <h1>Tablero Kanban</h1>
        <p class="descripcion">El tablero Kanban es una herramienta muy útil para la organización de actividades o proyectos y es utilizada en las grandes empresas, se trata de varias listas cuyos puntos pueden cambiarse de la lista en la que se encuentran arrástrandolos con el cursor</p>
        <h3>Da click en crear tabla para comenzar</h3>
    </div>
    <div>
        <div class="centrar">
            <button type="button" class="btn btn-outline-warning btncrear" @click="createNewBoard">Create board</button>
        </div>

        <div class="boards-container">
            <div class="boards">
                <div
                    class="board"
                    @drop="onDrop($event, board)"
                    @dragover.prevent
                    @dragenter.prevent
                    v-for="board in boards"
                    :key="board.id"
                >
                    {{ board.name }}
                    <div class="input1">
                        <InputNew @on-new-item="(text) => handleNewItem(text, board)" />
                    </div>
                    <div
                        class="item drag-el"
                        draggable="true"
                        @dragstart="startDrag($event, board.id, item.id)"
                        v-for="item in board.items"
                        :key="item.id"
                    >
                        {{ item.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>