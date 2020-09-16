const btnInsert = document.querySelector(".btn.btn-success");

function btnSubmit() {
  if (!btnInsert.disabled) {
    return (btnInsert.disabled = true);
  }
}
