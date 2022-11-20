import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

let formData = {};
onSaveTextForm();

function onFormSubmit(e) {
  e.preventDefault();

  if (!e.target.email.value || !e.target.message.value) {
    alert('Enter all data');
    return;
  }
  e.target.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  
  console.log(formData);
}

function onFormInput(e) {
  formData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  formData[e.target.name] = e.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

function onSaveTextForm() {
  try {
    let text = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!text) {
      return;
    }
    formRef.email.value = text.email || '';
    formRef.message.value = text.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}
