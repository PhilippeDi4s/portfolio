(function () {
  emailjs.init("5egfTwmigI090gKh4");
})();

const form = document.getElementById("contact_form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs
    .sendForm(
      "service_xdf77cp",
      "template_g1jqqgq",
      this
    )
    .then(
      () => {
        alert("Mensagem enviada com sucesso!");
        form.reset();
      },
      (error) => {
        console.error(error);
        alert("Erro ao enviar a mensagem.");
      }
    );
});
