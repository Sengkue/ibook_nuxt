export const state = () =>({
   book:{},
   bookDetail:{},
})

export const mutations = {
  setBook(state, data){
    state.book = data
  },
  setBookDetail(state, data){
    state.bookDetail = data
  }
}

export const actions = {
  selectBook({commit}){
    this.$axios.get('https://api.itbook.store/1.0/search/$%7Bsearch%7D').then((data)=>{
      commit('setBook', data.data.books)
    })
  },
  selectBookDetail({commit}, isbn13){
    this.$axios.get(`https://api.itbook.store/1.0/books/${isbn13}`).then((data)=>{
      commit('setBookDetail', data.data)
    })
  }
}
