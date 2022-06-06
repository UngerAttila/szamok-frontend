<script setup lang="ts">
  import { usetemakorokStore } from "../store/temakorokStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { useUsersStore } from "../store/usersStore";
  //import { usetemakerdesekStore } from "../store/temakorokStore";

  const temakorokStore = usetemakorokStore();
  const usersStore = useUsersStore();

  const { isLoading, dataN, selected } = storeToRefs(temakorokStore);

  watch(isLoading, () => {
    temakorokStore.getAll();
  });

  function deleteRecord(): void {
    temakorokStore.deleteById();
  }

  function newRecord(): void {
    temakorokStore.data = {};
    router.push("/newCategory");
  }

  function editRecord(): void {
    temakorokStore.data = selected.value[0];
    temakorokStore.getById();
    router.push("/editCategory");
  }

  function clearSelection(): void {
    selected.value = [];
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "nev", label: "Témakör", field: "nev", align: "left", sortable: true },
  ];
  /*
  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;

    temakorokStore.fetchPaginatedCategorys({
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      order: sortBy,
      sort: descending ? "-1" : "1",
      keyword: filter,
    });

    // don't forget to update local pagination object
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  }
*/
  onMounted(() => {
    temakorokStore.getAll();
  });
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        row-key="_id"
        :rows="dataN"
        selection="multiple"
        title="Témakörök"
        wrap-cells
      ></q-table>
      <!-- Buttons:  -->
      <div class="row justify-center q-ma-sm q-gutter-sm">
        <q-btn v-show="selected.length != 0" color="orange" no-caps @click="clearSelection">
          {{ selected.length > 1 ? "Clear selections" : "Clear selection" }}
        </q-btn>
        <q-btn
          v-show="usersStore.loggedUser && selected.length == 0"
          color="green"
          no-caps
          @click="newRecord"
        >
          New record
        </q-btn>
        <q-btn v-show="selected.length == 1" color="blue" no-caps @click="editRecord">
          Edit record
        </q-btn>
        <q-btn v-show="selected.length != 0" color="red" no-caps @click="deleteRecord">
          {{ selected.length > 1 ? "Delete selected records" : "Delete selected record" }}
        </q-btn>
      </div>
      <!-- <p>Pagination object: {{ pagination }}</p> -->
      <!-- <p>Selected array: {{ selected }}</p> -->
      <!-- <div>Filter: "{{ pagination.filter }}"</div> -->
    </div>
  </q-page>
</template>

<style scoped></style>
