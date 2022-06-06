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
    kerdesekStore.create();
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
          <h4 class="text-center q-mt-lg q-mb-none">New record</h4>
          <q-input v-model.number="kerdesekStore.data._id" filled label="_id:" type="number" />
          <q-select
            v-model.number="kerdesekStore.data.temakor"
            clearable
            emit-value
            filled
            label="Témakör:"
            map-options
            option-label="nev"
            option-value="_id"
            :options="temakorokStore.dataN.sort((a, b) => a.nev!.localeCompare(b.nev!))"
          />
          <q-input v-model="kerdesekStore.data.kerdes" filled label="Kérdés:" type="text" />
          <q-input
            v-model.number="kerdesekStore.data.valasz"
            filled
            label="Válasz:"
            type="number"
          />
          <q-input v-model.number="kerdesekStore.data.pont" filled label="Pont:" type="number" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Mentés" no-caps type="submit" />
            <q-btn class="q-mr-md" color="red" label="Mégsem" no-caps type="reset" />
          </div>
          <p>Actual: {{ kerdesekStore.data }}</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
