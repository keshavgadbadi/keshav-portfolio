$(document).ready(function(){

	$('#menu').click(function(){
		$(this).toggleClass('fa-times');
		$('header').toggleClass('toggle');
	});

	$(window).on('scroll load',function(){

		$('#menu').removeClass('fa-times');
		$('header').removeClass('toggle');

		if($(window).scrollTop() >0){
			$('.top').show();
		}else{
			$('.top').hide();

		}

	});



	$('a[href*="#"]').click(function(e){

		e.preventDefault();

		$('html, body').animate({

			scrollTop : $($(this).attr('href')).offset().top,

		},
		500,
		'linear'

		);

	});

});


// Target your section (replace '.counter' with the actual section class or ID)
const section = document.querySelector('.counter');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = document.querySelectorAll('.counter .box span');

      counters.forEach(counter => {
        const targetText = counter.getAttribute('data-target');
        const match = targetText.match(/^([\d.]+)(\D*)$/); // Split number & symbol
        const endValue = parseFloat(match[1]);
        const suffix = match[2];

        let current = 0;
        const duration = 2000;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = endValue / steps;

        const updateCounter = () => {
          current += increment;
          if (current < endValue) {
            counter.innerText = current.toFixed(1) + suffix;
            setTimeout(updateCounter, stepTime);
          } else {
            counter.innerText = endValue + suffix;
          }
        };

        updateCounter();
      });

      // Once animation runs, stop observing
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of section is visible
});

observer.observe(section);

  (function () {
    emailjs.init("jb_4u2BFNmxCqLhdF"); // ✅ Replace with your public key
  })();

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get Form Field Values
    const name = this.name.value.trim();
    const mobile = this.mobile.value.trim();
    const email = this.email.value.trim();
    const project = this.project.value.trim();
    const message = this.message.value.trim();

    // 🛡️ Validation
    if (!name || !mobile || !email || !project || !message) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please fill all the fields.'
      });
      return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.'
      });
      return;
    }

    if (mobile.length < 10 || isNaN(mobile)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Number',
        text: 'Please enter a valid 10-digit mobile number.'
      });
      return;
    }

    // ✅ Send Email using EmailJS
    emailjs.sendForm("service_uy794hb", "template_c1cpe16", this)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Thank you!',
          text: 'Form submitted successfully!',
          timer: 3000,
          showConfirmButton: false
        });
        setTimeout(() => location.reload(), 3000);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Something went wrong: ' + error
        });
      });
  });
