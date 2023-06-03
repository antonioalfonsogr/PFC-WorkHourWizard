package com.workhourwizard.api.controllers;

import com.workhourwizard.api.models.RangoHorario;
import com.workhourwizard.api.services.RangoHorarioService;
import com.workhourwizard.api.services.TrabajadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trabajador/{idTrabajador}/rangohorario")
public class RangoHorarioController {

  private final RangoHorarioService rangoHorarioService;
  private final TrabajadorService trabajadorService;

  /**
   * Constructor del controlador.
   *
   * @param rangoHorarioService Servicio del rango horario.
   * @param trabajadorService Servicio del trabajador.
   */
  @Autowired
  public RangoHorarioController(RangoHorarioService rangoHorarioService, TrabajadorService trabajadorService) {
    this.rangoHorarioService = rangoHorarioService;
    this.trabajadorService = trabajadorService;
  }

  /**
   * Obtiene los rangos horarios de un trabajador.
   *
   * @param idTrabajador ID del trabajador.
   * @return Lista de rangos horarios del trabajador.
   */
  @GetMapping("")
  public List<RangoHorario> obtenerRangosHorarios(@PathVariable(name = "idTrabajador") Long idTrabajador) {
    return this.trabajadorService.obtenerTrabajadorPorId(idTrabajador)
            .get()
            .getRangosHorariosTrabajador();
  }


  /**
   * Obtiene un rango horario por su ID.
   *
   * @param id ID del rango horario.
   * @return Rango horario encontrado.
   */
  @GetMapping("/{id}")
  public Optional<RangoHorario> obtenerRangoHorarioPorId(@PathVariable Long id) {
    return this.rangoHorarioService.obtenerRangoHorarioPorId(id);
  }

  /**
   * Inserta un nuevo rango horario.
   *
   * @param idTrabajador ID del trabajador.
   * @param rangoHorario Rango horario a insertar.
   * @return Rango horario insertado.
   */
  @PostMapping("")
  public RangoHorario insertarRangoHorario(
          @PathVariable(name = "idTrabajador") Long idTrabajador,
          @RequestBody RangoHorario rangoHorario) {
    return this.rangoHorarioService.insertarRangoHorario(idTrabajador, rangoHorario);
  }

  /**
   * Actualiza un rango horario.
   *
   * @param id ID del rango horario.
   * @param rangoHorario Rango horario con los datos actualizados.
   */
  @PutMapping("/{id}")
  public void actualizarRangoHorario(
          @PathVariable Long id, @RequestBody RangoHorario rangoHorario) {
    this.rangoHorarioService.actualizarRangoHorario(id, rangoHorario);
  }

  /**
   * Elimina un rango horario.
   *
   * @param id ID del rango horario a eliminar.
   */
  @DeleteMapping("/{id}")
  public void eliminarRangoHorario(@PathVariable Long id) {
    this.rangoHorarioService.eliminarRangoHorario(id);
  }
}
