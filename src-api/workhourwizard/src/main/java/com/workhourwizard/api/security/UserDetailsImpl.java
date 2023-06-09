package com.workhourwizard.api.security;

import com.workhourwizard.api.models.Cargo;
import com.workhourwizard.api.models.Trabajador;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

  private final Trabajador trabajador;

  public UserDetailsImpl(Trabajador trabajador) {
    this.trabajador = trabajador;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.emptyList();
  }

  @Override
  public String getPassword() {
    return trabajador.getPassword();
  }

  @Override
  public String getUsername() {
    return trabajador.getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public String getCargo() {
    return trabajador.getCargo().name();
  }

}

