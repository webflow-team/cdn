document.addEventListener('DOMContentLoaded', function () {
    // Hide first option in select elements
    let selects = document.querySelectorAll("select[ms-code=hide-first-option]");
    selects.forEach((select) => {
        let options = select.getElementsByTagName("option");
        options[0].hidden = true;
    });

    // Initialize intl-tel-input
    var input = document.querySelector("#phone");
    var errorMsg = document.querySelector("#error-msg");
    var validMsg = document.querySelector("#valid-msg");
    var dialCode = document.querySelector(".dialCode");

    var iti = intlTelInput(input, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.js",
        initialCountry: "auto",
        placeholderNumberType: 'FIXED_LINE',
        geoIpLookup: function (callback) {
            fetch('https://ipinfo.io?token=c9adadaf33a8e0')
                .then(response => response.json())
                .then(ipjson => {
                    callback(ipjson.country);
                })
                .catch(() => {
                    callback('in');
                });
        }
    });

    var errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

    var updateInputValue = function () {
        dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
    };

    input.addEventListener('countrychange', updateInputValue, false);
    updateInputValue();

    var reset = function () {
        input.classList.remove("error");
        errorMsg.innerHTML = "";
        errorMsg.classList.add("errorhide");
        validMsg.classList.add("errorhide");
        $(input).removeClass('invalid');
    };

    input.addEventListener('blur', function () {
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

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();
        var fullPhoneNumber = iti.getNumber(intlTelInputUtils.numberFormat.E164);
        $("#fullPhone").val(fullPhoneNumber);
        console.log(JSON.stringify($("#contact-form").serializeArray()));
    });

    $(':input[required]').blur(function () {
        if ($(this).val() === '') {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });

    // Custom form submission message
    const FORM_SELECTOR = '[fs-hacks-element="form"]';
    const NAME_INPUT_SELECTOR = '[fs-hacks-element="name-input"]';
    const MESSAGE_SELECTOR = '[fs-hacks-element="custom-message"]';
    const form = document.querySelector(FORM_SELECTOR);
    const nameInput = form.querySelector(NAME_INPUT_SELECTOR);
    const messageDiv = document.querySelector(MESSAGE_SELECTOR);

    if (form && nameInput && messageDiv) {
        nameInput.addEventListener('input', function () {
            const nameValue = nameInput.value;
            if (nameValue && nameValue !== '') {
                messageDiv.innerText = `Thanks for reaching out, ${nameValue}. We will get back to you soon.`;
            } else {
                messageDiv.innerText = 'Thank you! Your submission has been received!';
            }
        });
    }

    // Disable the first option in form select
    $("form option:first-child").attr("disabled", "disabled");

    // Form validation
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

    // Additional form functionalities
    $('#mySelect').SumoSelect({
        placeholder: 'Select platforms',
        csvDispCount: 2,
        captionFormat: 'Selected {0}',
        captionFormatAllSelected: 'All selected',
        floatWidth: 300,
        search: false,
        searchText: 'Search...',
        okCancelInMulti: false,
        triggerChangeCombined: true
    });

    var Webflow = Webflow || [];
    Webflow.push(function () {
        $('#contact-form').submit(function () {
            setTimeout(function () {
                location.reload(true);
            }, 5000);
        });
    });

    $("#reload-btn").click(function () {
        location.reload();
    });

    document.addEventListener('submit', function (event) {
        const form = event.target;
        if (form.checkValidity() !== false) {
            setTimeout(function () {
                window.location.reload();
            }, 5000);
        }
    });

    $('.fs-select_toggle-5-2').on('click', function () {
        $('.fs-select_text-5-2').addClass('fs-selected-black');
    });
});
