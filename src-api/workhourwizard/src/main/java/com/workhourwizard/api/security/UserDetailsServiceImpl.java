package com.workhourwizard.api.security;

import com.workhourwizard.api.models.Trabajador;
import com.workhourwizard.api.repositories.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private TrabajadorRepository trabajadorRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Trabajador trabajador =
        trabajadorRepository
            .findOneByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException(
                        "Trabajador con email " + email + " no registrado"));

    return new UserDetailsImpl(trabajador);
  }
}
