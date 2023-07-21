<template>
    <div class="about">
      <div class="container">
        <h3>income</h3>
        <hr />
        <router-link
          :to="'/edit-income/' + this.$route.params.id"
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
              <td>{{ income_show.income_number }}</td>
              <td>{{ income_show.warehouse_name }}</td>
              <td>{{ income_show.po_number }}</td>
              <td>{{ income_show.total_price }}</td>
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
              v-for="products in income_show.income_products"
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
        income_show: {
          income_number: undefined,
          warehouse_name: undefined,
          po_number: undefined,
          total_price: undefined,
          income_products: [],
        },
      };
    },
  
    methods: {
      showData() {
        axios
          .get(
            "https://sheet.washing.az/api/income_show/" + this.$route.params.id
          )
          .then((response) => {
            this.income_show.income_number = response.data.income_number;
            this.income_show.warehouse_name = response.data.warehouse_name;
            this.income_show.po_number = response.data.po_number;
            this.income_show.income_products =
              response.data.income_products;
            this.income_show.total_price = response.data.total_price;
          });
      },
    },
    mounted() {
      this.showData();
    },
  };
  </script>