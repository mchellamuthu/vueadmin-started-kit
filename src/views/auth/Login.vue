<template>
    <div class="row justify-content-center mt-5 py-5">
        <div class="col-md-6 ">
            <div class="card shadow-sm">
                <div class="card-header">
                  <i class="fa fa-user"></i>  Login
                </div>

                <div class="card-body">
                     <form class="form-signin" method="post" @submit.prevent="login">
                        

                        <div class="form-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" v-model="user.email" :class="errors.email ? 'is-invalid' : ''" id="inputEmail" class="form-control" placeholder="Email address"  autofocus>
                            <div class="invalid-feedback" v-if="errors.email">{{errors.email[0]}}</div>

                        </div>

                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" v-model="user.password" id="inputPassword" :class="errors.password ? 'is-invalid' : ''"  class="form-control" placeholder="Password" >
                            <div class="invalid-feedback" v-if="errors.password">{{errors.password[0]}}</div>
                        </div>

                        <div class="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me"> Remember me
                            </label>
                        </div>
                        <button class="btn btn-teal btn-block" type="submit">Sign in</button>
                        </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Login",
  data() {
      return {
          user:{ 
              email:null,
              password:null,
          },
          errors : {
              email : null,
              password : null
          }
      }
  },
  methods : {
      login() {
      this.$store
        .dispatch("login", this.user)
        .then(response => {
          window.axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('user-token');
          /* Unset all errors when u get response success */
          this.errors = {
            email: null,
            password: null,
            message: null
          };
          /* Redirect to fundriser's dashboard */
          this.$router.push({ path: "/" });
        })
        .catch(error => {
            this.errors = error.response.data.errors
        });
    }
  }
}
</script>

<style scoped>

</style>

