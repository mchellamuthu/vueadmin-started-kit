<template>
    <div class="row py-5">
        <div class="col-md-6 mb-5">
            <h4>Plans</h4>
        </div>
        <div class="col-md-6 mb-5 text-right">
            <button class="btn btn-primary" @click="openModal"><i class="fa fa-plus-circle"></i> NEW PLAN</button>
        </div>
        <!-- Add new Modal -->
      <div class="modal fade" id="planModal" tabindex="-1" role="dialog" aria-labelledby="planModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="planModalLabel">Create New Modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">

                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Name</label>
                    <div class="col-md-8">
                      <input type="text" v-model="plan.name" class="form-control form-control-sm" >
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Image</label>
                    <div class="col-md-4">
                      <input type="file" class="form-control form-control-sm" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Price</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.price" class="form-control form-control-sm" >
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Products Price Range</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.price_from" class="form-control form-control-sm" placeholder="Price From">
                    </div>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.price_to" class="form-control form-control-sm" placeholder="Price From">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Closing Date</label>
                    <div class="col-md-4">
                          <datetime format="YYYY-MM-DD H:i:s" :class="'form-control form-control-sm'"  v-model="plan.closing_date"></datetime>

                    </div>
                  </div>
                  <h4>Slot Options</h4>
                  <hr>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Maximum users per slot</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.users_per_slot" class="form-control form-control-sm" >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Maximum winners per slot</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.winners_per_slot" class="form-control form-control-sm" >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

        <div class="col-md-12">
            <div class="card">
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
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import MyVuetable from "@/components/table/MyVuetable.vue";
import DetailRow from "@/components/table/DetailRow.vue";
import datetime from 'vuejs-datetimepicker';

Vue.component("my-detail-row", DetailRow);
export default {
  name: "home",
  components: {
    HelloWorld,
    MyVuetable,
    datetime
  },
  data() {
    return {
      planimage : null,
      errors : [],
      plan : {
        name : null,
        price : null,
        image : null,
        price_from : null,
        price_to:null,
        closing_date:null,
        users_per_slot : null,
        winners_per_slot : null
      },
      sortOrder: [
        {
          field: "name",
          sortField: "name",
          direction: "asc"
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
    },
    openModal(){
      $('#planModal').modal('show');
    }
  }
};
</script>

<style>
.calender-div{
  z-index: 999;
}
</style>
