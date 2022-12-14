<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list class="bg">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="bg"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="bg" fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      fixed: false,

      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
        {
          icon: 'mdi-robot',
          title: 'search',
          to: '/search',
        },
        {
          icon: 'mdi-animation',
          title: 'Other',
          to: '/search',
        },
        {
          icon: 'mdi-flower',
          title: 'Flower',
          to: '/search',
        },
        {
          icon: 'mdi-bird',
          title: 'Bird',
          to: '/search',
        },
      ],

      right: true,
      rightDrawer: true,
      title: 'Mini Projet ibook ',
    }
  },
}
</script>
<style lang="scss" scoped>
.bg {
  background: url('/images/bg.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero {
  background: url('https://img.freepik.com/free-vector/white-technology-background_23-2148390327.jpg?w=2000');
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow-y: auto;
  height: 100vh;
}
</style>
