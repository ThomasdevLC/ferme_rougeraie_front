export default {
  mounted(el, binding) {
    let timeout;
    el.addEventListener("click", () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
        // double click detected
        binding.value();
      } else {
        timeout = setTimeout(() => {
          timeout = null;
        }, 300); // adjust this value to set the maximum duration between clicks
      }
    });
  },
};
