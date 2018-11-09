<template>
  <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
          <router-link class="navbar-brand" to="/">Admin</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/plans" class="nav-link"> <i class="fas fa-database"></i>  Plans</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link"> <i class="fas fa-table"></i>  Products</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/users" class="nav-link"> <i class="fas fa-users"></i>  Users</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/banners" class="nav-link"> <i class="fas fa-images"></i>  Banners</router-link>
            </li>
            <li class="nav-item dropdown" v-if="this.$store.state.authenticated==true">
              <a class="nav-link dropdown-toggle" href="javascript:void(0);" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user-circle"></i> {{ this.$store.state.user.name }}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <router-link to="/profile" class="dropdown-item"> <i class="fa fa-user-edit"></i> Profile</router-link>
                <router-link to="/settings" class="dropdown-item"> <i class="fas fa-cogs"></i> Settings </router-link>
                <router-link to="/logout" class="dropdown-item"> <i class="fa fa-sign-out-alt"> </i> Logout</router-link>
              </div>
            </li>
          </ul>
        </div>
         </div>
      </nav>
      <div class="container">
          <router-view/>
      </div>
  </div>
</template>

<style lang="scss">
@import "./assets/theme.scss";
@import "../node_modules/bootstrap/scss/bootstrap";
</style>
