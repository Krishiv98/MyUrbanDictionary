<template>
  <!--    <div style="position:relative; height:400px; overflow-y:scroll;">-->
  <div class="home">
    <b-button>{{$route.query.urbanid }}</b-button>
    <b-card-group v-b-scrollspy v-for="(item) of Defintions"
                  :key="item.UrbanTermDefinitionID"
    >
      <b-card :key="item.UrbanTermDefinitionID" style="max-width: 100%; margin: 10px"
              bg-variant="dark" text-variant="white" >
        <b-card-text>
          {{ item.Definition }}
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
        <b-card-footer footer-bg-variant="Success" class="mb-4 mt-4">

          <p class="h5 mb-2" >
            <b-icon icon="person-circle" ></b-icon>
            {{ item.UserName}}
          </p>

          <IconButton icon="hand-thumbs-up"
                      animation-style="cylon" variant="secondary"
                      :animate="false">
            Like
          </IconButton>
          <IconButton icon="hand-thumbs-down"
                      animation-style="cylon" variant="secondary"
                      :animate="false">
            Dislike
          </IconButton>
        </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Mixins } from 'vue-property-decorator';
import GlobalMixin from '@/mixins/global-mixin';
import IconButton from '@/components/IconButton.vue';
import { BIcon } from 'bootstrap-vue';

@Component({
  components: {
    IconButton, BIcon,
  },
})
export default class UrbanTermView extends Mixins(GlobalMixin) {
  @Prop() private urbanTermID!: number;

  Defintions = [
    {
      user: 1,
      urbanterm: 'Term1',
      definition: 'Definitions',
      likes: 30,
      dislike: 40,

    },
    {
      user: 2,
      urbanterm: 'Term2',
      definition: 'Definitions2',
      likes: 300,
      dislike: 400,

    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  getAllTheDefinitionsByUrbanID(urbantermID:number) {
    return {
      Defintion1: {
        DefinitionID: urbantermID,
        Definition: 'This is a defintion',
        UserName: 'User Name',
        UserID: 1,
      },
    };
  }
}
</script>
