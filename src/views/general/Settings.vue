<template>
    <div class="row py-5">
        <div class="col-md-12">
            <h4>Settings</h4>
            <hr>
        </div>

        <div class="col-md-12">
            <div class="container-fluid">
                <form @submit.prevent="saveSettings">
                <div class="row justify-content-md-center">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">Site Settings</div>
                            <div class="card-body">
                                
                                    <div class="form-group   row">
                                        <label for="titleInput" class="col-md-3  text-right col-form-label">Site Title</label>
                                        <div class="col-md-7">
                                            <input type="text" v-model="settings.title" class="form-control " :class="errors.title ? 'is-invalid' :''">
                                            <div class="invalid-feedback" v-if="errors.title">{{ errors.title }}</div>
                                        </div>

                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">Site Logo</label>
                                        <div class="col-md-5">
                                            <input type="file" v-on:change="onFileChange" class="form-control" :class="errors.logo ? 'is-invalid' :''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.logo" :key="index" >{{ error }}</div>
                                        </div>
                                        <div class="col-md-3">
                                         <img :src="settings.logo" class="img-fluid"/>
                                        </div> 
                                    </div>
                                    
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-md-center py-3">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">OAuth Settings</div>
                            <div class="card-body">
                                
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Facebook APP ID</label>
                                        <div class="col-md-7">
                                            <input type="text" v-model="settings.facebook_id" class="form-control" :class="errors.facebook_id ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.facebook_id" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">Facebook App Secret Key</label>
                                        <div class="col-md-7">
                                            <input type="text" v-model="settings.facebook_secret" class="form-control" :class="errors.facebook_secret ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.facebook_secret" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Google APP ID</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.google_id" class="form-control" :class="errors.google_id ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.google_id" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">Google  App Secret Key</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.google_secret" class="form-control" :class="errors.google_secret ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.google_secret" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-md-center py-3">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">Payment Settings</div>
                            <div class="card-body">
                                
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">RazorPay Key</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.razorpay_key" class="form-control" :class="errors.razorpay_key ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.razorpay_key" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">RazorPay Secret Key</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.razorpay_secret" class="form-control" :class="errors.razorpay_secret ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.razorpay_secret" :key="index">{{ error }}</div>
                                        </div>

                                    </div>
                                    
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-md-center py-3">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">Amazon Web Services Credentials </div>
                            <div class="card-body">
                                
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">AWS Access Key</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.aws_access_key" class="form-control" :class="errors.aws_access_key ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.aws_access_key" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">AWS Secret Key</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.aws_secret_key" class="form-control" :class="errors.aws_secret_key ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.aws_secret_key" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">AWS Region</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.aws_region" class="form-control" :class="errors.aws_region ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.aws_region" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">AWS S3 Bucket Name</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.aws_bucket_name" class="form-control" :class="errors.aws_bucket_name ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.aws_bucket_name" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-md-center py-3">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">Image Sizes  </div>
                            <div class="card-body">
                                
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Plan (width,height) </label>
                                            <input type="text" v-model="settings.plan_image_width" placeholder="Width" class="form-control col-md-2" :class="errors.plan_image_width ? 'is-invalid':''"> <span class="m-2 text-center">(X)</span> 
                                            <input type="text" v-model="settings.plan_image_height"  class="form-control col-md-2" placeholder="Height" :class="errors.plan_image_height ? 'is-invalid':''">
                                        <div class="col-md-7 offset-md-3">
                                              <div class="custom_error" v-for="(error, index) in errors.plan_image_width" :key="index">{{ error }}</div>
                                              <div class="custom_error" v-for="(error, index) in errors.plan_image_height" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Product (width,height) </label>
                                        <input type="text" v-model="settings.product_image_width" placeholder="Width" :class="errors.product_image_width ? 'is-invalid':''" class="form-control col-md-2"> <span class="m-2">(X)</span> 
                                        <input type="text" v-model="settings.product_image_height" class="form-control col-md-2" :class="errors.product_image_height ? 'is-invalid':''" placeholder="Height">
                                         <div class="col-md-7 offset-md-3">
                                              <div class="custom_error" v-for="(error, index) in errors.product_image_width" :key="index">{{ error }}</div>
                                              <div class="custom_error" v-for="(error, index) in errors.product_image_height" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Banner (width,height) </label>
                                        <input type="text" placeholder="Width" v-model="settings.banner_image_width" class="form-control col-md-2" :class="errors.banner_image_width ? 'is-invalid':''"> <span class="m-2">(X)</span> 
                                        <input type="text" v-model="settings.banner_image_height" class="form-control col-md-2" :class="errors.banner_image_height ? 'is-invalid':''" placeholder="Height">
                                        <div class="col-md-7 offset-md-3">
                                              <div class="custom_error" v-for="(error, index) in errors.banner_image_width" :key="index">{{ error }}</div>
                                              <div class="custom_error" v-for="(error, index) in errors.banner_image_height" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-md-center py-3">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">SMTP Configuration for Email Settings</div>
                            <div class="card-body">
                                
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">SMTP Host</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.smtp_host" class="form-control" :class="errors.smtp_host ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.smtp_host" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">SMTP Port</label>
                                        <div class="col-md-4">
                                        <input type="text" v-model="settings.smtp_port" class="form-control" :class="errors.smtp_port ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.smtp_port" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">SMTP Username</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.smtp_username" class="form-control" :class="errors.smtp_username ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.smtp_username" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">SMTP Password</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.smtp_password" class="form-control" :class="errors.smtp_password ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.smtp_password" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    
                                   
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-md-center py-3">
                    <div class="col-md-9">
                        <div class="card">
                            <div class="card-header">Social Networks Links</div>
                            <div class="card-body">
                                
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Facebook Link</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.facebook_link" class="form-control" :class="errors.facebook_link ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.facebook_link" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">Google Link</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.google_link" class="form-control" :class="errors.google_link ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.google_link" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="titleInput" class="col-md-3 text-right col-form-label">Twitter Profile</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.twitter_link" class="form-control" :class="errors.twitter_link ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.twitter_link" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                    <div class="form-group  row">
                                        <label for="logoInput" class="col-md-3 text-right col-form-label">LinkedIn Profile</label>
                                        <div class="col-md-7">
                                        <input type="text" v-model="settings.linkedin_link" class="form-control" :class="errors.linkedin_link ? 'is-invalid': ''">
                                            <div class="invalid-feedback" v-for="(error, index) in errors.linkedin_link" :key="index">{{ error }}</div>
                                        </div>
                                    </div>
                                     <div class="form-group row">

                    <div class="offset-md-3 p-0 col-md-3">

                    <button class="btn mr-0 btn-primary" type="submit"> <i class="fa fa-save"></i> UPDATE</button>
                    </div>
                </div>
                                   
                            </div>
                        </div>
                    </div>
                </div>

               
                </form>
                <!--  -->
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sitelogo: null,
      errors : [],
      settings: {
        title: null,
        facebook_id: null,
        facebook_secret: null,
        google_id: null,
        google_secret: null,
        facebook_link: null,
        google_link: null,
        twitter_link: null,
        linkedin_link: null,
        smtp_host: null,
        smtp_port: null,
        smtp_username: null,
        smtp_password: null,
        aws_access_key: null,
        aws_secret_key: null,
        aws_region: null,
        logo: null,
        aws_bucket_name: null,
        plan_image_width: null,
        plan_image_height: null,
        product_image_width: null,
        product_image_height: null,
        banner_image_width: null,
        banner_image_height: null,
        razorpay_key: null,
        razorpay_secret: null
      }
    };
  },

  mounted() {
    this.getSettings();
  },

  methods: {
    getSettings() {
      axios
        .get("/admin/settings")
        .then(response => {
          this.settings = response.data.data;
        })
        .catch(error => {});
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.sitelogo = files[0];
    },
    saveSettings() {
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      let formdata = new FormData();
      formdata.append("title", this.settings.title);
      formdata.append("facebook_id", this.settings.facebook_id);
      formdata.append("facebook_secret", this.settings.facebook_secret);
      formdata.append("google_id", this.settings.google_id);
      formdata.append("google_secret", this.settings.google_secret);
      formdata.append("facebook_link", this.settings.facebook_link);
      formdata.append("google_link", this.settings.google_link);
      formdata.append("twitter_link", this.settings.twitter_link);
      formdata.append("linkedin_link", this.settings.linkedin_link);
      formdata.append("smtp_host", this.settings.smtp_host);
      formdata.append("smtp_port", this.settings.smtp_port);
      formdata.append("smtp_username", this.settings.smtp_username);
      formdata.append("smtp_password", this.settings.smtp_password);
      formdata.append("aws_access_key", this.settings.aws_access_key);
      formdata.append("aws_secret_key", this.settings.aws_secret_key);
      formdata.append("aws_region", this.settings.aws_region);
      if (this.sitelogo!=null) {
          formdata.append("logo", this.sitelogo);
      }
      formdata.append("aws_bucket_name", this.settings.aws_bucket_name);
      formdata.append("plan_image_width", this.settings.plan_image_width);
      formdata.append("plan_image_height", this.settings.plan_image_height);
      formdata.append("product_image_width", this.settings.product_image_width);
      formdata.append(
        "product_image_height",
        this.settings.product_image_height
      );
      formdata.append("banner_image_width", this.settings.banner_image_width);
      formdata.append("banner_image_height", this.settings.banner_image_height);
      formdata.append("razorpay_key", this.settings.razorpay_key);
      formdata.append("razorpay_secret", this.settings.razorpay_secret);
      axios
        .post("/admin/settings", formdata, config)
        .then(response => {
          console.log("settings updated ==>", response.data);
        })
        .catch(error => {
            this.errors = error.response.data.errors;
            
        });
    }
  }
};
</script>
<style>
.custom_error{
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
}
</style>
