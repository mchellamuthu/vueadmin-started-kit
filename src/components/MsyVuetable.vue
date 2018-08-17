<template>
<div class="row">
    <div class="col-md-12 ui container">
        <vuetable ref="vuetable"
    :api-url="Api_EndPoint+api"
        :css="css.table"

     pagination-path="meta"
     data-path="data"
    :http-options="{ headers:  { Authorization: 'Bearer ' + token }}"
    :fields="fields"
            @vuetable:pagination-data="onPaginationData" 

  ></vuetable>
     	<vuetable-pagination ref="pagination"
				:css="css.pagination"
				class="float-right"
				@vuetable-pagination:change-page="onChangePage"
			></vuetable-pagination>
    </div>
</div>
     

</template>
<script>
import accounting from "accounting";
import moment from "moment";
import Vuetable from "vuetable-2/src/components/Vuetable";
// import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import CssConfig from '../vuetablecss.js'
import VuetablePagination from "./VuetablePaginationBootstrap4.vue";

export default {
  props: ["fields", "api", "token"],
  components: {
    Vuetable,
    VuetablePagination
  },
  data() {
    return {
      Api_EndPoint: process.env.VUE_APP_API_BASE_URL,
          css: CssConfig,

    };
  },
  mounted() {
    console.log(this.Api_EndPoint);
  },
  methods: {
    //...
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    }
  }
};
</script>
