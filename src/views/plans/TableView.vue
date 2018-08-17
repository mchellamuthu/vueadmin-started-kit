<template>
    <div class="row py-5">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    Plans
                </div>
                <div class="card-body p-0">
                    <my-vuetable
                    api-url="admin/plans"
                    :fields="fields"
                    :sort-order="sortOrder"
                    :append-params="moreParams"
                    :token="this.$store.state.authToken"
                    >
                        <template slot="actions" scope="props">
                            <div class="custom-actions">
                            <button class="btn btn-sm btn-primary"
                                @click="onAction('view-item', props.rowData, props.rowIndex)">
                                <i class="fa fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-success"
                                @click="onAction('edit-item', props.rowData, props.rowIndex)">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger"
                                @click="onAction('delete-item', props.rowData, props.rowIndex)">
                                <i class="fa fa-trash-alt"></i>
                            </button>
                            </div>
                        </template>
                    </my-vuetable>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import Vue from 'vue'
import HelloWorld from "@/components/HelloWorld.vue";
import MyVuetable from "@/components/table/MyVuetable.vue";
import DetailRow from '@/components/table/DetailRow.vue'

Vue.component('my-detail-row', DetailRow)
export default {
  name: "home",
  components: {
    HelloWorld,
    MyVuetable
  },
  data() {
    return {
      sortOrder: [
        {
          field: 'name',
          sortField: 'name',
          direction: 'asc'
        }
      ],
      moreParams: {},
      fields: [
        {
          name: "name",
          sortField: "name"
        },
        {
          name: "price",
          sortField: "price"
        },
        {
          name: "price_from",
          sortField: "price_from"
        },
        {
          name: "price_to",
          sortField: "price_to"
        },
        {
          name: "__slot:actions",
          title: "Slot Actions",
          titleClass: "text-center",
          dataClass: "text-center"
        }
      ]
    };
  },
  mounted() {
    console.log(this.$store.state.authToken);
    console.log("process", JSON.stringify(process.env.VUE_APP_API_BASE_URL));
  },
  methods: {
    onAction(action, data, index) {
      console.log("slot action: " + action, data.name, index);
    }
  }
};
</script>
