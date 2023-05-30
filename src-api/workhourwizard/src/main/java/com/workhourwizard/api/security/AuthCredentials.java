package com.workhourwizard.api.security;

public class AuthCredentials {

  private String email;
  private String password;

  public AuthCredentials() {
  }

  public AuthCredentials(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

}
