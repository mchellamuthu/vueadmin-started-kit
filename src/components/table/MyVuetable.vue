<script>
import accounting from "accounting";
import moment from "moment";
import Vue from "vue";
import VueEvents from "vue-events";
import Vuetable from "vuetable-2/src/components/Vuetable";
// import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import CustomActions from "./CustomActions";
import FilterBar from "./FilterBar";
import CssConfig from "./vuetablecss.js";
import VuetablePagination from "./VuetablePaginationBootstrap4.vue";

Vue.use(VueEvents);
Vue.component("custom-actions", CustomActions);
Vue.component("filter-bar", FilterBar);

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array,
      default() {
        return [];
      }
    },
    appendParams: {
      type: Object,
      default() {
        return {};
      }
    },
    detailRowComponent: {
      type: String
    }
  },
  data() {
    return {
      css: CssConfig
    };
  },
  mounted() {
    this.$events.$on("filter-set", eventData => this.onFilterSet(eventData));
    this.$events.$on("filter-reset", e => this.onFilterReset());
  },
  render(h) {
    return h(
      "div",
      {
        class: { ui: true, containerFluid: true }
      },
      [h("filter-bar"), this.renderVuetable(h), this.renderPagination(h)]
    );
  },
   created() {
    this.$parent.$on('reloadTable', this.reloadTable)
  },
  methods: {
    // render related functions
    renderVuetable(h) {
      return h("vuetable", {
        ref: "vuetable",
        props: {
          apiUrl: process.env.VUE_APP_API_BASE_URL + this.apiUrl,
          httpOptions: {
            headers: { Authorization: "Bearer " + this.token }
          },
          fields: this.fields,
          paginationPath: "meta",
          multiSort: true,
          css: this.css.table,
          sortOrder: this.sortOrder,
          appendParams: this.appendParams,
          detailRowComponent: this.detailRowComponent
        },
        on: {
          "vuetable:cell-clicked": this.onCellClicked,
          "vuetable:pagination-data": this.onPaginationData
        },
        scopedSlots: this.$vnode.data.scopedSlots
      });
    },
    renderPagination(h) {
      return h("div", [
        h("vuetable-pagination-info", { ref: "paginationInfo" }),
        h("vuetable-pagination", {
          ref: "pagination",
          props: {
            css: this.css.pagination
          },
          on: {
            "vuetable-pagination:change-page": this.onChangePage
          }
        })
      ]);
    },
    // ------------------
    allcap(value) {
      return value.toUpperCase();
    },
    genderLabel(value) {
      return value === "M"
        ? '<span class="ui teal label"><i class="large man icon"></i>Male</span>'
        : '<span class="ui pink label"><i class="large woman icon"></i>Female</span>';
    },
    formatNumber(value) {
      return accounting.formatNumber(value, 2);
    },
    formatDate(value, fmt = "D MMM YYYY") {
      return value == null ? "" : moment(value, "YYYY-MM-DD").format(fmt);
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onCellClicked(data, field, event) {
      console.log("cellClicked: ", field.name);
      this.$refs.vuetable.toggleDetailRow(data.id);
    },
    onFilterSet(filterText) {
      this.appendParams.filter = filterText;
      Vue.nextTick(() => this.$refs.vuetable.refresh());
    },
    onFilterReset() {
      delete this.appendParams.filter;
      Vue.nextTick(() => this.$refs.vuetable.refresh());
    },
    reloadTable() {
      this.$refs.vuetable.refresh();
    }
  }
};
</script>
