// Example starter JavaScript for disabling form submissions if there are invalid fields
$(function() {

  function validateEmail(email) {
    return (
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        .test(email)
    )
  }

  function valid(el) {
    el
      .removeClass('is-invalid')
      .addClass('is-valid')
  }

  function invalid(el) {
    el
      .removeClass('is-valid')
      .addClass('is-invalid')
  }

  function validate() {
    const email = $('#email')
    const username = $('#username')
    const pass = $('#password')
    const pass2 = $('#password2')
    let allProper = true

    if (!validateEmail(email.val())) {
      invalid(email)
      allProper = false
    } else
      valid(email)

    if (username.val() === '') {
      invalid(username)
      allProper = false
    } else
      valid(username)

    if (pass.val().length < 8) {
      invalid(pass)
      allProper = false
    } else
      valid(pass)

    if (pass.val() !== pass2.val()) {
      invalid(pass2)
      allProper = false
    } else
      valid(pass2)

    if (!allProper)
      return false
  }

  $('#validate').bind('click', validate)
})
