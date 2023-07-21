<template>
  <div class="about">
    <div class="container">
      <h3>Quotation əlavə et</h3>
      <hr />
      <div class="width">
        <div class="alert alert-primary" v-if="savingSuccessful">
          {{ this.text }}
        </div>

        <form @submit.prevent="postData" method="post">
          <div class="form-group">
            <label for="company">Müəssisə seçin</label>
            <select
              name="company"
              v-model="post.company_name"
              class="form-control"
            >
              <option
                v-for="company in companies"
                v-bind:key="company.id"
                :value="company.title"
              >
                {{ company.title }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="contract_name">Müqavilə adı</label>
            <input
              name="contract_name"
              v-model="post.contract_name"
              type="text"
              class="form-control"
              placeholder="Müqavilə adı"
            />
          </div>
          <div class="form-group">
            <label for="time">Tarixi</label>
            <input
              name="time"
              v-model="post.time"
              type="date"
              class="form-control"
              aria-describedby="nameHelp"
              placeholder="Tarixi"
            />
          </div>
          <dynamic-form ref="dynamicform" />
          <button type="submit" class="btn btn-primary">Submit</button>
          <!-- <button @click="getChildData">get data</button> -->
        </form>
        <hr />
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import DynamicForm from "@/components/DynamicForm.vue";
export default {
  components: {
    DynamicForm,
  },
  data() {
    return {
      product_list: undefined,
      quotation_id: undefined,
      v$: useVuelidate(),
      companies: undefined,
      quotations: undefined,
      quotation_show: {
        company_name: undefined,
        contract_name: undefined,
        time: undefined,
      },
      post: {
        company_name: undefined,
        contract_name: undefined,
        time: undefined,
        total_price: 0,
        form: undefined
      },
      products: "",
      product: {
        product_name: [],
        product_quantity: [],
        measure: [],
        price: [],
        total: [],
      },
      text: "Success",
      savingSuccessful: false,
      
    };
  },
  validations() {
    return {
      post: {
        company_name: { required },
        contract_name: { required },
        time: { required },
      },
    };
  },
  methods: {
    
    getCompanies() {
      axios.get("https://sheet.washing.az/api/institutions").then((response) => {
        this.companies = response.data;
      });
    },
    getProducts() {
      axios.get("https://sheet.washing.az/api/products").then((response) => {
        this.product_list = response.data;
      });
    },
    getData() {
      axios.get("https://sheet.washing.az/api/quotations").then((response) => {
        this.quotations = response.data;
      });
    },
    deleteData(id) {
      axios.get("https://sheet.washing.az/api/quotation_delete/" + id).then(() => {
        this.getData();
        this.savingSuccessful = true;
        setTimeout(() => (this.savingSuccessful = false), 2000);
      });
    },
    postData(e) {
      console.log(this.$refs.dynamicform.totalItemsAmount)
      this.post.form = this.$refs.dynamicform.productItems;
      this.post.total_price = this.$refs.dynamicform.totalItemsAmount;
      this.v$.$validate();
      console.log(this.post)
      if (!this.v$.$error) {
        axios
          .post("https://sheet.washing.az/api/quotation_store", this.post)
          .then((response) => {
            this.getData();
            (this.post.company_name = ""),
              (this.post.contract_name = ""),
              (this.post.time = ""),
              (this.savingSuccessful = true);
            setTimeout(() => (this.savingSuccessful = false), 2000);
            this.$router.push('/quotation')
          });
      } else {
        alert("Fill all inputs");
      }
      e.preventDefault();
    },
    showData(id) {
      axios
        .get("https://sheet.washing.az/api/quotation_show/" + id)
        .then((response) => {
          this.quotation_show.id = response.data.id;
          this.quotation_show.company_name = response.data.company_name;
          this.quotation_show.contract_name = response.data.contract_name;
          this.quotation_show.time = response.data.time;
        });
    },
    updateData() {
      axios
        .post(
          "https://sheet.washing.az/api/quotation_update/" +
            this.quotation_show.id,
          this.quotation_show
        )
        .then((response) => {
          this.savingSuccessful = true;
          setTimeout(() => (this.savingSuccessful = false), 2000);
          this.getData();
        });
    },
    getId(id) {
      this.quotation_id = id;
    },
  },
  mounted() {
    this.getData();
    this.getCompanies();
    this.getProducts();
  },
};
</script>

<style>
.for_span {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>