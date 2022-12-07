<template>
  <div>
    <b-input-group>
      <b-input-group-prepend v-b-tooltip.hover.right="'Search'" is-text>
        <b-icon-search variant="info" />
      </b-input-group-prepend>

      <!--  use @blur and @focus to help track when the search input box has focus
            set the debounce to 500 milliseconds or half a second
            debounce stalls the call to the api until the user stops typing for half a second -->
      <b-input type="search" debounce="500" placeholder="Search" class="bg-light text-info"
               v-model="query" @focus="hasFocus=true;" @blur="hasFocus=false" />
    </b-input-group>

    <!--    *@mousedown.prevent* prevents the search input box from losing focus when clicking on a list item
        use the computed property *showList* to only show the list of found students when:
            the search input has focus and when the search input contains at least 2 characters -->
    <b-list-group class="shadow autocomplete-list" v-show="showList" @mousedown.prevent>
      <!--         show a list item with a spinner to let the user know they need to wait -->
      <b-list-group-item v-if="isBusy" variant="info">
        <b-spinner small />
      </b-list-group-item>
      <!--         show a list item with a message if no students are found matching the criteria -->
      <b-list-group-item v-else-if="results.length == 0" variant="warning">
        No Students Found matching the criteria
      </b-list-group-item>
      <!--         loop through all the found students in the results array and add a list item for each
                separate each student attribute with bootstrap grid -->
      <b-list-group-item v-else v-for="student in results" :key="student.id" @click="selected(student)" button>
        <div class="row">
          <div class="col-4 col-lg-6">{{student.familyName}}, {{student.givenName}}</div>
          <div class="col-4 col-lg-6">{{student.address}}</div>
          <div class="col-4 col-lg-12">{{student.phone}}</div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Mixins, Emit, Watch,
} from 'vue-property-decorator';
import GlobalMixin from '@/mixins/global-mixin';

@Component
export default class AutoSearch extends Mixins(GlobalMixin) {
  /** PROPS are a one-way communication from the parent to this child component ( parent -> child )
   * NEVER mutate a prop within this child component - use emits instead
   * https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props
   * Decorator: https://github.com/kaorun343/vue-property-decorator#Prop
   */
  @Prop({ default: 2 }) readonly minSearchLength!:number

  // data variables are constantly monitored for changes and when their values change Vue 'refreshes' the display
  query= '' // search string to send to api

  results= [] // array of student object returned by the api

  hasFocus= false // used to determine whether to show list of students or hide them

  /** EMITS are one-way communication from this child component to the parent ( child -> parent )
   * https://vuejs.org/v2/guide/components.html#Emitting-a-Value-With-an-Event
   * Trigger an event on the current instance. Any additional arguments will be passed into the listener's callback function.
   * Decorator: https://github.com/kaorun343/vue-property-decorator#Emit
   */
  @Emit()
  selected(obj:any) {
    this.hasFocus = false;
    return obj;
  }

  /** COMPUTED PROPERTIES are javascript functions that Vuejs uses as variables
   * https://vuejs.org/v2/guide/computed.html#Computed-Properties
   *  Computed properties MUST "RETURN" something
   *  and should NEVER MODIFY an existing data variable or prop
   *  NEVER use the brackets '()' when using the computed property
   *      correct example:   this.isNew
   *      wrong example:  this.isNew()
   */
  get showList():boolean { // computed property to determine when to show or hide the list group
    return this.query.length >= this.minSearchLength && this.hasFocus;
  }

  /** WATCHES execute code when a data variable or prop is modified by processes in the application
   * https://vuejs.org/v2/guide/computed.html#Watchers
   * Watches MUST correspond to a data variable or prop we are watching - in this example below, the 'query' data variable
   * Watches are mostly used for simple data variables, rarely for objects
   *      if used on objects then you need to specify 'deep:true'
   *      otherwise the handler will only execute when the entire object is replaced
   * Decorator: https://github.com/kaorun343/vue-property-decorator#Watch
   */
  @Watch('query')
  onQueryChanged(newVal: string, oldVal: string):void {
    // if the student list is hidden or if the user is removing chars then don't call the api
    if (!this.showList || newVal.length < oldVal.length) { return; }

    // tell parent this component is busy waiting for the api to respond
    this.setBusy(true);
    this.callAPI(this.URBAN_TERM_API, 'get', { _sort: 'familyName', _order: 'asc', q: this.query })
      .then((data) => {
        this.results = data;
      })
      .catch(() => {
        this.results = []; // if error then empty out array of students
      })
      .finally(() => {
        this.setBusy(false); // tell parent component that this component is no longer waiting for the api
      });
  }
}
</script>

<style scoped>
/* declare a new style class because bootstrap does not have a style that meets our needs */
.autocomplete-list {
  position: absolute;
  max-height: 22em;
  overflow-y: auto;
  z-index: 999;
  width: 90%
}
</style>
