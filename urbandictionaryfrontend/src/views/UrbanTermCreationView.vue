<template>
  <div class=" mask py-lg-5" style="background-color: rgba(0, 0, 0, 0.8);">
    <!-- Urban Term -->
    <h1 class="fw-light text-white">Create your Urban Term</h1>
    <b-form-group :invalid-feedback="violation.familyName" :state="hasErr.UrbanTerm" class="mb-1" >
      <b-input-group>
        <b-form-input :placeholder="dt.Definition" :state="hasErr.Definition" :disabled="isDisabled"
                      v-model="tempUrbanTerm.UrbanTerm" trim @keydown="violation.familyName=null" />
      </b-input-group>
    </b-form-group>
    <b-form-group :invalid-feedback="violation.familyName" :state="hasErr.UrbanTerm" class="mb-1" >
      <b-input-group>
        <b-form-textarea :placeholder="dt.UrbanTerm"
                         :state="hasErr.UrbanTerm" :disabled="isDisabled"
                         v-model="tempUrbanTerm.UrbanTerm"
                         trim @keydown="violation.familyName=null" />
      </b-input-group>
    </b-form-group>
    <!-- BUTTONS -->
    <b-button-group class="w-100 mb-3">

      <!--      Create button will call the post method for both urban term and definition-->
      <b-button variant="primary" :disabled="isDisabled" @click="saveUrbanTerm">
        <b-icon-cloud-arrow-up-fill ref="iconSave" /> Create</b-button>

      <router-link :to="`/`" >
        <b-button variant="primary" :disabled="isDisabled" @click="cancel">
          <b-icon-x-square-fill /> Cancel</b-button>
      </router-link>
    </b-button-group>

    <!--    &lt;!&ndash; ERROR MESSAGE &ndash;&gt;-->
    <!--    <b-alert variant="danger" :show="violation.violationMessage">-->
    <!--      {{violation.violationMessage}}-->
    <!--    </b-alert>-->

  </div>
</template>

<script lang="ts">
import {
  Component, Mixins, Prop, Watch,
} from 'vue-property-decorator';
import GlobalMixin from '@/mixins/global-mixin';
import UrbanTerm from '@/models/UrbanTerm';
import { BIcon } from 'bootstrap-vue';
import UrbanTermDefinition from '@/models/UrbanTermDefinition';
import IconButton from '@/components/IconButton.vue';

@Component({
  components: {
    IconButton, BIcon,
  },
})
export default class UrbanTermCreationView extends Mixins(GlobalMixin) {
  @Prop({ type: Object, validator: (s) => s instanceof Object }) readonly UrbanTerm: any

  @Prop({ type: Object, validator: (s) => s instanceof Object }) readonly UrbanTermDefinition: any

  tempUrbanTerm: UrbanTerm = new UrbanTerm()

  tempDefinition: UrbanTermDefinition = new UrbanTermDefinition()

  // Validation
  violation: any = {}

  dt = {
    UrbanTerm: 'UrbanTerm',
    Definition: 'Definition',
  }

  get hasErr(): any {
    return {
      UrbanTerm: this.violation.familyName ? false : null,
      Definition: this.violation.givenName ? false : null,
    };
  }

  // This method will save the urban term into the database and
  // than save the definition for the data base
  async saveUrbanTerm() {
    const icon:BIcon = this.$refs.iconSave;
    this.violation = await this.getErrorMessages(this.tempStudent);

    if (Object.keys(this.violation).length === 0) {
      this.setBusy(true);// tell parent that this component is waiting for the api to respond

      const url = this.STUDENT_API + (this.isNew ? '' : `/${this.tempStudent.id}`);
      const method = this.isNew ? 'post' : 'put';

      try {
        const data = await this.callAPI(url, method, this.tempStudent); // returns a promise object
        // emit the action that occurred along with the data received from the api server
        // to be used by the parent to update the b-table of students
        this.$emit(this.tempStudent.id === data.id ? 'updated' : 'added', data);
      } catch (err:any) {
        // get the violation messages from the api - if the web server responded
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);// tell parent that this component is no longer waiting for the api
      }
    }
  }

  async saveDefinition() {
    this.violation = await this.getErrorMessages(this.tempStudent);

    if (Object.keys(this.violation).length === 0) {
      this.setBusy(true);// tell parent that this component is waiting for the api to respond
      const url = this.STUDENT_API + (this.isNew ? '' : `/${this.tempStudent.id}`);
      const method = this.isNew ? 'post' : 'put';

      try {
        const data = await this.callAPI(url, method, this.tempStudent); // returns a promise object
        // emit the action that occurred along with the data received from the api server
        // to be used by the parent to update the b-table of students
        this.$emit(this.tempStudent.id === data.id ? 'updated' : 'added', data);
      } catch (err:any) {
        // get the violation messages from the api - if the web server responded
        this.violation = this.mapValidationErrorArray(err.data);
      } finally {
        this.setBusy(false);// tell parent that this component is no longer waiting for the api
      }
    }
  }
}
</script>
