<template>
  <div id="app">

    <!-- Add a search bar here-->
    <!--    Add a ProfileButton here -->

    <b-nav pills align="center" class="mb-4">
      <b-nav-item to="/" exact-active-class="active">Home </b-nav-item> |
      <b-nav-item to="/about" exact-active-class="active">About</b-nav-item>
      <!--  Add Nav item for Student View -->
      <b-nav-item to="/student" exact-active-class="active"> Student </b-nav-item>
    </b-nav>

    <router-view class="container-xl"/>
  </div>
</template>
