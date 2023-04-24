<template>
  <div class="card-container">
    <div v-if="isLoading" class="card skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-text">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
    <div v-else class="card">
      <img src="https://via.placeholder.com/150" alt="product image" />
      <h3>Product Name</h3>
      <p>Description of the product goes here.</p>
      <button>Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true, // set the initial value to true to show the skeleton
    };
  },
  mounted() {
    // simulate loading for 2 seconds
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  flex: 1 0 300px;
}

.skeleton {
  position: relative;
  /* background-color: #f5f5f5; */
  overflow: hidden;
}

.skeleton::before {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  width: 150px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.skeleton-img {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  background-color: #ccc;
}

.skeleton-text {
  width: 100%;
}

.skeleton-line {
  height: 20px;
  margin-bottom: 10px;
  background-color: #ccc;
}

@keyframes skeleton-loading {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
</style>
