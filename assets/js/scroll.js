// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation - Handle focus for accessibility
          var $target = $(target);
          
          // Check if element is naturally focusable
          var isFocusable = $target.is('a, button, input, textarea, select, [tabindex]');
          
          // Add temporary tabindex if not focusable
          if (!isFocusable) {
            $target.attr('tabindex', '-1');
          }
          
          // Set focus
          $target.focus();
          
          // Add aria-label for screen readers
          $target.attr('aria-label', 'Seção ' + $target.attr('id'));
          
          // Remove temporary tabindex on blur to restore natural tab order
          $target.one('blur', function() {
            if (!isFocusable) {
              $(this).removeAttr('tabindex');
            }
          });
        });
      }
    }
  });

// Support keyboard navigation (Enter/Space on hash links)
$(document).on('keydown', 'a[href*="#"]', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    $(this).click();
  }
});