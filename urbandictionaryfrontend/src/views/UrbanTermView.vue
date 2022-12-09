<template>
  <div class="py-5 text-center  container-fluid">
    <div class=" mask py-lg-5" style="background-color: rgba(0, 0, 0, 0.8);">
      <h1 class="fw-light text-white">{{$props.trendingUrbanTerms.UrbanTerm }}</h1></div>

    <!--    Definitions for the current Urban terms-->
    <b-card-group v-b-scrollspy v-for="(item) in $props.definitions"
                  :key="item.id"
    >
      <b-card :key="item.id" style="max-width: 100%; margin: 10px"
              bg-variant="dark" text-variant="white" :title="item.definition" >
        <b-card-text>
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
        <b-card-footer footer-bg-variant="Success" class="mb-4 mt-4">

          <p class="h5 mb-2" >
            <b-icon icon="person-circle" ></b-icon>
            'hardcoded user '
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
  @Prop()
  definitions = null;

  currentUrbanTerm:any = this.$route.query.urbanid ;

  @Prop()
  trendingUrbanTerms = null;

  async mounted() {
    // Use the mapped getter and action.
    this.$props.trendingUrbanTerms = await this.callAPI(`${this.TermApi()}/${this.$route.query.urbanid}`);
    this.$props.definitions = await this.$props.trendingUrbanTerms.definitions;
    console.log(this.$props.trendingUrbanTerms);
    // console.log(this.$props.definitions);
  }
  //
  // loadAllTheDefinitionsByUrbanID() {
  //   const arrayOfUrbanTerms = this.$props.trendingUrbanTerms;
  //   const id = this.$route.query.urbanid;
  //   // eslint-disable-next-line no-param-reassign
  //   arrayOfUrbanTerms.filter((element:any, value:any, array:any) => element.id === id);
  //
  //   console.log(arrayOfUrbanTerms[0].definitions);
  //   return arrayOfUrbanTerms[0].definitions[0];
  // }
}
</script>
