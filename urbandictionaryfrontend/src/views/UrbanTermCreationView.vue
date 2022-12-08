<template>
  <!--    <div style="position:relative; height:400px; overflow-y:scroll;">-->
  <div>
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
</template>

<script>
import GlobalMixin from '@/mixins/global-mixin';
import { Mixins } from 'vue-property-decorator';

export default class UrbanTermCreationView extends Mixins(GlobalMixin) {
  currentUrbanTermDefinitions = [
    {
      UrbanTermDefinitionID: 1,
    },
  ]
}
</script>

<style scoped>

</style>
