 <template>
  <div style="min-height: 100vh; display: flex; flex-direction: column; background: #f9fafb;">
    <Toast />
    <Navbar />
    <main style="flex: 1;">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'

export default {
  name: 'App',
  components: { Navbar, Footer, Toast }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}
</style>