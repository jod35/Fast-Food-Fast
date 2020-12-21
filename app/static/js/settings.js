const settingsMenuOption = document.querySelector("#settings");
const settingsModal = document.querySelector("#settings-modal");
const settingsForm = document.querySelector("#settings-form");
const currentUserName = document.querySelector(".current_user");
// const notificationModal = document.querySelector('.noti-modal');
// const notificationMessage = document.querySelector('.noti-text');

settingsMenuOption.addEventListener("click", () => {
  settingsModal.style.display = "block";

  let RESOURCE_URL = `/api/user/${currentUserName.innerText}`;

  console.log(RESOURCE_URL);

  fetch(RESOURCE_URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      document.querySelector("#settings-username").value = data.user.username;
      document.querySelector("#settings-email").value = data.user.email;
      document.querySelector("#settings-tel_phone").value = data.user.tel_phone;

      settingsForm.addEventListener("submit", (e) => {
        let form_data = new FormData(settingsForm);

        let new_setting = {
          username: form_data.get("username"),
          email: form_data.get("email"),
          tel_phone: form_data.get("tel_phone"),
        };

        fetch(RESOURCE_URL, {
          headers: {
            "content-type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(new_setting),
        })
          .then((res) => res.json())
          .then((data) => {
            settingsForm.reset();
            settingsModal.style.display="none";
            notificationModal.style.display="block";
            notificationMessage.innerText=data.message;

            location.reload();
          });

        e.preventDefault();
      });
    });
});
