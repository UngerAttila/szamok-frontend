<script setup lang="ts">
  import { usekerdesekStore } from "../store/kerdesekStore";
  import { usetemakorokStore } from "../store/temakorokStore";
  import router from "src/router";

  const kerdesekStore = usekerdesekStore();
  const temakorokStore = usetemakorokStore();

  onMounted(() => {
    temakorokStore.getAll();
  });

  function Submit() {
    kerdesekStore.editById();
  }

  function Reset() {
    router.push("/qtablequestion");
  }
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="kerdesekStore.data" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @reset="Reset()" @submit="Submit">
          <h4 class="text-center q-mt-lg q-mb-none">Edit Question</h4>
          <q-select
            v-model="kerdesekStore.data.temakor"
            clearable
            emit-value
            filled
            label="Temakör:"
            map-options
            option-label="tema"
            option-value="_id"
          />
          <q-input v-model="kerdesekStore.data.kerdes" filled label="Kérdés:" type="text" />
          <q-input v-model="kerdesekStore.data.valasz" filled label="Válasz:" type="text" />
          <q-input v-model="kerdesekStore.data.pont" filled label="Pont:" type="text" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
          </div>
          <!-- <p>Actual: {{ kerdesekStore.data }}</p> -->
          <!-- <p>Old: {{ kerdesekStore.dataOld }}</p> -->
          <!-- <p>Selected: {{ kerdesekStore.selected }}</p> -->
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
