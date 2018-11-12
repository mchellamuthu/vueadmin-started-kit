<template>
    <div class="row py-5">
        <div class="col-md-6 mb-5">
            <h4>Products</h4>
        </div>
        <div class="col-md-6 mb-5 text-right">
            <button class="btn shadow-lg btn-primary" @click="openModal"><i class="fa fa-plus-circle"></i> NEW PRODUCT</button>
        </div>
        <!-- Add new Modal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="editMode==false" id="productModalLabel">Create New Product</h5>
            <h5 class="modal-title" v-if="editMode==true" id="productModalLabel">Edit Product</h5>
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
                    <div class="col-md-7">
                      <input type="text" v-model="product.name" :class="errors.name ? 'is-invalid':''" class="form-control form-control-sm" >
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
                      <img v-if="product.image" :src="product.image"  class="img-fluid" alt="">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Price</label>
                    <div class="col-md-4">
                      <input type="number" v-model="product.price" :class="errors.price ? 'is-invalid':''" class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.price" :key="index">{{ error }}</div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Description</label>
                    <div class="col-md-7">
                      <textarea v-model="product.description" :class="errors.description ? 'is-invalid':''" class="form-control form-control-sm" rows="3"></textarea>
                      <div class="invalid-feedback" v-for="(error, index) in errors.description" :key="index">{{ error }}</div>
                    </div>
                  </div>

                 
                  
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-if="editMode==true" class="btn btn-primary" @click="saveproduct">Save changes</button>
            <button type="button" class="btn btn-primary" v-if="editMode==false" @click="createproduct">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add new Products -->

        <div class="col-md-12">
            <div class="card shadow-sm">
                <div class="card-body p-0">
                    <my-vuetable
                    api-url="admin/products"
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
                        <button class="btn btn-sm btn-primary"
                            @click="onAction('view-item', props.rowData, props.rowIndex)">
                            <i class="fa fa-eye"></i>
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
      productimage: "",
      errors: [],
      product: {
        id: "",
        name: "",
        price: "",
        image: "",
        description: "",
        
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
          name: "description",
          sortField: "description",
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
  mounted() {
    console.log(this.$store.state.authToken);

    console.log("process", JSON.stringify(process.env.VUE_APP_API_BASE_URL));
  },
  methods: {
    onAction(action, data, index) {
      console.log("slot action: " + action, data.name, index);
    },
    editRecord(id) {
      this.editMode = true;
      axios
        .get("/admin/products/" + id)
        .then(response => {
          var productData = response.data.data;
          this.productimage = "";
          this.errors = [];
          this.product = {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            description: productData.description,
           
          };
          $("#productModal").modal("show");
        })
        .catch(error => {});
    },
    openModal() {
      this.productimage = "";
      this.errors = [];
      this.editMode = false;
      this.product = {
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
      $("#productModal").modal("show");
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.productimage = files[0];
    },
    createproduct() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("name", this.product.name);
      formdata.append("price", this.product.price);
      formdata.append("description", this.product.description);
    
      if (this.productimage != '') {
        formdata.append("image", this.productimage);
      }
      axios
        .post("/admin/products", formdata, config)
        .then(response => {
          console.log("success ==>", response);
          this.$emit("reloadTable");
          this.$snotify.success({
            body: "product created successfully!",
            title: "Successfull!",
            config: {}
          });
          this.productimage = "";
          this.errors = [];
          this.product = {
            id: "",
            name: "",
            price: "",
            image: "",
            description: "",
          
          };
          $("#productModal").modal("hide");
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    saveproduct() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("_method", "PUT");
     formdata.append("name", this.product.name);
      formdata.append("price", this.product.price);
      formdata.append("description", this.product.description);
    
      if (this.productimage != "") {
        formdata.append("image", this.productimage);
      }
      axios
        .post("/admin/products/" + this.product.id, formdata, config)
        .then(response => {
          console.log("success ==>", response);
          this.$emit("reloadTable");
          this.$snotify.success({
            body: "product updated successfully!",
            title: "Successfull!",
            config: {}
          });
          this.productimage = "";
          this.errors = [];
          this.product = {
           id: "",
            name: "",
            price: "",
            image: "",
            description: "",
          };
          $("#productModal").modal("hide");
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
          .delete("/admin/products/" + id)
          .then(response => {
            this.$emit("reloadTable");
            this.$snotify.success("product was deleted successfully!");
          })
          .catch(error => {});
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.calender-div {
  z-index: 999;
}
</style>
