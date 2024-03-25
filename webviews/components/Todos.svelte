<script lang="ts">
  import { onMount } from "svelte";
  import type { User } from "../../src/types";

  export let user: User | null = null;

  let newTodo = "";
  let todos: Array<{ text: string; isDone: boolean }> = [];

  $: isAddButtonDisabled = !newTodo || newTodo.length === 0;

  const handleAddTodo = () => {
    if (!newTodo || newTodo.length === 0) return;
    todos = [...todos, { text: newTodo, isDone: false }];
    newTodo = "";
  };

  onMount(async () => {
    window.addEventListener("message", async (event: any) => {
      const message = event.data;
      switch (message.type) {
        case "new-todo": {
          todos = [{ text: message.value, isDone: false }, ...todos];
          break;
        }
      }
    });
  });
</script>

{#if !user}
  <p>Login to see the todos!</p>
{:else}
  <div>
    <h1>To-do list</h1>
    <div>
      <form>
        <input bind:value={newTodo} type="text" placeholder="Add a new to-do" />
        <button
          disabled={isAddButtonDisabled}
          on:click|preventDefault={handleAddTodo}>Add</button
        >
      </form>
    </div>
    <ul>
      {#each todos as todo}
        <li>{todo.text}</li>
      {/each}
    </ul>
  </div>
{/if}
