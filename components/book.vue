<template>
  <v-row>
    <v-col cols="12">
      <div>Ebook for Us</div>
      <v-row>
        <v-col cols="4" class="mx-0 px-0">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            prepend-inner-icon="mdi-magnify"
            clearable
          >
          </v-text-field>
        </v-col>
        <v-col cols="2" class="px-0 justify-center align-center">
          <v-btn color="primary">search</v-btn></v-col
        >
      </v-row>
    </v-col>
    <v-col v-for="book in getBook" :key="book.isbn13" cols="12" sm="3">
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="book.image" lazy-src="/200w.gif">
            <div class="pa-1">
              <v-chip small color="warning" label>
                {{ book.price }}
              </v-chip>
            </div>
          </v-img>

          <v-card-text>
            <h2 class="text-h6 primary--text">
              {{ book.title }}
            </h2>
            {{ book.subtitle }}
          </v-card-text>

          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn @click="showDetail(book.isbn13)">read more</v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </v-hover>
    </v-col>
    <v-dialog v-model="dialog" max-width="700">
      <v-card class="ma-0 pa-0">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-title>Ebook Shop</v-card-title>
            <v-card-text
              ><div class="font-weight-bold text-subtitle-1">
                {{ getBookDetail.title }}
              </div>
              <div class="text-caption">{{ getBookDetail.subtitle }}</div>
              <div class="mt-3 d-flex justify-space-between">
                <div>
                  <div>Price</div>
                  <div>{{ getBookDetail.price }}</div>
                </div>
                <div class="pr-8">
                  <div>Language</div>
                  <div>
                    {{getBookDetail.language}}
                  </div>
                </div>
              </div>
              <div class="mt-3 d-flex justify-space-between">
                <div>
                  <div>page</div>
                  <div>{{ getBookDetail.pages }}</div>
                </div>
                <div>
                  <div>Ratine</div>
                  <div>
                    <v-rating
                      dense
                      :value="getBookDetail.rating"
                      color="warning"
                      small
                    ></v-rating>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary"> <v-icon>mdi-plus</v-icon> Buy Now </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img :src="getBookDetail.image"></v-img>
          </v-col>
          <v-col cols="12">
            <div class="mx-2">
              <div>
                <div class="font-weight-bold text-subtitle-1">Authors</div>
                <div>{{ getBookDetail.authors }}</div>
              </div>
              <div>
                <div class="font-weight-bold text-subtitle-1">Description</div>
                <div>{{ getBookDetail.desc }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'IbookBook',

  data() {
    return {
      overlay: false,
      dialog: false,
    }
  },

  computed: {
    getBook() {
      return this.$store.state.api.book
    },
    getBookDetail() {
      return this.$store.state.api.bookDetail
    },
  },

  mounted() {
    this.$store.dispatch('api/selectBook')
  },

  methods: {
    showDetail(isbn13) {
      this.$store.dispatch('api/selectBookDetail', isbn13)
      this.dialog = true
    },
  },
}
</script>

<style lang="scss" scoped></style>
