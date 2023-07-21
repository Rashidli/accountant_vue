<template>
    <div class="about">
      <div class="container">
        <h3>sent</h3>
        <hr />
        <router-link
          :to="'/edit-sent/' + this.$route.params.id"
          class="btn btn-primary"
          >Dəyişdir</router-link
        >
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nömrəsi</th>
              <th scope="col">Müəssisə adı</th>
              <th scope="col">Quotation nömrəsi</th>
              <th scope="col">Tarix</th>
              <th scope="col">Ümumi məbləğ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ sent_show.sent_number }}</td>
              <td>{{ sent_show.company_name }}</td>
              <td>{{ sent_show.quotation_number }}</td>
              <td>{{ sent_show.time }}</td>
              <td>{{ sent_show.total_price }}</td>
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
              v-for="products in sent_show.sent_products"
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
        sent_show: {
          sent_number: undefined,
          company_name: undefined,
          quotation_number: undefined,
          time: undefined,
          total_price: undefined,
          sent_products: [],
        },
      };
    },
  
    methods: {
      showData() {
        axios
          .get(
            "https://sheet.washing.az/api/sent_show/" + this.$route.params.id
          )
          .then((response) => {
            this.sent_show.sent_number = response.data.sent_number;
            this.sent_show.company_name = response.data.company_name;
            this.sent_show.quotation_number = response.data.quotation_number;
            this.sent_show.time = response.data.time;
            this.sent_show.sent_products =
              response.data.sent_products;
            this.sent_show.total_price = response.data.total_price;
          });
      },
    },
    mounted() {
      this.showData();
    },
  };
  </script>