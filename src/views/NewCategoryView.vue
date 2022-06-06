<script setup lang="ts">
  import { usekerdesekStore } from "../store/kerdesekStore";
  import { usetemakorokStore } from "../store/temakorokStore";
  import router from "src/router";

  const kerdesekStore = usekerdesekStore();
  const temakorokStore = usetemakorokStore();

  onMounted(() => {
    temakorokStore.getAll();
    kerdesekStore.getAll();
  });

  function Submit() {
    temakorokStore.create();
  }

  function Reset() {
    router.push("/qtablecategory");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="temakorokStore.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <q-input v-model.number="temakorokStore.data._id" filled label="_id:" type="number" />
          <q-input v-model="temakorokStore.data.nev" filled label="Témakör:" type="text" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
          </div>
          <p>Actual: {{ temakorokStore.data }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
