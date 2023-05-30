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

  @Autowired
  public RangoHorarioController(RangoHorarioService rangoHorarioService, TrabajadorService trabajadorService) {
    this.rangoHorarioService = rangoHorarioService;
    this.trabajadorService = trabajadorService;
  }

  @GetMapping("")
  public List<RangoHorario> obtenerRangosHorarios(@PathVariable(name = "idTrabajador") Long idTrabajador) {
//    return this.trabajadorService
//        .obtenerTrabajadorPorId(idTrabajador)
//        .get()
//        .getRangosHorariosTrabajador();
    return null;
  }

  @GetMapping("/{id}")
  public Optional<RangoHorario> obtenerRangoHorarioPorId(@PathVariable Long id) {
    return this.rangoHorarioService.obtenerRangoHorarioPorId(id);
  }

  @PostMapping("")
  public RangoHorario insertarRangoHorario(
      @PathVariable(name = "idTrabajador") Long idTabajador,
      @RequestBody RangoHorario rangoHorario) {
    return this.rangoHorarioService.insertarRangoHorario(idTabajador, rangoHorario);
  }

  @PutMapping("/{id}")
  public void actualizarRangoHorario(
      @PathVariable Long id, @RequestBody RangoHorario rangoHorario) {
    this.rangoHorarioService.actualizarRangoHorario(id, rangoHorario);
  }

  @DeleteMapping("/{id}")
  public void eliminarRangoHorario(@PathVariable Long id) {
    this.rangoHorarioService.eliminarRangoHorario(id);
  }
}
