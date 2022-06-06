<script setup lang="ts">
  import { usekerdesekStore } from "../store/kerdesekStore";
  import { storeToRefs } from "pinia";
  import router from "src/router";
  import { useUsersStore } from "../store/usersStore";
  //import { usetemakorokStore } from "../store/temakorokStore";

  const kerdesekStore = usekerdesekStore();
  const usersStore = useUsersStore();

  const { isLoading, dataN, pagination, selected } = storeToRefs(kerdesekStore);

  watch(isLoading, () => {
    onRequest({
      pagination: pagination.value,
    });
  });

  function deleteRecord(): void {
    kerdesekStore.deleteById();
  }

  function newRecord(): void {
    kerdesekStore.data = {};
    router.push("/newQuestion");
  }

  function filterChanged(): void {
    selected.value = [];
  }

  function editRecord(): void {
    kerdesekStore.data = selected.value[0];
    kerdesekStore.getById();
    router.push("/editQuestion");
  }

  function clearSelection(): void {
    selected.value = [];
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    {
      name: "nev",
      label: "Témakör",
      field: (row: any) => row.temakor.nev,
      align: "center",
    },
    { name: "kerdes", label: "Kérdés", field: "kerdes", align: "left", sortable: true },
    { name: "valasz", label: "Válasz", field: "valasz", align: "left", sortable: true },
    { name: "pont", label: "Pont", field: "pont", align: "left", sortable: true },
  ];

  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;

    kerdesekStore.fetchPaginatedQuestions({
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

  onMounted(() => {
    onRequest({
      pagination: pagination.value,
    });
  });
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        :filter="pagination.filter"
        row-key="_id"
        :rows="dataN"
        selection="multiple"
        title="Kérdések"
        wrap-cells
        @request="onRequest"
      >
        <template #top-right>
          <q-input
            v-model="pagination.filter"
            debounce="300"
            dense
            placeholder="Search"
            @update:model-value="filterChanged()"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
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
