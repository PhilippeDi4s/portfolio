//===================== API EMAILJS ======================
(function () {
  emailjs.init("5egfTwmigI090gKh4");

  // ===================== ELEMENTOS =====================
  const form = document.getElementById("contact_form");
  const input_name = document.getElementById("contact_name");
  const input_email = document.getElementById("contact_email");
  const input_subject = document.getElementById("subject");
  const input_message = document.getElementById("contact_message");

  const error_name = document.getElementById("contact_error-name");
  const error_email = document.getElementById("contact_error-email");
  const error_subject = document.getElementById("contact_error-subject");
  const error_message = document.getElementById("contact_error-message");

  const submitBtn = form.querySelector("button[type='submit']");

  const closeButtons = document.querySelectorAll(".close-form_feedback");

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".form_feedback-background");
      console.log("click");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  const modalBackgrounds = document.querySelectorAll(
    ".form_feedback-background",
  );

  modalBackgrounds.forEach((bg) => {
    bg.addEventListener("click", (e) => {
      if (e.target === bg) {
        bg.style.display = "none";
      }
    });
  });

  // ===================== CONFIG =====================
  const MAX_ENVIOS = 2;
  const RESET_TIME = 30 * 24 * 60 * 60 * 1000; // 30 DIAS
  const STORAGE_KEY = "contact_form_limit";

  // ===================== HELPERS =====================
  function getFormLimitData() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!data) {
      return {
        count: 0,
        lastReset: Date.now(),
      };
    }

    if (Date.now() - data.lastReset > RESET_TIME) {
      return {
        count: 0,
        lastReset: Date.now(),
      };
    }

    return data;
  }

  function saveFormLimitData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function updateSubmitState() {
    const data = getFormLimitData();

    if (data.count >= MAX_ENVIOS) {
      submitBtn.classList.add("disabled");
    } else {
      submitBtn.classList.remove("disabled");
    }
  }

  // ===================== VALIDAÇÃO NOME =====================
  input_name.addEventListener("input", () => {
    const name = input_name.value.trim();
    const regexName = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;

    if (name.length < 3 || !regexName.test(name)) {
      error_name.style.display = "block";
    } else {
      error_name.style.display = "none";
    }
  });

  // ===================== VALIDAÇÃO EMAIL =====================
  input_email.addEventListener("input", () => {
    const email = input_email.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      email === "" ||
      email.length < 5 ||
      email.includes(" ") ||
      !regexEmail.test(email)
    ) {
      error_email.style.display = "block";
    } else {
      error_email.style.display = "none";
    }
  });

  // ===================== VALIDAÇÃO SUBJECT =====================
  input_subject.addEventListener("input", () => {
    const subject = input_subject.value.trim();
    const regexSubject = /^[A-Za-zÀ-ÿ0-9\s.,!?()\-]{3,100}$/;

    if (
      subject.length < 5 ||
      subject.length > 100 ||
      /(.)\1{4,}/.test(subject) ||
      !regexSubject.test(subject)
    ) {
      error_subject.style.display = "block";
    } else {
      error_subject.style.display = "none";
    }
  });
  // ===================== VALIDAÇÃO MESSAGE =====================
  input_message.addEventListener("input", () => {
    input_message.value = input_message.value.replace(/[<>]/g, "");

    const message = input_message.value.trim();
    const regexMessage = /^[A-Za-zÀ-ÿ0-9\s.,!?()"'\-:@\n]{10,1000}$/;

    if (
      message === "" ||
      message.length < 10 ||
      message.length > 1000 ||
      /(.)\1{4,}/.test(message) ||
      !regexMessage.test(message)
    ) {
      error_message.style.display = "block";
    } else {
      error_message.style.display = "none";
    }
  });

  // ===================== FUNÇÕES DE VALIDAÇÕES =====================

  function validateName() {
    const name = input_name.value.trim();
    const regexName = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;

    return name.length >= 3 && regexName.test(name);
  }

  function validateEmail() {
    const email = input_email.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      email !== "" &&
      email.length >= 5 &&
      !email.includes(" ") &&
      regexEmail.test(email)
    );
  }

  function validateSubject() {
    const subject = input_subject.value.trim();
    const regexSubject = /^[A-Za-zÀ-ÿ0-9\s.,!?()\-]{3,100}$/;

    return (
      subject.length >= 5 &&
      subject.length <= 100 &&
      !/(.)\1{4,}/.test(subject) &&
      regexSubject.test(subject)
    );
  }

  function validateMessage() {
    input_message.value = input_message.value.replace(/[<>]/g, "");

    const message = input_message.value.trim();
    const regexMessage = /^[A-Za-zÀ-ÿ0-9\s.,!?()"'\-:@\n]{10,1000}$/;

    return (
      message.length >= 10 &&
      message.length <= 1000 &&
      !/(.)\1{4,}/.test(message) &&
      regexMessage.test(message)
    );
  }

  // ===================== SUBMIT =====================
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      const form_feedback_empty = document.getElementById(
        "form_feedback-empty",
      );
      form_feedback_empty.style.display = "flex";
      return;
    }

    let data = getFormLimitData();

    if (data.count >= MAX_ENVIOS) {
      updateSubmitState();
      const form_feedback_limit = document.getElementById(
        "form_feedback-limit",
      );
      form_feedback_limit.style.display = "flex";
      return;
    }

    emailjs.sendForm("service_xdf77cp", "template_g1jqqgq", this).then(
      () => {
        data.count++;

        saveFormLimitData(data);
        updateSubmitState();

        const form_feedback_send =
          document.getElementById("form_feedback-send");
        form_feedback_send.style.display = "flex";
        form.reset();
      },
      (error) => {
        console.error(error);
        const form_feedback_error = document.getElementById(
          "form_feedback-error",
        );
        form_feedback_error.style.display = "flex";
      },
    );
  });

  // ===================== INIT =====================
  updateSubmitState();
})();
