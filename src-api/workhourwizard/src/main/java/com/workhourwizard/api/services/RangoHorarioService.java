package com.workhourwizard.api.services;

import com.workhourwizard.api.models.RangoHorario;
import com.workhourwizard.api.models.Trabajador;
import com.workhourwizard.api.repositories.RangoHorarioRepository;
import com.workhourwizard.api.repositories.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RangoHorarioService {

  private final RangoHorarioRepository rangoHorarioRepository;
  private final TrabajadorRepository trabajadorRepository;

  @Autowired
  public RangoHorarioService(RangoHorarioRepository rangoHorarioRepository, TrabajadorRepository trabajadorRepository) {
    this.rangoHorarioRepository = rangoHorarioRepository;
    this.trabajadorRepository = trabajadorRepository;
  }

  /**
   * Obtiene un rango horario por su ID.
   *
   * @param idRangoHorario ID del rango horario
   * @return Rango horario
   */
  public Optional<RangoHorario> obtenerRangoHorarioPorId(Long idRangoHorario) {
    return rangoHorarioRepository.findById(idRangoHorario);
  }

  /**
   * Inserta un nuevo rango horario para un trabajador.
   *
   * @param idTrabajador  ID del trabajador
   * @param rangoHorario  Rango horario a insertar
   * @return Rango horario insertado
   */
  public RangoHorario insertarRangoHorario(Long idTrabajador, RangoHorario rangoHorario) {
    Trabajador trabajador = trabajadorRepository.findById(idTrabajador)
            .orElseThrow(() -> new NoSuchElementException("Trabajador no encontrado"));

    rangoHorario.setTrabajador(trabajador);
    rangoHorario.setVerificado(false);

    return rangoHorarioRepository.save(rangoHorario);
  }


  /**
   * Actualiza un rango horario existente.
   *
   * @param idRangoHorario    ID del rango horario a actualizar
   * @param rangoHorario      Datos del rango horario actualizado
   */
  public void actualizarRangoHorario(Long idRangoHorario, RangoHorario rangoHorario) {
    RangoHorario updateRangoHorario = rangoHorarioRepository.findById(idRangoHorario)
            .orElseThrow(() -> new NoSuchElementException("Rango horario no encontrado"));

    updateRangoHorario.setFechaHoraInicio(rangoHorario.getFechaHoraInicio());
    updateRangoHorario.setFechaHoraFin(rangoHorario.getFechaHoraFin());
    updateRangoHorario.setVerificado(rangoHorario.getVerificado());
    updateRangoHorario.setTrabajador(rangoHorario.getTrabajador());

    rangoHorarioRepository.save(updateRangoHorario);
  }

  /**
   * Elimina un rango horario por su ID.
   *
   * @param idRangoHorario ID del rango horario a eliminar
   */
  public void eliminarRangoHorario(Long idRangoHorario) {
    rangoHorarioRepository.deleteById(idRangoHorario);
  }
}
