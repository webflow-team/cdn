var Webflow = Webflow || [];
Webflow.push(function () {
  const components = document.querySelectorAll("[fc-marquee=component]");

  if (components) {
    for (const component of components) {
      const outerWrapper = document.createElement("div");
      const wrapperOrigin = component.querySelector("[fc-marquee=wrapper]");
      const wrapperClone = wrapperOrigin.cloneNode(true);

      component.appendChild(outerWrapper);
      outerWrapper.appendChild(wrapperOrigin);
      wrapperOrigin.after(wrapperClone);

      let duration = component.getAttribute("fc-marquee-duration") || "120";
      let wrappers = component.querySelectorAll("[fc-marquee=wrapper]");

      wrapperOrigin.style.animationDuration = `${duration}s`;
      wrapperOrigin.style.webkitAnimationDuration = `${duration}s`;
      wrapperClone.style.animationDuration = `${duration}s`;
      wrapperClone.style.webkitAnimationDuration = `${duration}s`;
    }
  }
});
