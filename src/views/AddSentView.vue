<template>
  <div class="about">
    <div class="container">
      <h3>sent əlavə et</h3>
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
            <label for="quotation_number">Quotation nömrəsi</label>
            <select
              name="quotation_number"
              v-model="post.quotation_number"
              class="form-control"
              placeholder="Quotation nömrəsi"
            >
              <option
                placeholder="Müəssisə"
                v-for="quotation in quotations_list"
                v-bind:key="quotation.id"
                :value="quotation.quotation_number"
              >
                {{ quotation.quotation_number }}
              </option>
            </select>
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
        quotations_list:undefined,
      product_list: undefined,
      sent_id: undefined,
      v$: useVuelidate(),
      companies: undefined,
      sents: undefined,
      sent_show: {
        company_name: undefined,
        quotation_number: undefined,
        time: undefined,
      },
      post: {
        company_name: undefined,
        quotation_number: undefined,
        time: undefined,
        total_price: 0,
        form: undefined,
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
        quotation_number: { required },
        time: { required },
      },
    };
  },
  methods: {
    getCompanies() {
      axios
        .get("https://sheet.washing.az/api/institutions")
        .then((response) => {
          this.companies = response.data;
        });
    },
    getProducts() {
      axios.get("https://sheet.washing.az/api/products").then((response) => {
        this.product_list = response.data;
      });
    },
    getData() {
      axios.get("https://sheet.washing.az/api/sents").then((response) => {
        this.sents = response.data;
      });
    },
    deleteData(id) {
      axios.get("https://sheet.washing.az/api/sent_delete/" + id).then(() => {
        this.getData();
        this.savingSuccessful = true;
        setTimeout(() => (this.savingSuccessful = false), 2000);
      });
    },
    postData(e) {
      console.log(this.$refs.dynamicform.totalItemsAmount);
      this.post.form = this.$refs.dynamicform.productItems;
      this.post.total_price = this.$refs.dynamicform.totalItemsAmount;
      this.v$.$validate();
      console.log(this.post);
      if (!this.v$.$error) {
        axios
          .post("https://sheet.washing.az/api/sent_store", this.post)
          .then((response) => {
            this.getData();
            (this.post.company_name = ""),
              (this.post.quotation_number = ""),
              (this.post.time = ""),
              (this.savingSuccessful = true);
            setTimeout(() => (this.savingSuccessful = false), 2000);
            this.$router.push("/sent");
          });
      } else {
        alert("Fill all inputs");
      }
      e.preventDefault();
    },
    showData(id) {
      axios
        .get("https://sheet.washing.az/api/sent_show/" + id)
        .then((response) => {
          this.sent_show.id = response.data.id;
          this.sent_show.company_name = response.data.company_name;
          this.sent_show.quotation_number = response.data.quotation_number;
          this.sent_show.time = response.data.time;
        });
    },
    updateData() {
      axios
        .post(
          "https://sheet.washing.az/api/sent_update/" + this.sent_show.id,
          this.sent_show
        )
        .then((response) => {
          this.savingSuccessful = true;
          setTimeout(() => (this.savingSuccessful = false), 2000);
          this.getData();
        });
    },
    getId(id) {
      this.sent_id = id;
    },
    getQuotations() {
      axios.get("https://sheet.washing.az/api/quotations").then((response) => {
        this.quotations_list = response.data;
      });
    },
  },
  mounted() {
    this.getData();
    this.getCompanies();
    this.getProducts();
    this.getQuotations();
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