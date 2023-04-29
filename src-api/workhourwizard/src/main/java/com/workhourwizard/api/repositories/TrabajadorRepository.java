package com.workhourwizard.api.repositories;

import com.workhourwizard.api.models.Trabajador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrabajadorRepository extends CrudRepository<Trabajador, Long> {

  Optional<Trabajador> findOneByEmail(String email);
}
