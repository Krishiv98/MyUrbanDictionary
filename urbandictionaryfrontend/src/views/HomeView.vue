<template>
  <div class="home">

    <header class="mt-2">

      <!--      Header Animation-->
      <section class="py-5 text-center movearea container-fluid" @mousemove="onMousemove"
               :style="{backgroundColor: `hsla(${x}, 80%, 50%, 50%) `}">
        <div class=" mask row py-lg-5" style="background-color: rgba(0, 0, 0, 0.8);">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light text-white">Urban Dictionary</h1>
            <p class="lead text-white">Wondering what does that Urban Term mean?
              Yes? You have come to the right place</p>
            <p>
              <b-button @click="show = !show" class="m-1">Search you Urban Word</b-button>
              <router-link :to="`/urbantermcreation`" >
                <b-button
                  variant="primary">Create Your Urban Term and define it</b-button>
              </router-link>
            </p>

            <!-- Element to collapse -->
            <Transition name="bounce">
              <p v-if="show">
                <search-bar></search-bar>
              </p>
            </Transition>

          </div>
        </div>
      </section>
    </header>

    <!-- This where the trending UrbanTerms will show up-->
    <div>
      <b-card-group v-b-scrollspy v-for="(item) in trendingUrbanTerms" :key="item.id"
      >
        <b-card :key="item.id"
                style="max-width: 100%; margin: 10px"
                bg-variant="dark" text-variant="white" :title="item.UrbanTerm" >
          <b-card-text>
            <!--            {{findMostTrendingDefinition(item)}}-->
            <div v-if="item.definitions.length !== 0">
              <ul v-for="definition in item.definitions
                .slice(0,1)" :key="definition.id">
                <li :key="definition.id">
                  {{definition.definition}}
                </li>
              </ul>
            </div>
            <div v-else>
              <li>No definitions yet.</li>
            </div>

          </b-card-text>

          <router-link :to="`/urbanterm?urbanid=${item.id}`" >
            <b-button variant="primary">
              See All Definitions </b-button></router-link>

          <b-card-footer footer-bg-variant="Success" class="mb-4 mt-4">

            <p class="h5 mb-2" >
              <b-icon icon="person-circle" ></b-icon>
              {{ item.UserName}}
            </p>

            <IconButton icon="hand-thumbs-up" animation-style="cylon" variant="secondary"
                        :animate="false">
              Like {{"Hard coded likes"}}
            </IconButton>
            <IconButton icon="hand-thumbs-down" animation-style="cylon" variant="secondary"
                        :animate="false">
              Dislike
            </IconButton>
          </b-card-footer>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Mixins, Prop,
} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import IconButton from '@/components/IconButton.vue';
import { BIcon } from 'bootstrap-vue';
import SearchBar from '@/components/SearchBar.vue';
import GlobalMixin from '@/mixins/global-mixin';
import { onMounted } from 'vue';

@Component({
  components: {
    HelloWorld, IconButton, BIcon, SearchBar,
  },

})
export default class HomeView extends Mixins(GlobalMixin) {
  @Prop()
  trendingUrbanTerms = null;

  @Prop()
  tempLikes = 0;

  @Prop()
  tempDislikes = 0;

  show = false

  async mounted() {
    // Use the mapped getter and action.
    this.$props.trendingUrbanTerms = await this.callAPI(this.TermApi());
    this.$props.trendingUrbanTerms.reverse();
  }

  /**
   * This method will sort the defintions for a urban term and return the most
   * deifnitions for each term with the highest amount of likes
   * @param item
   */
  // eslint-disable-next-line
  findMostTrendingDefinition(item: any) {
  }

  // Page  Banner animation
  x = 0;

  onMousemove(e: any) {
    this.x = e.clientX;
    console.log(this.trendingUrbanTerms);
  }
}
</script>
<style>
.movearea {
  transition: 0.3s background-color ease;
}

/*Search bar animation CSS*/
.bounce-enter-active {
  animation: bounce-in 0.1s;
}
.bounce-leave-active {
  animation: bounce-in 0.1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
