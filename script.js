
// Intl-tel-input 

$(document).ready(function() {
    var input = document.querySelector("#phone"),
        dialCode = document.querySelector(".dialCode"),
        errorMsg = document.querySelector("#error-msg"),
        validMsg = document.querySelector("#valid-msg");

    var iti = intlTelInput(input, {
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
                callback('in'); // Default to India if there's an error
            });
        }
    });

    var updateInputValue = function(event) {
        dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
    };
    input.addEventListener('input', updateInputValue, false);
    input.addEventListener('countrychange', updateInputValue, false);

    var errorMap = [
        "Invalid number",        // 0: INVALID_COUNTRY_CODE
        "Invalid country code",  // 1: TOO_SHORT
        "Too short",             // 2: TOO_LONG
        "Too long",              // 3: NOT_A_NUMBER
        "Please enter a valid mobile number" // 4: Custom non-numeric error
    ];

    var reset = function() {
        input.classList.remove("error");
        errorMsg.innerHTML = "";
        errorMsg.classList.add("errorhide");
        validMsg.classList.add("errorhide");
    };

    // Regular expression for validating phone numbers
    var phoneRegex = /^(?:[0-9]●?){6,14}[0-9]$/;

    // Function to validate phone number
    function isValidPhoneNumber(phoneNumber) {
        return phoneRegex.test(phoneNumber);
    }

    input.addEventListener('blur', function() {
        reset();
        var phoneNumber = $(this).val();
        
        // Check for non-numeric characters
        if (!phoneNumber.match(/^[\d\s()+-]*$/)) {
            $(this).addClass('error');
            errorMsg.innerHTML = errorMap[4]; // Custom error for non-numeric input
            errorMsg.classList.remove("errorhide");
            return; // Prevent further validation if non-numeric characters are found
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }

        if (phoneNumber.trim()) {
            if (iti.isValidNumber()) {
                validMsg.classList.remove("errorhide");
            } else {
                input.classList.add("error");
                var errorCode = iti.getValidationError();
                errorMsg.innerHTML = errorMap[errorCode] || "Invalid number format";
                errorMsg.classList.remove("errorhide");
            }
        }
    });

    input.addEventListener('change', reset);
    input.addEventListener('keyup', reset);

    $(':input[required]').blur(function() {
        if ($(this).val() === '') {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });
    $('#btnSubmit').click(function() {
        var requiredFields = $(':input[required]');
        var isValid = true;
        requiredFields.each(function() {
            if ($(this).val() === '') {
                $(this).addClass('invalid');
                isValid = false;
            } else {
                $(this).removeClass('invalid');
            }
        });
    });
});



// Change color of selected option when selected
$('select').on('change', function() {
    $(this).css('color', '#41434c');
});


//CONTACT FORM JS
//International phone number Dial code + Mobile no combined

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

