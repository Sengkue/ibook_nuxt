<template>
  <div>
    <v-row dense>
      <v-col cols="12">
        <v-card flat class="mb-5">
          <v-card-title>EBook Shop</v-card-title>
          <v-card-subtitle>
            You can search whatever books you wanna buy
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="search"
                  dense
                  hide-details="auto"
                  label="Search here"
                  outlined
                  prepend-inner-icon="mdi-magnify"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn color="primary" @click="onSearch"> Search Now </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="loading" cols="12">
        <v-card :loading="loading" flat>
          <v-card-text>Searching...</v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="data in book.books"
        :key="data.isbn13"
        cols="12"
        sm="4"
        md="3"
      >
        <v-fab-transition>
          <v-hover v-slot="{ hover }">
            <v-card height="450" :elevation="hover ? '9' : '0'">
              <v-img :src="data.image" lazy-src="/200w.gif">
                <div class="pa-1">
                  <v-chip v-if="!hover" small color="warning" label>{{
                    data.price
                  }}</v-chip>
                </div>
              </v-img>
              <v-overlay :absolute="true" :opacity="0.4" :value="hover">
                <div class="text-center">
                  <v-btn color="primary" @click="readMore(data)"
                    >Read More</v-btn
                  >
                </div>
              </v-overlay>
              <v-card-title>
                {{ data.title }}
              </v-card-title>
              <v-card-subtitle>{{ data.subtitle }}</v-card-subtitle>
            </v-card>
          </v-hover>
        </v-fab-transition>
      </v-col>
      <v-col v-if="!isNoMore && book.books" cols="12">
        <div class="text-center">
          <v-btn :loading="loading" color="primary" small @click="seeMore">
            See More
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="modal" max-width="500" persistent>
      <v-card>
        <v-card-title>Book Details</v-card-title>
        <v-card-text v-if="!detailLoading">
          <v-row>
            <v-col cols="12" sm="6">
              <div class="pt-5">
                <div class="font-weight-bold text-subtitle-1">
                  {{ detail.title }}
                </div>
                <div class="text-caption">{{ detail.subtitle }}</div>
                <div class="mt-3 font-weight-bold text-subtitle-1">
                  {{ detail.price }}
                </div>
                <div class="d-flex mt-3 justify-space-between">
                  <div>
                    <div>Pages</div>
                    <div class="font-weight-bold">{{ detail.pages }}</div>
                  </div>
                  <div>
                    <div>Rating</div>
                    <div>
                      <v-rating
                        dense
                        :value="detail.rating"
                        color="warning"
                        small
                      ></v-rating>
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-5">
                <v-btn color="primary" small @click="modal = false">
                  <v-icon left small>mdi-cart-plus</v-icon>
                  Buy Now
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <v-img :src="detail.image"></v-img>
            </v-col>
            <v-col cols="12">
              <div class="text-caption font-weight-bold mt-1">Authors</div>
              <div>{{ detail.authors }}</div>
              <div class="text-caption font-weight-bold mt-1">Description</div>
              <div>{{ detail.desc }}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <div>Download PDFs</div>
          <ul>
            <li v-for="(item, i) in detail.pdf" :key="i">
              {{ item }}
              <a
                :href="item"
                download=""
                target="_blank"
                style="text-decoration: none"
              >
                <v-icon small color="primary">mdi-download</v-icon>
              </a>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "InspirePage",
  data() {
    return {
      book: {},
      hoverIndex: 2,
      search: null,
      loading: false,
      modal: false,
      detail: {},
      detailLoading: false,
      page: 1,
      isNoMore: true,
    };
  },
  async mounted() {},
  methods: {
    async onSearch(search = true) {
      if (search) this.book = {};
      this.isNoMore = false;
      if (!this.search) return null;
      this.loading = true;
      const data = await this.$axios.get(
        `https://api.itbook.store/1.0/search/${this.search}?page=${this.page}`,
        {}
      );
      if (data.data.books.length === 0) {
        this.isNoMore = true;
      }
      if (!this?.book?.books?.length) {
        this.book = data.data;
      } else {
        const newBooks = this.book.books.concat(data.data.books);
        this.book.books = JSON.parse(JSON.stringify(newBooks));
      }
      this.loading = false;
    },
    async readMore(data) {
      this.detailLoading = true;
      this.detail = {};
      this.modal = true;
      const response = await this.$axios.get(
        `https://api.itbook.store/1.0/books/${data.isbn13}`
      );
      this.detail = response.data;
      this.detailLoading = false;
    },
    seeMore() {
      this.page = this.page + 1;
      this.onSearch(false);
    },
  },
};
</script>
