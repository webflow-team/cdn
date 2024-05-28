
<script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>
<script>
    let selects = document.querySelectorAll("select[ms-code=hide-first-option]");
    selects.forEach((select) => {
        let options = select.getElementsByTagName("option");
        options[0].hidden = true;
    });
</script>

<!-- Include necessary scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/intlTelInput.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js"></script>

<!-- Intl-tel-input -->
<script>
$(document).ready(function() {
    var input = document.querySelector("#phone");
    var errorMsg = document.querySelector("#error-msg");
    var validMsg = document.querySelector("#valid-msg");
    var dialCode = document.querySelector(".dialCode"); // Ensure this element exists

    // Initialize intl-tel-input
    var iti = intlTelInput(input, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
        initialCountry: "auto",
        placeholderNumberType: 'FIXED_LINE',
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io?token=c9adadaf33a8e0')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch user location');
            })
            .then(ipjson => {
                callback(ipjson.country);
            })
            .catch(() => {
                callback('in'); // Default to US if there's an error
            });
        }
    });

    // Error message mappings
    var errorMap = [
        "Invalid number",
        "Invalid country code",
        "Too short",
        "Too long",
        "Invalid number"
    ];

    // On country change or input, update the dial code in a hidden input
    var updateInputValue = function () {
        dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
    };
    input.addEventListener('countrychange', updateInputValue, false);
    updateInputValue(); // Initial call to set dial code

    // Validation and error handling
    var reset = function() {
        input.classList.remove("error");
        errorMsg.innerHTML = "";
        errorMsg.classList.add("errorhide");
        validMsg.classList.add("errorhide");
        $(input).removeClass('invalid');
    };

    input.addEventListener('blur', function() {
        reset();
        if (input.value.trim()) {
            if (iti.isValidNumber()) {
                validMsg.classList.remove("errorhide");
            } else {
                input.classList.add("error");
                var errorCode = iti.getValidationError();
                var errorMessage = errorMap[errorCode] || "Please enter a valid mobile number";
                errorMsg.innerHTML = errorMessage;
                errorMsg.classList.remove("errorhide");
                $(input).addClass('invalid');
            }
        }
    });

    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);

    $("#contact-form").on("submit", function(e) {
        e.preventDefault();
        var fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
        $("#fullPhone").val(fullPhoneNumber);
        console.log(JSON.stringify($("#contact-form").serializeArray()));
        // Additional form submission logic can be added here
    });

    // Generic validation for required fields
    $(':input[required]').blur(function() {
        if ($(this).val() === '') {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });
});
</script>
 <!--International phone number Dial code + Mobile no combined-->
 <script>
 $(function() {
  
  // Trigger when the form is submitted
  $("#contact-form").on("submit", function(e) {
    
    // Combine the phone parts into the #fullPhone input
    // This will be passed through in the form submit
    $("#fullPhone").val(
      `${$("#dialCode").val()} ${$("#phone").val()}`
    );    
  
    // DEBUG - REMOVE THIS IN YOUR CODE
    // Write the results to the console so we can see if it worked
    console.log(JSON.stringify(
      $("form").serializeArray()
    ));

  });
  
});
 </script>
 <script>
 // Change color of selected option when selected
$('select').on('change', function() {
  $(this).css('color', '#051E39');
});
</script>

 <!--Intel Mobile no validation-->
 
<!--Show user's name in a Webflow Form success message-->
<script>
// when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // declare constant selectors
  const FORM_SELECTOR = '[fs-hacks-element="form"]';
  const NAME_INPUT_SELECTOR = '[fs-hacks-element="name-input"]';
  const MESSAGE_SELECTOR = '[fs-hacks-element="custom-message"]';
  const form = document.querySelector(FORM_SELECTOR);

  // early return
  if (!form) return;
  const nameInput = form.querySelector(NAME_INPUT_SELECTOR);
  const messageDiv = document.querySelector(MESSAGE_SELECTOR);

  if (!nameInput || !messageDiv) return;

  // when form is submitted
  nameInput.addEventListener('input', function () {
    const nameValue = nameInput.value;

    if (nameValue && nameValue !== '') {
      messageDiv.innerText = `Thanks for reaching out, ${nameValue}. We will get back to you soon.`;
    } else {
      messageDiv.innerText = 'Thank you! Your submission has been received!';
    }
  });
});

</script>

  <!--disable form first dropdown option-->
<!--Enable if needed<script>
  $( "form option:first-child" ).attr("disabled","disabled");
</script>-->

<!--Jqury form validation code-->
<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
<script>
$(".field").on("focusin", function () {
  $(this).siblings(".field_label").removeClass("large");
});
$(".field").on("focusout", function () {
  if ($(this).val().length == 0) {
    $(this).siblings(".field_label").addClass("large");
  }
});
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/additional-methods.min.js"></script>
<script>
// Learn more at https://jqueryvalidation.org/
// Options at https://jqueryvalidation.org/validate/
// Methods at https://jqueryvalidation.org/category/methods/
$("#contact-form").validate({
  rules: {
    projectBudget: {
      required: true
    },

    Phone: {
      required: true,
      phoneUS: true
    },

  },
  errorPlacement: function (error, element) {
    error.appendTo(element.closest(".field_wrap"));
  }
});


</script>


<!--Jquery Multiselect code -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.sumoselect/3.4.9/jquery.sumoselect.min.js"></script>
<script>
    $(document).ready(function() {
      $('#mySelect').SumoSelect({
        placeholder: 'Select platforms', // Placeholder text
        csvDispCount: 2, // Number of selected items to display in the placeholder
        captionFormat: 'Selected {0}', // Format for the selected count caption
        captionFormatAllSelected: 'All selected', // Caption text when all options are selected
        floatWidth: 300, // Width of the dropdown
        search: false, // Enable search functionality
        searchText: 'Search...', // Search input placeholder text
        okCancelInMulti: false,
        //truncateOption: false, // Disable truncation of text for options
        triggerChangeCombined: true // Show "OK" and "Cancel" buttons in multi-select mode
      });
  
    });
  </script>

<!--<script>
var Webflow = Webflow || [];
Webflow.push(function() {
  $('#contact-form').submit(function() {
    setTimeout(function() { location.reload(true); }, 5000);
  });
});
</script>-->

<script>
	$( "#reload-btn" ).click(function() {
  		location.reload();
	});
</script> 

<!--Refresh page when form submission is sucessful-->
<script>
  document.addEventListener('submit', function(event) {
    const form = event.target;

    if (form.checkValidity() === false) {  // Check for errors
      // Handle error display or messages here
      // ...
    } else {
      setTimeout(function() {
        window.location.reload();  // Refresh page after 5 seconds
      }, 5000);
    }
  });
</script>
<script>
$('.fs-select_toggle-5-2').on('click', function() {
  $('.fs-select_text-5-2').addClass('fs-selected-black');
});
</script>
