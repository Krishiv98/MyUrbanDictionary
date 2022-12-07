<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>

    <b-card-group v-for="(item) in trendingUrbanTerms" :key="item.UrbanTermID">
      <b-card :key="item.UrbanTermID"
              :header="item.UrbanTerm"
              header-text-variant="white"
              header-tag="header"
              header-bg-variant="dark"
              :footer="item.UserName"
              footer-tag="footer"
              footer-bg-variant="success"
              footer-border-variant="dark"
              style="max-width: 100%;"
      >
        <b-card-text>{{ item.Definition }}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
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
      UrbanTermID: 3,
      UrbanTerm: 'Term3',
      UrbanTermDefinitionID: 3,
      Definition: 'This is the definition of the Term3',
      DefinitionLikes: 30,
      DefinitionDislikes: 10,
      UserName: 'User3',

    },
  ]

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
