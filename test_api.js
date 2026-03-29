fetch('https://cdls-ignite-backend.onrender.com/api/core/interest/list/?category=volunteer')
  .then(res => res.text().then(text => console.log("STATUS:", res.status, "BODY:", text)))
  .catch(console.error);
