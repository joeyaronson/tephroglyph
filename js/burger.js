function toggleNav() {
  let open = document.getElementById("burger").checked;
  let nav = document.getElementById("left-nav");
  let icon = document.getElementById("icon-container");

  if (!open) {
    nav.style.width = "0px";
    nav.style.padding = "0px";
    icon.style.left = "0px";
  } else {
    const onMobile = window.matchMedia("(max-width: 1000px)");

    if (onMobile.matches) {
      nav.style.width = "400px";
      nav.style.padding = "64px";
      icon.style.left = "440px";
    } else {
      nav.style.width = "200px";
      icon.style.left = "240px";
    }
    nav.style.padding = "64px";
  }
}
