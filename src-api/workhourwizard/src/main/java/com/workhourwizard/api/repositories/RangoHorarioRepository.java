package com.workhourwizard.api.repositories;

import com.workhourwizard.api.models.RangoHorario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RangoHorarioRepository extends CrudRepository<RangoHorario, Long> {

}
