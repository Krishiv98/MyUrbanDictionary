<template>
  <div class="py-5 text-center  container-fluid">
    <div class=" mask py-lg-5 p-2" style="background-color: rgba(0, 0, 0, 0.8);">
      <h1 class="fw-light text-white">{{$props.trendingUrbanTerms.UrbanTerm }}</h1>

      <b-button @click="show = !show" class="m-1">Define it in your words!</b-button>

      <!-- Element to collapse -->
      <Transition name="bounce">
        <p v-if="show">
          <b-form-group class="mb-1" >
            <b-input-group>
              <b-form-textarea v-model="definitionToAdd"
                               placeholder="Write your definition here..." />
            </b-input-group>
            <b-button @click="saveStudent" variant="primary">
              Create Definiition </b-button>
          </b-form-group>
        </p>
      </Transition>

    </div>

    <!-- Create new definition  -->
    <b-modal title="Create Definition" ok-variant="primery" cancel-variant="primary"
             v-model="showDefinitionCreation">
      <template #modal-cancel>
        <!-- add a X icon to the cancel button-->
        <b-icon-x-square-fill /> cancel
      </template>

      <template #modal-ok>
        <!-- change the OK button to say Delete instead and add a trash can icon-->
        <b-icon-book-half /> Alright!
      </template>
      Definition succesfully created!
    </b-modal>

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

  show = false;

  currentUrbanTerm:any = this.$route.query.urbanid ;

  @Prop()
  trendingUrbanTerms = null;

  showDefinitionCreation = false;

  definitionToAdd = '';

  async mounted() {
    // Use the mapped getter and action.
    this.$props.trendingUrbanTerms = await this.callAPI(`${this.TermApi()}/${this.$route.query.urbanid}`);
    this.$props.definitions = await this.$props.trendingUrbanTerms.definitions;
    console.log(this.$props.trendingUrbanTerms);
    // console.log(this.$props.definitions);
  }

  violation: any = {} // will store violation messages that we get from the api

  createdSuccesfully() {
    this.showDefinitionCreation = true;
  }

  async saveStudent() {
    this.setBusy(true);// tell parent that this component is waiting for the api to respond
    const dataToSend = {

      user: 'I Am hardcoded',
      urbanterm: this.$props.trendingUrbanTerms.UrbanTerm,
      definition: this.definitionToAdd,

    };
    try {
      const data = await this.callAPI(`${this.TermApi()}/term`, 'POST', dataToSend); // returns a promise object
      this.$props.definitions = await this.$props.trendingUrbanTerms.definitions;
      this.createdSuccesfully();

      // eslint-disable-next-line no-empty
    } catch (err: any) {
      this.violation = this.mapValidationErrorArray(err.data);
    } finally {
      this.setBusy(false);// tell parent that this component is no longer waiting for the api
    }
  }
}
</script>
<style>
.movearea {
  transition: 0.3s background-color ease;
}

/*Search bar animation CSS*/
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
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
