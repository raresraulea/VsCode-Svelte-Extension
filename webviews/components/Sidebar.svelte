<script lang="ts">
  import { onMount } from "svelte";
  import Todos from "./Todos.svelte";
  import type { User } from "../../src/types";

  let user: User | null = null;
  let accessToken = "";
  let loading = true;

  onMount(async () => {
    window.addEventListener("message", async (event: any) => {
      const message = event.data;
      switch (message.type) {
        case "token":
          accessToken = message.value;
          const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          };

          const response = await fetch(`http://localhost:3002/me`, {
            method: "GET",
            headers,
          });

          if (!response) {
            console.error("No response returned from /me: ");
            return;
          }

          const data = await response.json();
          user = data.user;
          loading = false;
          break;
      }
    });
  });

  tsvscode.postMessage({ type: "get-token" });
</script>

{#if loading}
  <p>Loading...</p>
{:else if user}
  <p>Welcome, {user.name}!</p>
  <div>
    <Todos {user} />
    <!-- svelte-ignore missing-declaration -->
    <button
      on:click={() => {
        accessToken = "";
        user = null;
        tsvscode.postMessage({
          type: "logout",
          value: "",
        });
      }}
    >
      Logout
    </button>
  </div>
{:else}
  <p>No user logged in</p>
  <button
    on:click={() => {
      tsvscode.postMessage({
        type: "authenticate",
        value: "",
      });
    }}
  >
    Continue with GitHub
  </button>
{/if}

<style>
</style>
