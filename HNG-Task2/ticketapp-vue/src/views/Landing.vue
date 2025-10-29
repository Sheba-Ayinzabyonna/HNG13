<template>
  <div>
    <!-- HERO SECTION -->
    <section :style="heroStyle">
      <!-- Decorative circles -->
      <div :style="circle1Style" />
      <div :style="circle2Style" />

      <div :style="heroInnerStyle">
        <div :style="heroLeftStyle">
          <h1 :style="h1Style">Manage Your Tickets with Ease</h1>
          <p :style="pStyle">
            Track, organize, and resolve tickets efficiently. Built for teams that value simplicity and speed.
          </p>
          <div :style="buttonsStyle">
            <router-link to="/auth/login" :style="btnLoginStyle">Login</router-link>
            <router-link to="/auth/signup" :style="btnSignupStyle">Get Started</router-link>
          </div>
        </div>
        <div :style="heroImageStyle">🎫</div>
      </div>

      <!-- Wave SVG -->
      <svg :style="waveStyle" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z" />
      </svg>
    </section>

    <!-- FEATURES SECTION -->
    <section :style="featuresContainerStyle">
      <h2 :style="h2Style">Why Choose TicketApp?</h2>
      <div :style="cardsGridStyle">
        <div v-for="(feature, i) in features" :key="i" :style="cardStyle">
          <h3 :style="h3Style">{{ feature.title }}</h3>
          <p :style="cardPStyle">{{ feature.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
    const features = [
      { title: 'Easy to Use', desc: 'Intuitive interface designed for quick ticket management' },
      { title: 'Fully Responsive', desc: 'Works seamlessly on desktop, tablet, and mobile devices' },
      { title: 'Secure & Reliable', desc: 'Your data is protected with industry-standard security' }
    ]

    return {
      features,
      heroStyle: {
        position: 'relative',
        background: 'linear-gradient(135deg, #006400 30%, #ff6347 100%)',
        color: 'white',
        padding: '100px 20px 200px',
        overflow: 'hidden'
      },
      circle1Style: {
        position: 'absolute',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.1)',
        top: '50px',
        left: '-50px',
        zIndex: 1
      },
      circle2Style: {
        position: 'absolute',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)',
        bottom: '100px',
        right: '-30px',
        zIndex: 1
      },
      heroInnerStyle: {
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '40px',
        position: 'relative',
        zIndex: 2
      },
      heroLeftStyle: {
        maxWidth: '550px'
      },
      h1Style: {
        fontSize: '3rem',
        marginBottom: '20px'
      },
      pStyle: {
        fontSize: '1.2rem',
        marginBottom: '30px',
        opacity: 0.9
      },
      buttonsStyle: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      },
      btnLoginStyle: {
        background: 'white',
        color: '#006400',
        padding: '14px 32px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: '600',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      },
      btnSignupStyle: {
        background: 'transparent',
        color: 'white',
        padding: '14px 32px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: '600',
        border: '2px solid white'
      },
      heroImageStyle: {
        width: '400px',
        height: '300px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '80px'
      },
      waveStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100px',
        zIndex: 1
      },
      featuresContainerStyle: {
        maxWidth: '1440px',
        margin: '60px auto',
        padding: '0 20px'
      },
      h2Style: {
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '40px'
      },
      cardsGridStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      },
      cardStyle: {
        background: 'white',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center'
      },
      h3Style: {
        fontSize: '1.5rem',
        marginBottom: '12px',
        color: '#006400'
      },
      cardPStyle: {
        color: '#6b7280'
      }
    }
  }
}
</script>
