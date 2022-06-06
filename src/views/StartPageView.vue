<script setup lang="ts">
  import { usekerdesekStore } from "../store/kerdesekStore";
  import { storeToRefs } from "pinia";
  import { usetemakorokStore } from "../store/temakorokStore";
  import TxtWritter from "../components/TxtWriter.vue";

  const kerdesekStore = usekerdesekStore();
  const temakorokStore = usetemakorokStore();
  const kerdesekStat = new Map<string, string>();
  // eslint-disable-next-line no-unused-vars
  const { data, dataN, dataNfiltered } = storeToRefs(kerdesekStore);

  // eslint-disable-next-line no-unused-vars
  interface Itema {
    nev: string;
  }

  onMounted(() => {
    kerdesekStore.getAll();
    temakorokStore.getAll();
  });

  function math() {
    //let counter = 0;
    for (const e of kerdesekStore.dataN) {
      if (e.temakor === 3) {
        //counter++;
      }
      return e.temakor;
    }
    //return counter;
  }
  function max() {
    let ideig = 0;
    let maxim = 0;
    for (const e of kerdesekStore.dataN) {
      if (e.valasz != null) {
        ideig = e.valasz;
        if (ideig > maxim) {
          maxim = ideig;
        }
      }
    }
    return maxim;
  }
  function min() {
    let ideig = 0;
    let minim = 99999999999;
    for (const e of kerdesekStore.dataN) {
      if (e.valasz != null) {
        ideig = e.valasz;
        if (ideig < minim) {
          minim = ideig;
        }
      }
    }
    return minim;
  }
</script>
<template>
  <q-page>
    <div class="row justify-center">
      <div v-if="kerdesekStore.dataN" class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md">
          <h4 class="text-center q-mt-lg q-mb-none">A feladat megoldása</h4>
          <p>2. feladat. A feladatban {{ dataN.length }} kérdés szerepel.</p>
          <p>Matek kérdések {{ math() }}</p>
          <p>Témakörök listája:</p>
          <span
            v-for="(item, index) in temakorokStore.dataN.sort((a, b) => a.nev!.localeCompare(b.nev!))"
            :key="index"
          >
            {{ item.nev }}
            <br />
          </span>
          <p>5. feladat. A legagyobb válasz {{ max() }} a legkisebb válasz pedig {{ min() }}.</p>
          <p>7. feladat.</p>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
  p {
    margin-bottom: 1px;
  }
  .task {
    margin-bottom: 10px;
    margin-left: 10px;
    max-width: 100%;
  }
  .solution {
    margin-left: 10px;
    margin-bottom: 0;
  }
</style>
