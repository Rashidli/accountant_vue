<template>
  <div class="about">
    <div class="container">
      <h3>Quotation</h3>
      <hr />
      <router-link
        :to="'/edit-quotation/' + this.$route.params.id"
        class="btn btn-primary"
        >Dəyişdir</router-link
      >
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nömrəsi</th>
            <th scope="col">Müəssisə adı</th>
            <th scope="col">Müqavilə adı</th>
            <th scope="col">Tarix</th>
            <th scope="col">Ümumi məbləğ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ quotation_show.quotation_number }}</td>
            <td>{{ quotation_show.company_name }}</td>
            <td>{{ quotation_show.contract_name }}</td>
            <td>{{ quotation_show.time }}</td>
            <td>{{ quotation_show.total_price }}</td>
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
            v-for="products in quotation_show.quotation_products"
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
      quotation_show: {
        quotation_number: undefined,
        company_name: undefined,
        contract_name: undefined,
        time: undefined,
        total_price: undefined,
        quotation_products: [],
      },
    };
  },

  methods: {
    showData() {
      axios
        .get(
          "https://sheet.washing.az/api/quotation_show/" + this.$route.params.id
        )
        .then((response) => {
          this.quotation_show.quotation_number = response.data.quotation_number;
          this.quotation_show.company_name = response.data.company_name;
          this.quotation_show.contract_name = response.data.contract_name;
          this.quotation_show.time = response.data.time;
          this.quotation_show.quotation_products =
            response.data.quotation_products;
          this.quotation_show.total_price = response.data.total_price;
        });
    },
  },
  mounted() {
    this.showData();
  },
};
</script>