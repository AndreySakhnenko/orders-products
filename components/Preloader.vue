<template>
  <div class="preloader">
    <div class="loader"></div>
  </div>
</template>

<style>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
}
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #48c874;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin: auto;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
