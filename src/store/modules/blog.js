import fetch from '@/utils/fetch'

const blog = {
  state: {
  },

  mutations: {
  },

  getters: {
  },

  actions: {
    getUserList: async ({ state, dispatch, commit }, data) => {
      let url = '/blog/listUser'
      const res = await fetch.post(url, data)
      return res
    },
    getArticleList: async ({ state, dispatch, commit }, data) => {
      let url = '/blog/listArticle'
      const res = await fetch.post(url, data)
      return res
    },
    getSimilarArticleList: async ({ state, dispatch, commit }, data) => {
      let url = '/blog/listArticleByTag'
      const res = await fetch.post(url, data)
      return res
    },
    getArticleDetail: async ({ state, dispatch, commit }, data) => {
      let url = '/blog/getArticle'
      const res = await fetch.post(url, data)
      return res
    },
    getReadingList: async ({ state, dispatch, commit }, data) => {
      let url = '/blog/getReadingList'
      const res = await fetch.post(url, data)
      return res
    },
    getRank: async ({ state, dispatch, commit }, data) => {
      let url = '/blog/getRank'
      const res = await fetch.post(url, data)
      return res
    }
  }
}

export default blog
