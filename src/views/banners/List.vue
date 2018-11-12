<template>
    <div class="row py-5">
        <div class="col-md-6 mb-5">
            <h4>Banners</h4>
        </div>
        <div class="col-md-6 mb-5 text-right">
            <button class="btn shadow-lg btn-primary" @click="openModal"><i class="fa fa-plus-circle"></i> NEW BANNER</button>
        </div>
        <!-- Add new Modal -->
      <div class="modal fade" id="bannerModal" tabindex="-1" role="dialog" aria-labelledby="bannerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="editMode==false" id="bannerModalLabel">Create New banner</h5>
            <h5 class="modal-title" v-if="editMode==true" id="bannerModalLabel">Edit banner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">

                  
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Image</label>
                    <div class="col-md-4">
                      <input type="file" v-on:change="onFileChange" :class="errors.image ? 'is-invalid':''"  class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.image" :key="index">{{ error }}</div>

                    </div>
                    <div class="col-md-4">
                      <img v-if="banner.image" :src="banner.image"  class="img-fluid" alt="">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-form-label text-right col-md-3">Position</label>
                    <div class="col-md-4">
                      <input type="number" v-model="banner.position" :class="errors.position ? 'is-invalid':''" class="form-control form-control-sm" >
                      <div class="invalid-feedback" v-for="(error, index) in errors.position" :key="index">{{ error }}</div>
                    </div>
                  </div>
                  

                 
                  
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" v-if="editMode==true" class="btn btn-primary" @click="savebanner">Save changes</button>
            <button type="button" class="btn btn-primary" v-if="editMode==false" @click="createbanner">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add new Banners -->

        <div class="col-md-12">
            <div class="card shadow-sm">
                <div class="card-body p-0">
                    <my-vuetable
                    api-url="admin/banner"
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
      bannerimage: "",
      errors: [],
      banner: {
        id: "",
        position: "",
        image: "",
        
      },
      sortOrder: [
        {
          field: "position",
          sortField: "position",
          direction: "asc"
        }
      ],
      moreParams: {},
      fields: [
        {
          name: "__slot:image",
          title: "Image"
        },
      
        {
          name: "position",
          sortField: "position",
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
        .get("/admin/banner/" + id)
        .then(response => {
          var bannerData = response.data.data;
          this.bannerimage = "";
          this.errors = [];
          this.banner = {
            id: bannerData.id,
            position: bannerData.position,
            image: bannerData.image,
           
          };
          $("#bannerModal").modal("show");
        })
        .catch(error => {});
    },
    openModal() {
      this.bannerimage = "";
      this.errors = [];
      this.editMode = false;
      this.banner = {
        id: "",
        position: "",
        image: "",
        
      };
      $("#bannerModal").modal("show");
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.bannerimage = files[0];
    },
    createbanner() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("position", this.banner.position);
    
      if (this.bannerimage != '') {
        formdata.append("image", this.bannerimage);
      }
      axios
        .post("/admin/banner", formdata, config)
        .then(response => {
          console.log("success ==>", response);
          this.$emit("reloadTable");
          this.$snotify.success({
            body: "banner created successfully!",
            title: "Successfull!",
            config: {}
          });
          this.bannerimage = "";
          this.errors = [];
          this.banner = {
            id: "",
            name: "",
            price: "",
            image: "",
            description: "",
          
          };
          $("#bannerModal").modal("hide");
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    savebanner() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("_method", "PUT");
      formdata.append("position", this.banner.position);
    
      if (this.bannerimage != "") {
        formdata.append("image", this.bannerimage);
      }
      axios
        .post("/admin/banner/" + this.banner.id, formdata, config)
        .then(response => {
          console.log("success ==>", response);
          this.$emit("reloadTable");
          this.$snotify.success({
            body: "banner updated successfully!",
            title: "Successfull!",
            config: {}
          });
          this.bannerimage = "";
          this.errors = [];
          this.banner = {
           id: "",
            position: "",
            image: ""
          };
          $("#bannerModal").modal("hide");
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
          .delete("/admin/banner/" + id)
          .then(response => {
            this.$emit("reloadTable");
            this.$snotify.success("banner was deleted successfully!");
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
