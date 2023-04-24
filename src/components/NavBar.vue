<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }">Présentation</router-link>
      <router-link :to="{ name: 'ProductsView' }">Produits</router-link>
      <router-link :to="{ name: 'AdminView' }">Admin</router-link>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
}
header h1 {
  color: #dfdfdf;
  font-size: 48px;
}
header a {
  color: #bbb;
  text-decoration: none;
  margin-left: 20px;
}
header a.router-link-active {
  color: #444;
  font-weight: bold;
}
</style>
