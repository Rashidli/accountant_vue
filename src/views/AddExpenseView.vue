<template>
    <div class="about">
      <div class="container">
        <h3>expense əlavə et</h3>
        <hr />
        <div class="width">
          <div class="alert alert-primary" v-if="savingSuccessful">
            {{ this.text }}
          </div>
  
          <form @submit.prevent="postData" method="post">
            <div class="form-group">
              <label for="company">Anbar seçin</label>
              <select
                name="company"
                v-model="post.warehouse_name"
                class="form-control"
              >
                <option
                  v-for="company in warehouses"
                  v-bind:key="company.id"
                  :value="company.title"
                >
                  {{ company.title }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="quotation_number">PO nömrəsi</label>
              <select
                name="quotation_number"
                v-model="post.sent_number"
                class="form-control"
                placeholder="Quotation nömrəsi"
              >
                <option
                  placeholder="Müəssisə"
                  v-for="quotation in sents_list"
                  v-bind:key="quotation.id"
                  :value="quotation.sent_number"
                >
                  {{ quotation.sent_number }}
                </option>
              </select>
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
          sents_list: undefined,
        product_list: undefined,
        expense_id: undefined,
        v$: useVuelidate(),
        warehouses: undefined,
        expenses: undefined,
        expense_show: {
          warehouse_name: undefined,
          sent_number: undefined,
        },
        post: {
          warehouse_name: undefined,
          sent_number: undefined,
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
          warehouse_name: { required },
          sent_number: { required },
        },
      };
    },
    methods: {
      getSents() {
        axios.get("https://sheet.washing.az/api/sents").then((response) => {
          this.sents_list = response.data;
        });
      },
      getWarehouses() {
        axios.get("https://sheet.washing.az/api/warehouses").then((response) => {
          this.warehouses = response.data;
        });
      },
      getProducts() {
        axios.get("https://sheet.washing.az/api/products").then((response) => {
          this.product_list = response.data;
        });
      },
      getData() {
        axios.get("https://sheet.washing.az/api/expenses").then((response) => {
          this.expenses = response.data;
        });
      },
      deleteData(id) {
        axios.get("https://sheet.washing.az/api/expense_delete/" + id).then(() => {
          this.getData();
          this.savingSuccessful = true;
          setTimeout(() => (this.savingSuccessful = false), 2000);
        });
      },
      postData(e) {
        this.post.form = this.$refs.dynamicform.productItems;
        this.post.total_price = this.$refs.dynamicform.totalItemsAmount;
        this.v$.$validate();
        console.log(this.post);
        if (!this.v$.$error) {
          axios
            .post("https://sheet.washing.az/api/expense_store", this.post)
            .then((response) => {
              this.getData();
              (this.post.warehouse_name = ""),
                (this.post.sent_number = ""),
                (this.savingSuccessful = true);
              setTimeout(() => (this.savingSuccessful = false), 2000);
              this.$router.push("/expense");
            });
        } else {
          alert("Fill all inputs");
        }
        e.preventDefault();
      },
      showData(id) {
        axios
          .get("https://sheet.washing.az/api/expense_show/" + id)
          .then((response) => {
            this.expense_show.id = response.data.id;
            this.expense_show.warehouse_name = response.data.warehouse_name;
            this.expense_show.sent_number = response.data.sent_number;
            this.expense_show.total_price = response.data.total_price;
          });
      },
      updateData() {
        axios
          .post(
            "https://sheet.washing.az/api/expense_update/" + this.expense_show.id,
            this.expense_show
          )
          .then((response) => {
            this.savingSuccessful = true;
            setTimeout(() => (this.savingSuccessful = false), 2000);
            this.getData();
          });
      },
      getId(id) {
        this.expense_id = id;
      },
      
    },
    mounted() {
      this.getData();
      this.getProducts();
      this.getSents();
      this.getWarehouses();
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