<template>
  <div class="home">

    <header class="mt-2">

      <section class="py-5 text-center movearea container-fluid" @mousemove="onMousemove"
               :style="{backgroundColor: `hsl(${x}, 80%, 50%) `}">
        <div class=" mask row py-lg-5" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light text-white">Urban Dictionary</h1>
            <p class="lead text-white">Wondering what does that Urban Term mean?
              Yes? You have come to the right place</p>
            <p>
              <b-button @click="show = !show" class="m-1">Search you Urban Word</b-button>

              <b-button href="#" variant="primary">Create Your Urban Term and define it</b-button>
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

    <div style="position:relative; height:400px; overflow-y:scroll;">
      <b-card-group v-b-scrollspy v-for="(item) in trendingUrbanTerms" :key="item.UrbanTermID"
      >
        <b-card :key="item.UrbanTermID" style="max-width: 100%; margin: 10px"
                bg-variant="dark" text-variant="white" :title="item.UrbanTerm" >
          <b-card-text>
            {{ item.Definition }}
          </b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
          <b-card-footer footer-bg-variant="Success" class="mb-4 mt-4">

            <p class="h5 mb-2" >
              <b-icon icon="person-circle" ></b-icon>
              {{ item.UserName}}
            </p>

            <IconButton icon="hand-thumbs-up" animation-style="cylon" variant="secondary"
                        :animate="false">
              Like
            </IconButton>
            <IconButton icon="hand-thumbs-down" animation-style="cylon" variant="secondary"
                        :animate="false">
              Dislike
            </IconButton>
          </b-card-footer>
        </b-card>
      </b-card-group>
    </div>
    <ParticlesBg type="cobweb" :bg="true" canvas/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import IconButton from '@/components/IconButton.vue';
import { BIcon, VBScrollspy } from 'bootstrap-vue';
import SearchBar from '@/components/SearchBar.vue';
// import { ParticlesBg } from 'particles-bg-vue';

@Component({
  components: {
    HelloWorld, IconButton, BIcon, SearchBar,
  },
})
export default class HomeView extends Vue {
  // This method will use Get method and populate a list of
  // Urban terms array which will be used in the template

  // eslint-disable-next-line class-methods-use-this

  trendingUrbanTerms= [
    {
      UrbanTermID: 1,
      UrbanTerm: 'Term1',
      UrbanTermDefinitionID: 1,
      Definition: 'This is the definition of the Term1',
      DefinitionLikes: 30,
      DefinitionDislikes: 10,
      UserName: 'User1',

    },
    {
      UrbanTermID: 2,
      UrbanTerm: 'Term1',
      UrbanTermDefinitionID: 2,
      Definition: 'This is the definition of the Term2',
      DefinitionLikes: 30,
      DefinitionDislikes: 10,
      UserName: 'User2',

    },
    {
      UrbanTermID: 3,
      UrbanTerm: 'Term3',
      UrbanTermDefinitionID: 3,
      Definition: 'This is the definition of the Term3',
      DefinitionLikes: 30,
      DefinitionDislikes: 10,
      UserName: 'User3',

    },
    {
      UrbanTermID: 4,
      UrbanTerm: 'Term3',
      UrbanTermDefinitionID: 3,
      Definition: 'This is the definition of the Term3',
      DefinitionLikes: 30,
      DefinitionDislikes: 10,
      UserName: 'User3',

    },
  ]

  // Banner animation
  x = 0;

  onMousemove(e:any) {
    this.x = e.clientX;
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function
  getAllUrbanTerms() {

  }

  // getTheTopUrbanTermDefinition(UrbanTermID:number) {
  //
  // }
  //
  // getUserByDefinitionID(UrbanTermDefinitionID:number) {
  //
  // }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,class-methods-use-this
  handleUrbanTermClick() {

  }

  // handleLikeButtonClick(UrbanTerm:Any) {
  //
  // }
  //
  // handleDisLikeButtonClick(UrbanTerm:Any) {
  //
  // }
}
</script>
<style>
.movearea {
  transition: 0.3s background-color ease;
}

/*Search bar animation CSS*/
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.2s reverse;
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
