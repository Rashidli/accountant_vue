<template>
    <div class="about">
      <div class="container">
        <h3>expense</h3>
        <hr />
        <router-link
          :to="'/edit-expense/' + this.$route.params.id"
          class="btn btn-primary"
          >Dəyişdir</router-link
        >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nömrəsi</th>
              <th scope="col">Anbar adı</th>
              <th scope="col">PO nömrəsi</th>
              <th scope="col">Ümumi məbləğ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ expense_show.expense_number }}</td>
              <td>{{ expense_show.warehouse_name }}</td>
              <td>{{ expense_show.po_number }}</td>
              <td>{{ expense_show.total_price }}</td>
            </tr>
          </tbody>
        </table>
        <h3>Məhsullar</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Məhsul</th>
              <th scope="col">Miqdarı</th>
              <th scope="col">Ölçü vahidi</th>
              <th scope="col">Qiyməti</th>
              <th scope="col">Ümumi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="products in expense_show.expense_products"
              v-bind:key="products.id"
            >
              <td>{{ products.name }}</td>
              <td>{{ products.quantity }}</td>
              <td>{{ products.measure }}</td>
              <td>{{ products.price }}</td>
              <td>{{ products.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
    
    <script>
  import axios from "axios";
  export default {
    data() {
      return {
        expense_show: {
          expense_number: undefined,
          warehouse_name: undefined,
          po_number: undefined,
          total_price: undefined,
          expense_products: [],
        },
      };
    },
  
    methods: {
      showData() {
        axios
          .get(
            "https://sheet.washing.az/api/expense_show/" + this.$route.params.id
          )
          .then((response) => {
            this.expense_show.expense_number = response.data.expense_number;
            this.expense_show.warehouse_name = response.data.warehouse_name;
            this.expense_show.po_number = response.data.po_number;
            this.expense_show.expense_products =
              response.data.expense_products;
            this.expense_show.total_price = response.data.total_price;
          });
      },
    },
    mounted() {
      this.showData();
    },
  };
  </script>