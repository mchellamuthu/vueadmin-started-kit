<template>
    <div class="row py-5">
        <div class="col-md-6 mb-5">
            <h4>Plans</h4>
        </div>
        <div class="col-md-6 mb-5 text-right">
            <button class="btn shadow-lg btn-primary" @click="openModal"><i class="fa fa-plus-circle"></i> NEW PLAN</button>
            <button class="btn shadow-lg btn-primary" @click="activeFilter('expired')"><i class="fa fa-ban"></i> EXPIRED PLANS</button>
            <button class="btn shadow-lg btn-primary" @click="activeFilter('active')"><i class="fa fa-bell"></i> ACTIVE PLANS</button>
        </div>
        <!-- Add new Modal -->
      <div class="modal fade" id="planModal" tabindex="-1" role="dialog" aria-labelledby="planModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="padding-bottom:0rem; padding-left:0rem;">
             <ul class="nav nav-pills" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Edit Plan</a>
  </li>
  <li class="nav-item" v-if="editMode==true">
    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Products </a>
  </li>
  
</ul>
           
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                 
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

    <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Name</label>
                    <div class="col-md-7">
                      <input type="text" v-model="plan.name" :class="errors.name ? 'is-invalid':''" class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.name" :key="index">{{ error }}</div>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Image</label>
                    <div class="col-md-4">
                      <input type="file" v-on:change="onFileChange" :class="errors.image ? 'is-invalid':''"  class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.image" :key="index">{{ error }}</div>

                    </div>
                    <div class="col-md-4">
                      <img v-if="plan.image" :src="plan.image"  class="img-fluid" alt="">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Price</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.price" :class="errors.price ? 'is-invalid':''" class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.price" :key="index">{{ error }}</div>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Products Price Range</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.price_from" :class="errors.price_from ? 'is-invalid':''" class="form-control form-control-sm" placeholder="Price From">
                      <div class="invalid-feedback" v-for="(error, index) in errors.price_from" :key="index">{{ error }}</div>
                    </div>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.price_to" :class="errors.price_to ? 'is-invalid':''" class="form-control form-control-sm" placeholder="Price From">
                      <div class="invalid-feedback" v-for="(error, index) in errors.price_to" :key="index">{{ error }}</div>
                    </div>

                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Starting Date</label>
                    <div class="col-md-4">
                          <datetime format="YYYY-MM-DD H:i:s"   v-model="plan.starting_date"></datetime>
                    <div class="invalid-feedback" v-for="(error, index) in errors.starting_date" :key="index">{{ error }}</div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Closing Date</label>
                    <div class="col-md-4">
                          <datetime format="YYYY-MM-DD H:i:s"   v-model="plan.closing_date"></datetime>
                          <div class="invalid-feedback" v-for="(error, index) in errors.closing_date" :key="index">{{ error }}</div>

                    </div>
                  </div>
                  <h4>Slot Options</h4>
                  <hr>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Maximum users per slot</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.users_per_slot" :class="errors.max_users_per_slot ? 'is-invalid':''"  class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.max_users_per_slot" :key="index">{{ error }}</div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Maximum winners per slot</label>
                    <div class="col-md-4">
                      <input type="number" v-model="plan.winners_per_slot" :class="errors.winners_per_slot ? 'is-invalid':''" class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.winners_per_slot" :key="index">{{ error }}</div>
                    </div>
                  </div>
  </div>
  <div v-if="editMode==true" class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3" v-for="(planProduct, index) in planInfo.products" :key="index">
                    <div class="card  card-mdl shadow-sm">
                        <img class="card-img-top" :src="planProduct.image"  alt="Card image cap">

                      <div class="card-body ">
                                <p class="title">{{ planProduct.name }}</p>
                          <p>Price : {{ planProduct.price }} INR</p>
                          <button  class="btn btn-danger btn-sm" @click="removeProduct(index)"><i class="fa fa-trash"></i> REMOVE</button>
                      </div>
                    </div>
                </div>
      </div>
    </div>
  
  </div>
</div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-if="editMode==true" class="btn btn-primary" @click="savePlan">Save changes</button>
            <button type="button" class="btn btn-primary" v-if="editMode==false" @click="createPlan">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">Select Products to Add</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-3" v-for="(planProduct, index) in products" :key="index">
                    <div class="card  card-mdl shadow-sm" @click="onselect(planProduct.id)">
                        <img class="card-img-top" :src="planProduct.image"  alt="Card image cap">

                      <div class="card-body ">
                                <p class="title">{{ planProduct.name }}</p>
                          <p>Price : {{ planProduct.price }} INR</p>
                          <button v-if="selectedProducts.includes(planProduct.id)" class="btn btn-success btn-sm"><i class="fa fa-check-circle"></i> SELECTED</button>
                      </div>
                    </div>
                </div>
                <hr>
                <div class="col-md-12">

                      <p v-if="products.length === 0" class="alert alert-warning"> <i class="fa fa-exclamation-triangle"></i> No products remaining to map</p>

                    <button v-if="products.length > 0" type="button" class="btn btn-primary btn-block mt-2" @click="saveProducts">ADD PRODUCTS</button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
        <div class="col-md-12">
            <div class="card shadow-sm">
                <div class="card-body p-0">
                    <my-vuetable
                    api-url="admin/plans"
                    :fields="fields"
                    :sort-order="sortOrder"
                    :append-params="moreParams"
                    :token="this.$store.state.authToken"
                    >
                    <template slot="image" scope="props">
   
                      <img class="rounded-circle" :src="props.rowData.image" width="50" height="50">
                    </template>
                    <template slot="actions" scope="props">
                        <div class="custom-actions">
                        <router-link :to="'/plan/'+props.rowData.id" class="btn btn-sm btn-primary">                            
                            <i class="fa fa-eye"></i>
                        </router-link>
                        <button class="btn btn-sm btn-primary"
                            @click="addProducts(props.rowData)">
                            <i class="fa fa-shopping-cart"></i>
                        </button>
                        <button class="btn btn-sm btn-success"
                            @click="editRecord(props.rowData.id)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger"
                            @click="deleteRow(props.rowData.id)">
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
import datetime from "vuejs-datetimepicker";

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
      editMode: false,
      planimage: "",
      moreParams : {
        dataMode:'both'
      } ,
      errors: [],
      selectedProducts: [],
      products: [],
      planInfo: [],
      plan: {
        id: "",
        name: "",
        price: "",
        image: "",
        price_from: "",
        price_to: "",
        closing_date: "",
        starting_date: "",
        users_per_slot: "",
        winners_per_slot: ""
      },
      sortOrder: [
        {
          field: "name",
          sortField: "name",
          direction: "asc"
        }
      ],
      fields: [
        {
          name: "__slot:image",
          title: "Image",
          sortField: "image"
        },
        {
          name: "name",
          sortField: "name"
        },
        {
          name: "price",
          sortField: "price",
          titleClass: "text-center",
          dataClass: "text-center"
        },
        {
          name: "price_from",
          sortField: "price_from",
          titleClass: "text-center",
          dataClass: "text-center"
        },
        {
          name: "price_to",
          sortField: "price_to",
          titleClass: "text-center",
          dataClass: "text-center"
        },
        {
          name: "starting_date",
          sortField: "starting_date",
          titleClass: "text-center",
          dataClass: "text-center"
        },
        {
          name: "closed_date",
          sortField: "closed_date",
          titleClass: "text-center",
          dataClass: "text-center"
        },
        {
          name: "max_users_per_slot",
          title: "Users Per Slot",
          sortField: "max_users_per_slot",
          titleClass: "text-center",
          dataClass: "text-center"
        },
        {
          name: "winners_per_slot",
          title: "Winners Per Slot",
          sortField: "winners_per_slot",
          titleClass: "text-center",
          dataClass: "text-center"
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
  ready() {
    events.$on("eventReload", () => {
      console.log("triggerd");
    });
  },
  mounted() {},
  methods: {
    onAction(action, data, index) {
      console.log("slot action: " + action, data.name, index);
    },
    editRecord(id) {
      this.editMode = true;
      axios
        .get("/admin/plans/" + id)
        .then(response => {
          var planData = response.data.data;
          this.planimage = "";
          this.errors = [];
          this.planInfo = planData;
          this.plan = {
            id: planData.id,
            name: planData.name,
            price: planData.price,
            image: planData.image,
            price_from: planData.price_from,
            price_to: planData.price_to,
            closing_date: planData.closed_date,
            starting_date: planData.starting_date,
            users_per_slot: planData.max_users_per_slot,
            winners_per_slot: planData.winners_per_slot
          };
          $("#planModal").modal("show");
        })
        .catch(error => {});
    },
    activeFilter(status){
      this.moreParams.dataMode = status;
       this.$emit("reloadTable");
    },
    openModal() {
      this.planimage = "";
      this.editMode = false;
      this.errors = [];
      this.plan = {
        id: "",
        name: "",
        price: "",
        image: "",
        price_from: "",
        price_to: "",
        closing_date: null,
        starting_date: null,
        users_per_slot: null,
        winners_per_slot: null
      };
      $("#planModal").modal("show");
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.planimage = files[0];
    },
    indexWhere(array, conditionFn) {
      const item = array.find(conditionFn);
      return array.indexOf(item);
    },

    onselect(id) {
      // var product = this.products[index];
      if (this.selectedProducts.includes(id)) {
        let i = this.selectedProducts.indexOf(id); // find index of your object
        console.log("index of selected product list ===>", i);
        this.selectedProducts.splice(i, 1);
      } else {
        this.selectedProducts.push(id);
      }
    },

    createPlan() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("name", this.plan.name);
      formdata.append("price", this.plan.price);
      formdata.append("price_from", this.plan.price_from);
      formdata.append("price_to", this.plan.price_to);
      formdata.append("starting_date", this.plan.starting_date);
      formdata.append("closed_date", this.plan.closing_date);
      formdata.append("max_users_per_slot", this.plan.users_per_slot);
      formdata.append("winners_per_slot", this.plan.winners_per_slot);
      if (this.planimage != null) {
        formdata.append("image", this.planimage);
      }
      axios
        .post("/admin/plans", formdata, config)
        .then(response => {
          console.log("success ==>", response);
          this.$emit("reloadTable");
          this.$snotify.success({
            body: "Plan created successfully!",
            title: "Successfull!",
            config: {}
          });
          this.planimage = "";
          this.errors = [];
          this.plan = {
            id: "",
            name: "",
            price: "",
            image: "",
            price_from: "",
            price_to: "",
            closing_date: "",
            starting_date: "",
            users_per_slot: "",
            winners_per_slot: ""
          };
          $("#planModal").modal("hide");
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    savePlan() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("_method", "PUT");
      formdata.append("name", this.plan.name);
      formdata.append("price", this.plan.price);
      formdata.append("price_from", this.plan.price_from);
      formdata.append("price_to", this.plan.price_to);
      formdata.append("starting_date", this.plan.starting_date);
      formdata.append("closed_date", this.plan.closing_date);
      formdata.append("max_users_per_slot", this.plan.users_per_slot);
      formdata.append("winners_per_slot", this.plan.winners_per_slot);
      if (this.planimage != "") {
        formdata.append("image", this.planimage);
      }
      axios
        .post("/admin/plans/" + this.plan.id, formdata, config)
        .then(response => {
          console.log("success ==>", response);
          this.$emit("reloadTable");
          this.$snotify.success({
            body: "Plan updated successfully!",
            title: "Successfull!",
            config: {}
          });
          this.planimage = "";
          this.errors = [];
          this.plan = {
            id: "",
            name: "",
            price: "",
            image: "",
            price_from: "",
            price_to: "",
            closing_date: "",
            starting_date: "",
            users_per_slot: "",
            winners_per_slot: ""
          };
          $("#planModal").modal("hide");
          this.editMode = false;
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    deleteRow(id) {
      var res = confirm("do you want really delete this?");
      if (res) {
        axios
          .delete("/admin/plans/" + id)
          .then(response => {
            this.$emit("reloadTable");
            this.$snotify.success("Plan was deleted successfully!");
          })
          .catch(error => {});
      } else {
        return false;
      }
    },
    addProducts(data) {
      this.planInfo = data;
      axios
        .get("admin/listProducts/" + data.id)
        .then(response => {
          this.products = response.data.data;
          this.selectedProducts = [];
        })
        .catch(error => {});
      $("#productModal").modal("show");
    },

    saveProducts() {
      axios
        .post("/admin/addProducts/" + this.planInfo.id, {
          products: this.selectedProducts
        })
        .then(response => {
          //  this.$emit("reloadTable");
          this.selectedProducts = [];
          $("#productModal").modal("hide");
          this.$snotify.success("Products was mapped successfully!");
        })
        .catch(function(error) {});
    },
    removeProduct(index) {
      let product = this.planInfo.products[index];
      var planId = this.planInfo.id;
      axios
        .delete("/admin/removeProduct/" + planId + "/" + product.id)
        .then(response => {
          this.planInfo.products.splice(index, 1);
          this.$snotify.success("Product was removed successfully!");
        })
        .catch(error => {});
    }
  }
};
</script>

<style>
.calender-div {
  z-index: 999;
}
.card-mdl {
  font-size: 12px;
  cursor: pointer;
}
.card-mdl img {
  max-width: 100%;
  max-height: 50px;
}
.card-mdl .title {
  font-size: 13px;
  font-weight: bold;
}
</style>
