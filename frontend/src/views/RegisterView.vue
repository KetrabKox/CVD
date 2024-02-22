<template>
  <div class="wrapper rounded-4">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center fw-bold mt-5">Sign Up</h1>
        <form>
          <div class="my-3">
            <label for="email" class="form-label ms-5">Email</label>
            <input type="email" class="form-control ms-5" id="email" required />
          </div>
          <div class="mb-3">
            <label for="username" class="form-label ms-5">Username</label>
            <input
              type="username"
              class="form-control ms-5"
              id="username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password-1" class="form-label ms-5">Password</label>
            <input
              type="password"
              class="form-control ms-5"
              id="password-1"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password-2" class="form-label ms-5"
              >Repeat Password</label
            >
            <input
              type="password"
              class="form-control ms-5"
              id="password-2"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <div class="wrapper-login d-flex align-items-center flex-column">
          <router-link to="/login" class="text-decoration-none">
            <a class="login text-center mt-2">Log in</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <style scoped>
@import "../assets/base.css";
.wrapper,
.wrapper::before {
  height: 40rem;
  width: 28rem;
  margin: 5rem auto 0 auto;
  background-color: var(--secondary-theme-color);
}

.wrapper::before {
  background-color: var(--secondary-color-text);
  display: block;
  content: "";
  position: absolute;
  border-radius: 1rem;
  z-index: -1;
  margin: 0.5rem 0 0 -0.5rem;
}
h1 {
  font-size: 2.7rem;
}
.form-control {
  height: 2.7rem;
  width: 75%;
  background: var(--main-theme-color);
  color: var(--secondary-color-text);
  border: none;
}
button {
  width: 40%;
  height: 3rem;
  margin: 1rem 0 0 30%;
  font-size: 1.2rem;
  letter-spacing: 1.4px;
  font-weight: 600;
  border-radius: 1rem;
  background-color: var(--main-theme-color);
  color: var(--first-color-text);
  border: none;
  cursor: pointer;
}
button:hover,
button:active:focus {
  background-color: var(--secondary-color-text);
}

.wrapper-login {
  margin: 2.5rem auto;
}
.password-recovery,
.login {
  color: var(--secondary-color-text);
  transition: 0.3s;
}
.password-recovery:hover,
.login:hover {
  color: var(--main-color-text);
  transition: 0.3s;
}
.login {
  font-weight: 800;
  font-size: 1.7rem;
}
</style>