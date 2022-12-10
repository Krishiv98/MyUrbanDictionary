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
            <b-button @click="createConfirm" variant="primary">
              Create Definiition </b-button>
          </b-form-group>
        </p>
      </Transition>

    </div>

    <!-- Create new definition  -->
    <b-modal title="Create Definition" ok-variant="primery" cancel-variant="primary"
             v-model="showDefinitionCreation" @ok="createDefinition">
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
            {{ item.displayname }}
          </p>

          <IconButton icon="hand-thumbs-up"
                      animation-style="cylon" variant="secondary"
                      :animate="false" @click="like(item)">
            Like {{item.likes}}
          </IconButton>
          <IconButton icon="hand-thumbs-down"
                      animation-style="cylon" variant="secondary"
                      :animate="false" @click="dislike(item)">
            Dislike {{item.dislikes}}
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

  @Prop()
  users = null;

  definitionToAdd = '';

  async mounted() {
    // Use the mapped getter and action.
    this.$props.trendingUrbanTerms = await this.callAPI(`${this.TermApi()}/${this.$route.query.urbanid}`);
    this.$props.definitions = await this.$props.trendingUrbanTerms.definitions;
    this.$props.users = await this.callAPI(this.UserApi());
    console.log(this.$props.trendingUrbanTerms);
    console.log(this.$props.definitions);
  }

  violation: any = {} // will store violation messages that we get from the api

  createConfirm() {
    this.showDefinitionCreation = true;
  }

  async createDefinition() {
    this.setBusy(true);// tell parent that this component is waiting for the api to respond
    const dataToSend = {

      user: 1,
      urbanterm: this.$props.trendingUrbanTerms.id,
      definition: this.definitionToAdd,
      term: this.$props.trendingUrbanTerms.urbanterm,
      displayname: 'HaXSaW',

    };
    try {
      console.log(dataToSend);
      const data = await this.callAPI(this.DefinitionApi(), 'POST', dataToSend); // returns a promise object
      this.$props.trendingUrbanTerms = await this.callAPI(`${this.TermApi()}/${this.$route.query.urbanid}`);
      this.$props.definitions = await this.$props.trendingUrbanTerms.definitions;

      // eslint-disable-next-line no-empty
    } catch (err: any) {
      this.violation = this.mapValidationErrorArray(err.data);
    } finally {
      this.setBusy(false);// tell parent that this component is no longer waiting for the api
    }
  }

  async like(definition: any) {
    // eslint-disable-next-line no-param-reassign,no-plusplus
    definition.likes++;
    console.log(definition);
    this.violation = await this.getErrorMessages(definition);
    console.log(this.violation);

    if (Object.keys(this.violation).length === 0) {
      this.setBusy(true);// tell parent that this component is waiting for the api to respond
      const url = `${this.DefinitionApi()}/${definition.id}`;
      const method = 'put';

      try {
        // eslint-disable-next-line max-len
        const data = await this.callAPI(url, method, definition); // returns a promise object
        // emit the action that occurred along with the data received from the api server
        // to be used by the parent to update the b-table of students
        this.$emit(definition.id === data.id ? 'updated' : 'added', data);
      } catch (err: any) {
        // get the violation messages from the api - if the web server responded
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);// tell parent that this component is no longer waiting for the api
      }
    }
  }

  async dislike(definition: any) {
    // eslint-disable-next-line no-param-reassign,no-plusplus
    definition.dislikes++;
    console.log(definition);
    this.violation = await this.getErrorMessages(definition);
    console.log(this.violation);

    if (Object.keys(this.violation).length === 0) {
      this.setBusy(true);// tell parent that this component is waiting for the api to respond
      const url = `${this.DefinitionApi()}/${definition.id}`;
      const method = 'put';

      try {
        // eslint-disable-next-line max-len
        const data = await this.callAPI(url, method, definition); // returns a promise object
        // emit the action that occurred along with the data received from the api server
        // to be used by the parent to update the b-table of students
        this.$emit(definition.id === data.id ? 'updated' : 'added', data);
      } catch (err: any) {
        // get the violation messages from the api - if the web server responded
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);// tell parent that this component is no longer waiting for the api
      }
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
