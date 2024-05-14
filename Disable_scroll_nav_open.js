//rj
  var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

  $(document).ready(function () {
    // Select all elements with the class '.w-nav-overlay'
    var overlays = document.querySelectorAll('.w-nav-overlay');

    overlays.forEach(function (overlay) {
      // Creating a mutation observer for each overlay
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
          if (
            mutationRecord.attributeName === 'style' &&
            window.getComputedStyle(overlay).getPropertyValue('display') !== 'none'
          ) {
            if (iOS) {
              var x = $(window).scrollTop().toFixed();
              $('body').css({
                overflow: 'hidden',
                position: 'fixed',
                top: '-' + x + 'px',
                width: '100vw',
              });
            }
            $('body').css('overflow', 'hidden');
          } else {
            if (iOS) {
              var t = $('body').css('top').replace('-', '').replace('px', '');
              $('body').css({
                overflow: 'auto',
                position: '',
                width: '100vw',
              });
              $('body').animate({ scrollTop: t }, 0);
            }
            $('body').css('overflow', '');
          }
        });
      });

      // Attach the mutation observer to each overlay, and only when attribute values change
      observer.observe(overlay, { attributes: true, attributeFilter: ['style'] });
    });
  });
